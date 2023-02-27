import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import logging from "../../utils/logging";
import * as postServices from "../../services/post/_service.post";
// import MoneyType from "../../enum/money_type.enum";
import { formatPostBeforeReturn } from "./_controller.post.formatPostBeforeReturn";

const readAllPostsByThemeController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Read all posts by theme controller start ...");

        const themeId = +req.query.tid;
        if (!Number.isInteger(themeId) || themeId <= 0) {
            logging.warning("invalid theme id");
            return next(createError(400));
        }

        // GET POSTS
        const posts = await postServices.readAllPostsByTheme(themeId);
        if (!posts) {
            return next(createError(500));
        }

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
        logging.error("Read all posts by theme controller has error: ", error);
        return next(createError(500));
    }
};

export default readAllPostsByThemeController;
