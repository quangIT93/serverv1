import jwt from 'jsonwebtoken';
import { JwksClient } from "jwks-rsa";

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

const signInWithAplleIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { identityToken } = req.body;

        if (!identityToken) {
            return next(createError(400, "Invalid identityToken"));
        }
        const json = jwt.decode(identityToken, { complete: true });


        const kid = json.header.kid;

        if (!kid) {
            return next(createError(400, "Invalid kid"));
        }

        const client = new JwksClient({
            jwksUri: "https://appleid.apple.com/auth/keys",
        });

        const appleKeys = await client.getSigningKey(kid);

        if (!appleKeys) {
            return next(createError(400, "Something went wrong"));
        }

        const applePublicKey = appleKeys.getPublicKey();

        if (!applePublicKey) {
            return next(createError(400, "Something went wrong"));
        }

        const decoded = jwt.verify(identityToken, applePublicKey, {
            algorithms: ["RS256"],
        });

        // console.log("decoded: ", decoded);

        const email = decoded['email'];

        const sub = decoded['sub'];

        // GET ACCOUNT BY EMAIL
        if (!email) {
            return next(createError(404, "Invalid email"));
        }

        const account = await readAccountByEmailService(email);
        let accountId = uuidv4();
        if (!account) {
            // CREATE NEW ACCOUNT
            const isCreateAccountSuccess = await createAccountWithEmailService(
                accountId,
                email
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
                    // name
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

export default signInWithAplleIdController;
