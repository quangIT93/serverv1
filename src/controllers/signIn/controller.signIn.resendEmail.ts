import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import sgMail from "@sendgrid/mail";

import logging from "../../utils/logging";
import { createOtpService } from "../../services/otp/_service.otp";
import { readAccountByEmailService } from "../../services/account/_service.account";
import Helper from "../../helpers/helper.class";

const resendEmailController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // GET EMAIL
        const email = req.body.email ? req.body.email.toString().trim() : "";
        if (!email) {
            return next(createError(400, "Invalid email"));
        }

        // GET ACCOUNT BY EMAIL
        const accountData = await readAccountByEmailService(email);
        if (!accountData) {
            return next(createError(404, "Incorrect email"));
        }

        const helper = new Helper();

        // CREATE OTP
        const otp = helper.generateOTP();

        // SEND EMAIL
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: {
                email: email,
            },
            from: {
                email: process.env.SENDGRID_HOST_EMAIL,
                name: "Hi Job",
            },
            subject: "Verify email",
            templateId: process.env.SENDGRID_TEMPLATE_ID,
            dynamicTemplateData: {
                name: "my friend",
                code: otp,
            },
        };
        sgMail.send(msg);

        // CREATE OTP
        const isCreateOtpSuccess = await createOtpService(otp, accountData.id);
        if (!isCreateOtpSuccess) {
            return next(createError.InternalServerError());
        }

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            message: "Resend email successfully",
        });
    } catch (error) {
        // ERROR
        logging.error("Resend email controller has error: ", error);
        return next(createError(500));
    }
};

export default resendEmailController;
