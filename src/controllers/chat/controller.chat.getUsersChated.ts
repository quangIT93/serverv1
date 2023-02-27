import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import logging from "../../utils/logging";
import * as chatServices from "../../services/chat/_service.chat";
import redisClient from "../../configs/redis";

const getUsersChatedController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Get all users chated controller start ...");
        if (!req.user || !req.user.id) {
            return next(createError(401));
        }

        const id = req.user.id;

        // Get users chated
        const usersChated = await chatServices.getUsersChatted(id);
        if (!usersChated) {
            return next(createError(500));
        }

        // Modify
        await Promise.all(
            usersChated.map(async (userChated, index) => {
                if (userChated.sender_id === id) {
                    userChated.user_id = userChated.receiver_id;
                    userChated.is_sender = true;
                } else if (userChated.receiver_id === id) {
                    userChated.user_id = userChated.sender_id;
                    userChated.is_sender = false;
                }
                userChated.created_at = +userChated.created_at;
                delete userChated.sender_id;
                delete userChated.receiver_id;
                delete userChated.id;

                // Check is online
                const reply = await redisClient.get(
                    `socket-${userChated.user_id}`
                );
                console.log(reply);
                userChated.is_online = reply ? true : false;
            })
        );

        // Sort
        usersChated.sort((a, b) => {
            return new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;
        });

        return res.status(200).json({
            code: 200,
            success: true,
            data: usersChated,
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Get all users chated controller has error: ", error);
        return next(createError(500));
    }
};

export default getUsersChatedController;
