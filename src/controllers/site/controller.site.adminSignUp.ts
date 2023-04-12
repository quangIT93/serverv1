import createError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import sgMail from "@sendgrid/mail";

import logging from "../../utils/logging";
import * as accountServices from "../../services/account/_service.account";
import createProfileWithAccountIdService from "../../services/profile/service.profile.createWithAccountId";

interface Payload {
    id: string;
    role: number;
}

// REMOVE INVALID DOT CHARS FROM EMAIL
function removeDots(email: string) {
    var email_s = email.split("@");
    return email_s[0].replace(/\./g, "") + "@" + email_s[1];
}

const adminSignUpController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Admin sign up controller start ...");

        const role = +req.body.role;
        const email = req.body.email
            ? removeDots(req.body.email.toString().trim())
            : "";
        if (role !== 2 || !email) {
            return next(createError(400));
        }

        // Check email was existed?
        const account = await accountServices.readAccountByEmailService(email);
        if (account) {
            return next(createError(409));
        }

        // Create account with email
        const accountId = uuidv4();
        const isCreateAccountSuccess =
            await accountServices.createAccountWithEmailService(
                accountId,
                email,
                role
            );
        if (!isCreateAccountSuccess) {
            return next(createError(500));
        }

        // create profile
        const isCreateProfileSuccess = await createProfileWithAccountIdService(
            accountId,
            email
        );

        if (!isCreateProfileSuccess) {
            return next(createError(500));
        }

        // Send password to email
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: {
                email: email,
            },
            from: {
                email: process.env.SENDGRID_HOST_EMAIL,
                name: "Hi Job",
            },
            subject: "Hi Job: Account Password",
            templateId: process.env.SENDGRID_TEMPLATE_ID,
            dynamicTemplateData: {
                name: "My partner",
                code: accountId,
            },
        };
        await sgMail.send(msg);

        return res.status(201).json({
            code: 201,
            success: true,
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Admin sign up controller has error: ", error);
        return next(createError(500));
    }
};

export default adminSignUpController;
