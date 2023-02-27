import sgMail from "@sendgrid/mail";
import otpGenerator from "otp-generator";
import createError from "http-errors";
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import {
    readAccountByEmailService,
    createAccountWithEmailService,
} from "../../services/account/_service.account";
import { createOtpService } from "../../services/otp/_service.otp";
import { createProfileWithAccountIdService } from "../../services/profile/_service.profile";

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

        // CREATE ACCOUNT DATA
        // CHECK ACCOUNT WAS EXISTED?
        // IF NOT => CREATE
        const account = await readAccountByEmailService(email);
        let accountId = uuidv4();
        if (!account) {
            // CREATE NEW ACCOUNT
            const isCreateAccountSuccess = await createAccountWithEmailService(
                accountId,
                email
            );

            if (!isCreateAccountSuccess) {
                return next(createError(500));
            }

            // CREATE PROFILE
            const isCreateProfileSuccess =
                await createProfileWithAccountIdService(accountId);
            if (!isCreateProfileSuccess) {
                return next(createError(500));
            }
        } else {
            accountId = account.id;
        }

        // CREATE OTP DATA
        const isCreateOtpSuccess = await createOtpService(otp, accountId);
        if (!isCreateOtpSuccess) {
            return next(createError(500));
        }

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
