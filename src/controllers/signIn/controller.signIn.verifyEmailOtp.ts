import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import logging from "../../utils/logging";
import { getLastOtpByEmailService } from "../../services/otp/_service.otp";
import {
    signAccessTokenService,
    signRefreshTokenService,
} from "../../services/jwt/_service.jwt";
import { readAccountByEmailService } from "../../services/account/_service.account";

const verifyEmailOtpController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        function removeDots(email: string) {
            var email_s = email.split("@");
            return email_s[0].replace(/\./g, "") + "@" + email_s[1];
        }

        logging.info("Verify email otp controller start ...");
        // GET OTP AND EMAIL
        const otp = req.body.otp ? req.body.otp.toString().trim() : "";
        const email = req.body.email
            ? removeDots(req.body.email.toString().trim())
            : "";
        if (!otp) {
            logging.warning("Invalid otp");
            return next(createError(400));
        }

        if (!email) {
            logging.warning("Invalid email");
            return next(createError(400));
        }

        // GET LAST OTP BY EMAIL
        const lastOtpByEmail = await getLastOtpByEmailService(email);
        if (!lastOtpByEmail) {
            return next(createError(404, "Incorrect email"));
        }

        // COMPARE OTP
        if (lastOtpByEmail.otp !== otp) {
            return next(createError(409, "Incorrect otp"));
        }

        // CHECK OTP EXPIRE
        // created_at + 60s > current time
        if (
            +new Date(lastOtpByEmail.created_at).getTime() + 60000 * 3 <=
            +new Date().getTime()
        ) {
            return next(createError(400, "Otp expired"));
        }

        // GET ACCOUNT DATA BY EMAIL
        const accountData = await readAccountByEmailService(email);

        // SIGN ACCESS TOKEN AND REFRESH TOKEN
        const accessToken = await signAccessTokenService({
            id: accountData.id,
            role: +accountData.role,
        });
        const refreshToken = await signRefreshTokenService({
            id: accountData.id,
            role: +accountData.role,
        });

        // SUCCESS
        return res.json({
            code: 200,
            success: true,
            data: {
                accountId: accountData.id,
                accessToken,
                refreshToken,
            },
            message: "Verify email successfully",
        });
    } catch (error) {
        // ERROR
        logging.error("Verify email otp controller has error: ", error);
        return next(createError(500));
    }
};

export default verifyEmailOtpController;
