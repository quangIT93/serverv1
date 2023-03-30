import createError from "http-errors";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import * as postServices from "../../services/post/_service.post";
import * as bookmarkServices from "../../services/bookmark/_service.bookmark";
import * as categoryServices from "../../services/category/_service.category";
import MoneyType from "../../enum/money_type.enum";
import { formatPostBeforeReturn } from "./_controller.post.formatPostBeforeReturn";

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

        if (limit === "" || (limit && (Number.isNaN(+limit) || +limit <= 0))) {
            logging.warning("Invalid limit value");
            return next(createError(400));
        }

        if (
            threshold === "" ||
            (threshold && (Number.isNaN(+threshold) || +threshold <= 0))
        ) {
            logging.warning("Invalid limit value");
            return next(createError(400));
        }

        // READ ACCEPTED POSTS BY THEME
        const posts = await postServices.readAcceptedPostsByTheme(
            themeId,
            Number.isInteger(+limit) ? +limit : null,
            Number.isInteger(+threshold) ? +threshold : null
        );
        if (!posts) {
            return next(createError(500));
        }

        await Promise.all(
            posts.map(async (post, index: number) => {
                posts[index] = await formatPostBeforeReturn(post);
                // if (post.image === null) {
                //     const firstParentCategoryImage =
                //         await categoryServices.readDefaultPostImageByPostId(
                //             post.id
                //         );
                //     if (!firstParentCategoryImage) {
                //         post.image = null;
                //     } else {
                //         post.image = firstParentCategoryImage.image;
                //     }
                // }
            })
        );

        // GET BOOKMARKS
        // CHECK AUTHORIZE OR NOT?
        if (req.headers.authorization) {
            const headerAuthorization = req.headers.authorization;
            if (!headerAuthorization) {
                logging.warning("readAccepted: Invalid header authorization");
                return next(createError(401));
            }
            // GET ACCESS TOKEN
            const accessToken = headerAuthorization.split("Bearer")[1]
                ? headerAuthorization.split("Bearer")[1].toString().trim()
                : null;

            if (!accessToken) {
                logging.warning("Invalid access token");
                return next(createError(401));
            }

            // VERIFY ACCESS TOKEN
            jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET,
                async function (err, payload: Payload) {
                    if (err) {
                        // EXPIRED ERROR
                        if (err.name === "TokenExpiredError") {
                            logging.error("Token expired");
                            return next(createError(403));
                        }

                        // OTHER ERROR
                        logging.error(err.message);
                        return next(createError(401));
                    }

                    // VERIFY SUCCESS
                    const accountId = payload.id;

                    // GET BOOKMARKS OF ACCOUNT
                    const bookmarks = await bookmarkServices.readByAccountId(
                        accountId
                    );
                    if (!bookmarks) {
                        return next(createError(500));
                    }

                    const postIdsOnBookmark = bookmarks.map(
                        (bookmark) => bookmark.post_id
                    );

                    // SUCCESS
                    return res.status(200).json({
                        code: 200,
                        success: true,
                        data: {
                            posts: posts.map((post) => ({
                                ...post,
                                bookmarked: postIdsOnBookmark.includes(post.id),
                            })),
                            is_over:
                                Number.isInteger(+limit) && +limit > 0
                                    ? posts.length < +limit
                                    : true,
                        },
                        message: "Successfully",
                    });
                }
            );
        } else {
            // SUCCESS
            return res.status(200).json({
                code: 200,
                success: true,
                data: {
                    posts: posts.map((post) => ({
                        ...post,
                        bookmarked: null,
                        // money_type_text: MoneyType[post.money_type],
                        // money_type: +post.money_type

                    })),
                    is_over:
                        Number.isInteger(+limit) && +limit > 0
                            ? posts.length < +limit
                            : true,
                },
                message: "Successfully",
            });
        }
    } catch (error) {
        logging.error(
            "Read accepted posts by theme controller has error: ",
            error
        );
        return next(createError(500));
    }
};

export default readAcceptedPostsByThemeController;
