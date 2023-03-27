import createError from "http-errors";
import { NextFunction, Request, Response } from "express";

import logging from "../../utils/logging";
import * as postServices from "../../services/post/_service.post";
import { formatPostBeforeReturn } from "./_controller.post.formatPostBeforeReturn";
import readDefaultPostImageByPostId from "../../services/category/service.category.readDefaultPostImageByPostId";

const readAcceptedPostsInBookmarkController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get limit and threshold from query
    const { limit, threshold } = req.query;

    try {
        logging.info("Read accepted posts in bookmark start ...");
        
        if (limit === "" || (limit && (Number.isNaN(+limit) || +limit <= 0))) {
            logging.warning("Invalid limit value");
            return next(createError(400));
        }

        // THRESHOLD
        if (
            (threshold && (Number.isNaN(+threshold) || +threshold <= 0))
        ) {
            logging.warning("Invalid threshold value");
            return next(createError(400));
        }

        if (!req.user || !req.user.id) {
            return next(createError(401));
        }

        const accountId = req.user.id;

        const posts = await postServices.readAcceptedPostsInBookmark(accountId, +limit, +threshold);
        if (!posts) {
            
            throw new Error("Posts not found");
        }
        

        posts.forEach((post) => {
            post = formatPostBeforeReturn(post);
        });

        const data = await Promise.all(posts.map(async (a) => {
            if (a.image === null) {
                const firstParentCategoryImage =
                    await readDefaultPostImageByPostId(
                        a.id
                    );
                if (!firstParentCategoryImage) {
                    a.image = null;
                } else {
                    a.image = firstParentCategoryImage.image;
                }
            }
            return a;
        }));

        let isOver = false;

        if (posts.length < +limit) {
            isOver = true;
        }


        return res.status(200).json({
            code: 200,
            success: true,
            data: data,
            is_over: isOver,
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Read accepted posts in bookmark has error: ", error);
        return next(createError(500));
    }
};

export default readAcceptedPostsInBookmarkController;
