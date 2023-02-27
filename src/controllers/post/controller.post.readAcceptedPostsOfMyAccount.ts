import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import * as postServices from "../../services/post/_service.post";
import MoneyType from "../../enum/money_type.enum";
import { formatPostBeforeReturn } from "./_controller.post.formatPostBeforeReturn";

const readAcceptedPostsOfMyAccountController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Read posts of my account controller start ...");

        if (!req.user || !req.user.id) {
            return next(createError(401));
        }

        const accountId = req.user.id.toString().trim();
        if (!accountId) {
            return next(createError(401));
        }

        // READ ACCEPTED POSTS BY ACCOUNT ID
        const posts = await postServices.readAcceptedPostsByAccountId(
            accountId
        );

        // MODIFY
        posts.forEach((post) => {
            post = formatPostBeforeReturn(post);
        });

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: posts,
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Read posts of my account controller has error: ", error);
        return next(createError(500));
    }
};

export default readAcceptedPostsOfMyAccountController;
