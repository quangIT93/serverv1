import { Request, Response, NextFunction } from "express"; 
import createError from "http-errors";
import logging from "../../utils/logging";
import * as fcmTokenServices from "../../services/fcm-token/_service.fcm-token";


const createFcmTokenForAccountController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    try {
        logging.info("Create fcm token for account controller start ...");

        const { token: fcmToken } = req.params;

        // VALIDATION
        
        
        if (!fcmToken) {
            logging.warning("Invalid fcm token");
            return next(createError(400, "Invalid fcm token"));
        }
        if (typeof fcmToken !== "string") {
            logging.warning("Invalid fcm token");
            return next(createError(400, "Invalid fcm token"));
        }

        const result = await fcmTokenServices.createFcmTokenService(id, fcmToken);
        
        if (result === "ER_DUP_ENTRY") {
            logging.warning("Duplicate fcm token");
            return res.status(200).json({
                code: 200,
                message: "This fcm token is already exist",
                data: {},
                success: true
            });
        }

        if (!result) {
            logging.warning("Create fcm token failed");
            return next(createError(500, "Create fcm token failed"));
        }

        res.status(200).json({
            code: 200,
            message: "Create fcm token successfully",
            data: {},
            success: true

        });

       
    } catch (error) {
        next(createError(500, "Internal server error"));
    }
}

export default createFcmTokenForAccountController;