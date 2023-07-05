import { Server } from 'socket.io';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

import logging from '../utils/logging';
import * as chatServices from '../services/chat/_service.chat';
import * as awsServices from '../services/aws/_service.aws';
import * as chatImageServices from '../services/chatImage/_service.chatImage';
import redisClient from './redis';
import ImageBucket from '../models/enum/imageBucket.enum';

interface Payload {
  id: string;
  role: number;
}

const configSocket = (server) => {
  // Initial
  const io = new Server(server, {
    cors: {
      origin: '*',
      allowedHeaders: ['Authorization'],
    },
  });

  // Authorization midddleware
  io.use((socket, next) => {
    // const token = socket.handshake.auth.token;
    const headerAuthorization = socket.request.headers.authorization;


    if (!headerAuthorization.trim()) {
      return next(createError(401));
    }


    // GET ACCESS TOKEN
    const accessToken = headerAuthorization.split('Bearer')[1]
      ? headerAuthorization.split('Bearer')[1].toString().trim()
      : null;

    if (!accessToken) {
      return next(createError(401));
    }

    if (!accessToken.trim()) {
      return next(createError(401));
    }

    // Validate token
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      { ignoreExpiration: true },
      async function (err, payload: Payload) {
        // let payloadExpried;
        if (err) {
          // EXPIRED ERROR
          if (err.name !== 'TokenExpiredError') {
            // logging.error('Token expired error');
            // payloadExpried = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {ignoreExpiration: true} );
            // return next(createError(403));
            return next(createError(401));

          }

          // OTHER ERROR
          // logging.error(err.message);
          // return next(createError(401));
        }

        const {id} = payload;

        // VERIFY SUCCESS
        // SET SOCKET ID TO REDIS
        console.log('id: ' + id);
        console.log('socket.id: ' + socket.id);
        await redisClient.set(
          `socket-${id}`,
          socket.id,
          'EX',
          30 * 24 * 60 * 60, // 1 month
          (err, reply) => {
            if (err) {
              return next(createError(500));
            }
          }
        );

        socket.request['user'] = { id };
        return next();
      }
    );
  });

  // Connect
  io.on('connection', (socket) => {
    logging.info(`User connected: ${socket.id}`);

    // Disconnect
    socket.on('disconnect', async (reason) => {
      logging.info(`User disconnected: ${socket.id} -> ${reason}`);
      // REMOVE SOCKET ID
      await redisClient.del(`socket-${socket.id}`);
    });

    // Client send message
    socket.on('client-send-message', async (data) => {
      // console.log(data);
      const {
        receiverId,
        message = null,
        files = null,
        createdAt,
        type,
        postId,
        imagesType = null,
      } = data;

      // INSERT TO DATABASE
      const senderId = socket.request['user'].id;

      // logging.info("type: " + type);

      if (type === 'text' || type === 'image') {
        try {
          const chatIdInserted = await chatServices.create(
            senderId,
            receiverId,
            type,
            message,
            postId,
            createdAt
          );
          // let buf = Buffer.from(files[0], 'base64');
          if (!chatIdInserted) {
            // SEND ERROR MESSAGE TO CLIENT
            socket.emit('server-send-error-message', 'Create chat failure');
          } else {
            if (type === "image" && Array.isArray(files) && files.length > 0) {
              // UPLOAD FILES TO AWS
              if (imagesType === 'base64') {
                files.forEach((file, index) => {
                  files[index] = Buffer.from(file, 'base64');
                });
              }
              const urlsUploaded = await awsServices.uploadImages(files, ImageBucket.CHAT_IMAGES);

              // INSERT TO DB
              if (urlsUploaded.length > 0) {
                // CREATE IMAGES OF CHAT
                const isCreateChatImagesSuccess =
                  await chatImageServices.create(chatIdInserted, urlsUploaded);
                if (!isCreateChatImagesSuccess) {
                  // SEND ERROR MESSAGE TO CLIENT
                  socket.emit(
                    'server-send-error-message',
                    'Create chat images failure'
                  );
                } else {
                  // EMIT TO SENDER
                  // console.log('urlsUploaded: ' + [urlsUploaded].toString());
                  socket.emit('server-send-message-was-sent', {
                    id: chatIdInserted,
                    image: `${process.env.AWS_BUCKET_PREFIX_URL}/${ImageBucket.CHAT_IMAGES}/${urlsUploaded[0]}`,
                    created_at: createdAt,
                    type: 'image',
                  });

                  // EMIT TO RECEIVER
                  // GET SOCKET ID OF RECEIVER
                  try {
                    const reply = await redisClient.get(`socket-${receiverId}`);
                    if (reply) {
                      io.to(reply).emit('server-send-message-to-receiver', {
                        id: chatIdInserted,
                        sender_id: senderId,
                        image: `${process.env.AWS_BUCKET_PREFIX_URL}/${ImageBucket.CHAT_IMAGES}/${urlsUploaded[0]}`,
                        type: 'image',
                        created_at: createdAt,
                      });
                    }
                  } catch (error) {
                    socket.emit(
                      'server-send-error-message',
                      'Send message to receiver failure'
                    );
                  }
                  // redisClient.get(
                  //     `socket-${receiverId}`,
                  //     (err, reply) => {
                  //         if (err) {
                  //         }
                  //         if (reply) {
                  //             io.to(reply).emit(
                  //                 "server-send-message-to-receiver",
                  //                 {
                  //                     id: chatIdInserted,
                  //                     sender_id: senderId,
                  //                     images: urlsUploaded,
                  //                     type: "image",
                  //                     created_at: createdAt,
                  //                 }
                  //             );
                  //         }
                  //     }
                  // );
                }
              }
            } else {
              // EMIT TO SENDER
              socket.emit('server-send-message-was-sent', {
                id: chatIdInserted,
                message: message,
                created_at: createdAt,
                type: 'text',
              });

              // EMIT TO RECEIVER
              // GET SOCKET ID OF RECEIVER
              try {
                const reply = await redisClient.get(`socket-${receiverId}`);
                if (reply) {

                  io.to(reply).emit('server-send-message-to-receiver', {
                    id: chatIdInserted,
                    sender_id: senderId,
                    message,
                    type: 'text',
                    created_at: createdAt,
                  });
                }
              } catch (error) {
                console.log(error);
                socket.emit(
                  'server-send-error-message',
                  'Send message to receiver failure'
                );
              }
              // redisClient.get(
              //     `socket-${receiverId}`,
              //     (err, reply) => {
              //         if (err) {
              //         }
              //         if (reply) {
              //             io.to(reply).emit(
              //                 "server-send-message-to-receiver",
              //                 {
              //                     id: chatIdInserted,
              //                     sender_id: senderId,
              //                     message,
              //                     type: "text",
              //                     created_at: createdAt,
              //                 }
              //             );
              //         }
              //     }
              // );
            }
          }
        } catch (error) {
          // SEND ERROR MESSAGE TO CLIENT
          socket.emit('server-send-error-message', 'Create chat failure');
        }
      }
    });
  });
};

export default configSocket;