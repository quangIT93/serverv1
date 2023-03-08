import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import logging from "../../utils/logging";
import * as chatServices from "../../services/chat/_service.chat";
import redisClient from "../../configs/redis";
import MoneyType from "../../enum/money_type.enum";

const getUsersChattedController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Get all users chatted controller start ...");
        if (!req.user || !req.user.id) {
            return next(createError(401));
        }

        const id = req.user.id;

        // Get users chatted
        const usersChatted = await chatServices.getUsersChatted(id);
        if (!usersChatted) {
            return next(createError(500));
        }

        // Modify
        await Promise.all(
            usersChatted.map(async (userChatted, _) => {
                if (userChatted.sender_id === id) {
                    userChatted.user_id = userChatted.receiver_id;
                    userChatted.is_sender = true;
                } else if (userChatted.receiver_id === id) {
                    userChatted.user_id = userChatted.sender_id;
                    userChatted.is_sender = false;
                }
                userChatted.created_at = +userChatted.created_at;
                delete userChatted.sender_id;
                delete userChatted.receiver_id;
                delete userChatted.id;

                // Check is online
                const reply = await redisClient.get(
                    `socket-${userChatted.user_id}`
                );
                if (userChatted.money_type !== undefined) {
                    userChatted.money_type = +userChatted.money_type;
                    userChatted.money_type_text = MoneyType[userChatted.money_type];
                }
                userChatted.is_online = reply ? true : false;
            })
        );

        // Sort
        usersChatted.sort((a, b) => {
            return new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;
        });

        return res.status(200).json({
            code: 200,
            success: true,
            data: usersChatted,
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Get all users chatted controller has error: ", error);
        return next(createError(500));
    }
};

export default getUsersChattedController;
