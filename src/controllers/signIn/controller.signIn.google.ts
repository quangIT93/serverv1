import { OAuth2Client } from "google-auth-library";
import createError from "http-errors";
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import {
    signAccessTokenService,
    signRefreshTokenService,
} from "../../services/jwt/_service.jwt";
import {
    readAccountByEmailService,
    createAccountWithEmailService,
} from "../../services/account/_service.account";
import { createProfileWithAccountIdService } from "../../services/profile/_service.profile";

const signInWithGoogleController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        function removeDots(email: string) {
            var email_s = email.split("@");
            if (!email_s[0]) return "";
            if (!email_s[1]) return "";
            return email_s[0].replace(/\./g, "") + "@" + email_s[1];
        }

        logging.info("Sign in with google controller start ...");
        // GET DATA
        const idToken: string = req.body.idToken
            ? req.body.idToken.toString().trim()
            : "";
        const isIOS: boolean = req.body.isIOS;

        if (!idToken) {
            return next(createError(400, "Invalid id token"));
        }

        if (!(isIOS === true || isIOS === false)) {
            return next(createError(400, "Invalid isIOS value"));
        }

        // INIT CLIENT ID
        const CLIENT_ID = isIOS
            ? process.env.GOOGLE_CLIENT_ID_FOR_IOS
            : process.env.GOOGLE_CLIENT_ID_FOR_ANDROID;

        // INIT OAUTH2 CLIENT
        const client = new OAuth2Client(CLIENT_ID);

        // GET TICKET
        const ticket = await client.verifyIdToken({
            idToken,
            audience: CLIENT_ID,
        });

        // GET DATA OF GOOGLE USER
        const payload = ticket.getPayload();
        const { sub, name, email, picture } = payload;

        // REMOVE INVALID DOT CHARS FROM EMAIL
        const emailRemovedDots = email ? removeDots(email) : "";
        
        // GET ACCOUNT BY EMAIL
        if (!email) {
            return next(createError(404, "Invalid email"));
        }
        
        const account = await readAccountByEmailService(emailRemovedDots);
        let accountId = uuidv4();
        if (!account) {
            // CREATE NEW ACCOUNT
            const isCreateAccountSuccess = await createAccountWithEmailService(
                accountId,
                emailRemovedDots
            );
            logging.info("isCreateAccountSuccess: ", isCreateAccountSuccess);
            if (!isCreateAccountSuccess) {
                return next(createError(500));
            }

            // CREATE PROFILE
            const isCreateProfileSuccess =
                await createProfileWithAccountIdService(
                    accountId,
                    email,
                    null,
                    name || "",
                );
            if (!isCreateProfileSuccess) {
                return next(createError(500));
            }
        } else {
            accountId = account.id;
        }

        // SIGN ACCESS TOKEN AND REFRESH TOKEN
        const accessToken = await signAccessTokenService({
            id: accountId,
            role: 0,
        });
        const refreshToken = await signRefreshTokenService({
            id: accountId,
            role: 0,
        });

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: {
                accountId,
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        logging.error("Sign in with google controller has error: ", error);
        return next(createError(500));
    }
};

export default signInWithGoogleController;
