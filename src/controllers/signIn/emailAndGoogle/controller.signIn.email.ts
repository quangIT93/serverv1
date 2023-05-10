import otpGenerator from "otp-generator";
import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../../utils/logging";
import { createOtpService } from "../../../services/otp/_service.otp";
import { sendEmailToUser } from "../../../transport/transport";

const signInWithEmailController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Sign in with email controller start ...");
        // GET EMAIL (VALIDATED IN MIDDLEWARE)
        const email = req.body.email;

        // CREATE OTP
        const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        console.log(email, ":", otp);

        // INSERT OTP TO DATABASE
        const isCreateOtpSuccess = await createOtpService(otp, email, '1');
        
        if (!isCreateOtpSuccess) {
            return next(createError(500));
        }

        // SEND EMAIL
        sendEmailToUser({
            to: email,
            subject: "Verify email",
            html: `<!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Mã xác minh OTP của bạn</title>
                    </head>
                    <body>
                        <div>
                            <h2>Xin chào,</h2>
                            <p>Chúng tôi đã nhận được yêu cầu đăng nhập vào tài khoản của bạn. Dưới đây là mã xác minh OTP của bạn để hoàn tất đăng nhập:</p>
                            <h3>${otp}</h3>
                            <p>Vui lòng nhập mã xác minh này trong trang đăng nhập để hoàn tất quá trình đăng nhập.</p>
                            <p>Nếu bạn không yêu cầu đăng nhập này, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi ngay lập tức.</p>
                            <p>Trân trọng cảm ơn,</p>
                            <p>Neoworks,. ltd</p>
                        </div>
                    </body>
                    </html>`,
        });
        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            message: "Successfully",
        });
    } catch (error) {
        // ERROR
        logging.error("Sign in with email controller has error: ", error);
        next(createError.InternalServerError());
    }
};

export default signInWithEmailController;
