import createError from "http-errors";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import * as postServices from "../../services/post/_service.post";
import * as postCategoryServices from "../../services/postCategory/_service.postCategory";
import * as postImageServices from "../../services/postImage/_service.postImage";
import * as bookmarkServices from "../../services/bookmark/_service.bookmark";
import applicationServices from "../../services/application/_service.application";
import ApplicationStatus from "../../enum/application.enum";
import MoneyType from "../../enum/money_type.enum";
import { formatPostBeforeReturn } from "./_controller.post.formatPostBeforeReturn";

interface Payload {
    id: string;
    role: number;
}

const readPostByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        
        logging.info("Read post by id controller start ...");

        // GET POST ID
        const postId = req.params.id ? +req.params.id : null;

        // VALIDATION
        if (!Number.isInteger(postId)) {
            logging.warning("Invalid post id");
            return next(createError(400));
        }

        // GET DATA
        // GET POST DATA
        let postData = await postServices.readPostById(postId);

        // console.log(postData);

        if (postData === null) {
            return next(createError(500));
        }

        if (postData[0] === undefined) {
            return next(createError(404, "Post not found."));
        }

        // CHANGE TIMESTAMP
        postData = formatPostBeforeReturn(postData[0]);

        // GET CATEGORIES OF POST
        const categories = await postCategoryServices.readCategoriesOfPost(
            postId
        );
        if (!categories) {
            return next(createError(500));
        }

        // GET IMAGES OF POST
        const images = await postImageServices.readImagesOfPost(postId);
        if (!images) {
            return next(createError(500));
        }

        // CHECK BOOKMARKED?
        // CHECK AUTHORIZE OR NOT?
        if (req.headers.authorization) {
            const headerAuthorization = req.headers.authorization;
            if (!headerAuthorization) {
                logging.warning("Invalid header authorization");
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
                    if (postData.account_id !== accountId && postData.status === 0) {
                        return next(createError(404, "Post not found."));
                    }

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

                    // CHECK APPLIED?
                    const application =
                        await applicationServices.read.readByPostIdAndAccountId(
                            postId,
                            accountId
                        );

                    // SUCCESS
                    return res.status(200).json({
                        code: 200,
                        success: true,
                        data: {
                            ...postData,
                            categories,
                            images,
                            bookmarked: postIdsOnBookmark.includes(postData.id),
                            applied: application ? true : false,
                            application_status: application
                                ? application.status
                                : null,
                            application_status_text:
                                ApplicationStatus[application?.status],
                        },
                        message: "Successfully",
                    });
                }
            );
        } else {
            // SUCCESS
            if (postData.status === 0) {
                return next(createError(404, "Post not found."));
            }
            return res.status(200).json({
                code: 200,
                success: true,
                data: {
                    ...postData,
                    categories,
                    images,
                    bookmarked: null,
                    applied: null,
                    application_status: null,
                },
                message: "Successfully",
            });
        }
    } catch (error) {
        logging.error("Read post by id controller has error: ", error);
        return next(createError(500));
    }
};

export default readPostByIdController;
