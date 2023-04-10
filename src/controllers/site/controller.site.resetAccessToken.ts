import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import * as jwtServices from "../../services/jwt/_service.jwt";

interface Payload {
    id: string;
    role: number;
}

const resetAccessTokenController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Reset access token controller start ...");
        // GET REFRESH TOKEN
        const refreshToken = req.body.refreshToken
            ? req.body.refreshToken.toString().trim()
            : null;
        if (!refreshToken) {
            logging.warning("Invalid refresh token");
            return next(createError(400));
        }

        // GET PAYLOAD FROM REFRESH TOKEN
        const payload: Payload | any =
            await jwtServices.verifyRefreshTokenService(refreshToken);

        if (!payload) {
            return next(createError(401, "Invalid refresh token"));
        }

        const newPayload = {
            id: payload.id,
            role: payload.role,
        };

        // SIGN NEW ACCESS TOKEN
        const newAccessToken = await jwtServices.signAccessTokenService(
            newPayload
        );

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: {
                accessToken: newAccessToken,
            },
            message: "Reset access token successfully",
        });
    } catch (error) {
        logging.error(error);
        return next(
            createError(500, "Internal server error or invalid refresh token")
        );
    }
};

export default resetAccessTokenController;
