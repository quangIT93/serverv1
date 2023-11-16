import jwt from "jsonwebtoken";
import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../utils/logging";
import readCompanyInformationByAccountIdService from "../services/company/service.readCompanyInformationByAccountId";

// This middleware is used to check if the user has permission to create post or not
// if company of user is not verified, user cannot create post

// Note: This middleware is not like verifyAccessToken middleware

// It is used in the following routes:
// - /api/v1/search

const checkPermisionCreatePost = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    
    const accountId = req.user.id;

    const companyInformation = await readCompanyInformationByAccountIdService(accountId);

    if (!companyInformation) {
        return next(createError(
            406,
            "You have not registered a company yet"
        ));
    }

    if (!companyInformation.status) {
        return next(createError(
            406,
            "Your company has not been verified yet"
        ));
    }

    next();
};

export default checkPermisionCreatePost;
