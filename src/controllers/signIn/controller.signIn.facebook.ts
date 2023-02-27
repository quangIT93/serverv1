import createError from "http-errors";
import { NextFunction } from "express";
// import { verifyFacebookAccountService } from "../../services/signIn/index.js";

import { Request, Response } from "express";
import logging from "../../utils/logging";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import signAccessTokenService from "../../services/jwt/service.jwt.signAccessToken";
import signRefreshTokenService from "../../services/jwt/service.jwt.signRefreshToken";
import createProfileWithAccountIdService from "../../services/profile/service.profile.createWithAccountId";
import readAccountByFacebookIdService from "../../services/account/service.account.readByFacebookId";
import createAccountWithFacebookIdService from "../../services/account/service.account.createWithFacebookId";

const signInWithFacebook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get id token and user data from client request
        const accessToken: String = req.body.accessToken
            ? req.body.accessToken.toString().trim()
            : "";
        // Check id token and user data are valid?
        if (!accessToken) {
            return res.status(200).json({
                code: 404,
                success: false,
                message: "Invalid facebook token.",
            });
        }

        // Verify facebook account
        const verifyFacebookAccount = await axios.get(
            `https://graph.facebook.com/me?access_token=${accessToken}`
        ).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });

        //can you decode this string to utf-8?
        // let test = "Th\u0103ng Phan";

        if (!verifyFacebookAccount.data) {
            console.log('verifyFacebookAccount with error');
            return next(createError(404, 'Invalid facebook token'));
        }

        const userId = verifyFacebookAccount.data['id'] ? verifyFacebookAccount.data['id'] : '';
        const userName = verifyFacebookAccount.data['name'] ? verifyFacebookAccount.data['name'] : '';

        const userData = await (await axios.get(`https://graph.facebook.com/${userId}?fields=id,email&access_token=${accessToken}`)).data;

        if (!userData) {
            return next(createError(404, "Invalid facebook token"));
        }

        // Get user data
        const { id, email } = userData;

        // Check user id is valid?
        if (userId !== id) {
            return next(createError(400, "Invalid facebook account"));
        }

        let accountId = uuidv4();

        // TRY READ ACCOUNT BY FACEBOOK ID
        let account = await readAccountByFacebookIdService(id);
        // IF ACCOUNT IS NOT EXIST, CREATE NEW ACCOUNT
        if (!account) {
            const isCreateAccountSuccess =
                await createAccountWithFacebookIdService(accountId, id);
            logging.info(
                "isCreateAccountSuccess: ",
                isCreateAccountSuccess
            );
            if (!isCreateAccountSuccess) {
                return next(createError(500));
            }

            // CREATE PROFILE
            const isCreateProfileSuccess =
                await createProfileWithAccountIdService(accountId, email, null, userName);
            if (!isCreateProfileSuccess) {
                return next(createError(500));
            }
        } else {
            accountId = account.id;
        }

        // SIGN ACCESS TOKEN AND REFRESH TOKEN
        const accessTokenResponse = await signAccessTokenService({
            id: accountId,
            role: account['role'] || 0,
        });
        const refreshTokenResponse = await signRefreshTokenService({
            id: accountId,
            role: account['role'] || 0,
        });

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: {
                accountId,
                accessTokenResponse,
                refreshTokenResponse,
            },
        });

    } catch (error) {
        logging.error(error);
        next(createError(500, "Server internal error"));
    }
};

export default signInWithFacebook;