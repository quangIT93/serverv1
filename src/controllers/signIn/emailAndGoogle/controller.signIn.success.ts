import { NextFunction, Request, Response } from "express";
import signAccessTokenService from "../../../services/jwt/service.jwt.signAccessToken";
import signRefreshTokenService from "../../../services/jwt/service.jwt.signRefreshToken";
import createHttpError from "http-errors";
import logging from "../../../utils/logging";
import createAccountWithEmail from "./utils/createAccountWithEmail";
import createProfile from "./utils/createProfile";

const handlerSignInSuccessful = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // this is email with dots (ex: "ab.c@gmail.com")
        // use this email to PROFILE
        const email = req.body.email;

        // this is email without dots (ex: "abc@gmail.com")
        // use this email to ACCOUNT
        const emailRemovedDots = req.body.emailRemovedDots;

        // try create account with email
        // if account existed, return account data
        // if account not existed, create new account and return account data
        let accountData: any | null = await createAccountWithEmail({
            email: emailRemovedDots,
            ggId: req.body.ggId ? req.body.ggId : "",
        })

        if (!accountData) {
            next(createHttpError(500, "Internal server error"))
        }

        // try create profile with accountId
        // if profile existed, return profile data
        // if profile not existed, create new profile and return profile data
        let isCreateProfileSuccess = await createProfile(
            {
                accountId: accountData.accountId,
                email: email,
                name: req.body.name ? req.body.name : ""
            }
        )

        if (!isCreateProfileSuccess) {
            next(createHttpError(500, "Internal server error"))
        }
    
        // SIGN ACCESS TOKEN AND REFRESH TOKEN
        const accessToken = await signAccessTokenService({
            id: accountData.accountId,
            role: +accountData.role,
        });
        const refreshToken = await signRefreshTokenService({
            id: accountData.accountId,
            role: +accountData.role,
        });
    
        // SUCCESS
        return res.json({
            code: 200,
            success: true,
            data: {
                accountId: accountData.accountId,
                accessToken,
                refreshToken,
            },
            message: "Verify email successfully",
        });
    } catch (error) {
        logging.error(error)
        return createHttpError(500, "Internal server error")
    }
}

export default handlerSignInSuccessful;