import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import { verifyRefreshTokenService } from "../../services/jwt/_service.jwt";
import redisClient from "../../configs/redis";

interface Payload {
    id: string;
    role: number;
}

const signOutController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Sign out controller start ...");
        // GET REFRESH TOKEN
        const refreshToken = req.body.refreshToken
            ? req.body.refreshToken.toString().trim()
            : "";
        if (!refreshToken) {
            logging.warning("Invalid refresh token");
            return next(createError(400));
        }

        // GET PAYLOAD FROM REFRESH TOKEN
        const payload: Payload | any = await verifyRefreshTokenService(
            refreshToken
        );
        const { id } = payload;
        if (payload && payload.id) {
            // REMOVE REFRESH TOKEN BY EMAIL IN REDIS SERVER
            redisClient.del(id);

            // REMOVE SOCKET BY ID IN REDIS SERVER
            redisClient.del(`socket-${id}`);

            logging.success("Delete refresh token and socket success");
        }

        return res.status(200).json({
            success: true,
            message: "Sign out success",
        });
    } catch (error) {
        logging.error("Sign out controller has error: ", error);
        next(createError(500));
    }
};

export default signOutController;
