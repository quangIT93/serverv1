import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import signAccessTokenService from "../../services/jwt/service.jwt.signAccessToken";
import signRefreshTokenService from "../../services/jwt/service.jwt.signRefreshToken";
import logging from "../../utils/logging";
import * as accountServices from "../../services/account/_service.account";

function removeDots(email: string) {
    var email_s = email.split("@");
    return email_s[0].replace(/\./g, "") + "@" + email_s[1];
}

const adminSignInController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logging.info("Admin sign in controller start ...");

    const email = req.body.email
        ? removeDots(req.body.email.toString().trim())
        : "";
    const password = req.body.password ? req.body.password : "";

    if (!email) {
        return next(createError(400));
    }

    try {
        // GET ADMIN BY EMAIL
        const accountData = await accountServices.readAccountByEmailService(
            email
        );

        console.log(accountData);

        if (!accountData) {
            return next(createError(404));
        }

        if (accountData.role !== 1 && accountData.role !== 2) {
            return next(createError(401));
        }

        if (accountData.id !== password) {
            return next(createError(401));
        }

        // SIGN ACCESS TOKEN AND REFRESH TOKEN
        const accessToken = await signAccessTokenService({
            id: accountData.id,
            role: accountData.role,
        });
        const refreshToken = await signRefreshTokenService({
            id: accountData.id,
            role: accountData.role,
        });

        res.status(200).json({
            code: 200,
            message: "Successfully",
            data: {
                id: accountData.id,
                role: accountData.role,
                accessToken: accessToken,
                refreshToken: refreshToken,
            },
        });
    } catch (error) {
        logging.error("Admin sign in controller start ...", error);
        next(createError(500));
    }
};

export default adminSignInController;
