import logging from "../../utils/logging";
import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import { getLastOtpByEmailService } from "../../services/otp/_service.otp";

const checkSignInWithEmailRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // REMOVE INVALID DOT CHARS FROM EMAIL
        function removeDots(email: string) {
            var email_s = email.split("@");
            if (!email_s[0]) return "";
            if (!email_s[1]) return "";
            return email_s[0].replace(/\./g, "") + "@" + email_s[1];
        }

        
        // GET EMAIL
        let email = req.body.email
        ? removeDots(req.body.email.toString().trim())
        : "";
        if (!email) {
            return next(createError(400, "Invalid email"));
        }

        // GET LAST OTP BY EMAIL
        const lastOtp = await getLastOtpByEmailService(email);
        if (!lastOtp) {
            req.body.email = email;
            return next();
        }

        // CHECK OTP IS STILL VALID
        // created_at + 60s < current time
        if (
            +new Date(lastOtp.created_at).getTime() + 60000 >
            +new Date().getTime()
        ) {
            return next(createError(409, "Otp still expire"));
        }

        // CAN REQUEST
        req.body.email = email;
        return next();
    } catch (error) {
        logging.error("Check sign in with email request error: ", error);
        return next(createError(500));
    }
};

export default checkSignInWithEmailRequest;
