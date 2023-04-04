import createError from "http-errors";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import logging from "../../../../utils/logging";
import * as postServices from "../../../../services/post/_service.post";
import * as bookmarkServices from "../../../../services/bookmark/_service.bookmark";
import * as categoryServices from "../../../../services/category/_service.category";
import MoneyType from "../../../../enum/money_type.enum";
import { formatPostBeforeReturn } from "../../_controller.post.formatPostBeforeReturn";
import { PostResponse, PostService } from "../../../../interface/Post";
import { checkBookmark } from "../../../../middlewares/checkBookmark";

interface Payload {
    id: string;
    role: number;
}

const readAcceptedPostsByThemeController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // logging.info("Read accepted posts by theme controller start ...");

        const themeId = +req.query.tid;
        const limit = req.query.limit;
        const threshold = req.query.threshold;

        if (!Number.isInteger(themeId) || themeId <= 0) {
            logging.warning("Invalid theme id");
            return next(createError(400));
        }

        // READ ACCEPTED POSTS BY THEME
        const posts: PostService[] = await postServices.readAcceptedPostsByTheme(
            req.query.lang.toString(),
            themeId,
            +limit + 1,
          threshold ? +threshold : null
        );
        if (!posts) {
            return next(createError(500));
        }

        const postResponse: PostResponse[] = await Promise.all(
            posts.map(async (post) => {
                return await formatPostBeforeReturn(post);
            })
        );

        res.locals.posts = postResponse;
        next();
        
    } catch (error) {
        logging.error(
            "Read accepted posts by theme controller has error: ",
            error
        );
        return next(createError(500));
    }
};

export default readAcceptedPostsByThemeController;
