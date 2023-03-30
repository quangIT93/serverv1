import createError from "http-errors";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import logging from "../../utils/logging";
import * as postServices from "../../services/post/_service.post";
import * as bookmarkServices from "../../services/bookmark/_service.bookmark";
// import MoneyType from "../../enum/money_type.enum";
import { formatPostBeforeReturn } from "./_controller.post.formatPostBeforeReturn";

interface Payload {
    id: string;
    role: number;
}

const readNewestAcceptedPostsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // logging.info("Read newest accepted posts controller start ...");
        const { lang = "vi" } = req.query;

        if (lang !== "vi" && lang !== "en" && lang !== "ko") {
            logging.warning("Invalid lang");
            return next(createError(400));
        }
        // GET QUERY PARAMETERS
        const parentCategoryId = req.query.pcid;
        const childCategoryIds = req.query.ccid;
        const districtIds = req.query.dtid;
        const limit = req.query.limit;
        const threshold = req.query.threshold;

        // VALIDATION
        // PARENT CATEGORY ID
        if (
            parentCategoryId === "" ||
            (parentCategoryId &&
                (Number.isNaN(+parentCategoryId) || +parentCategoryId <= 0))
        ) {
            logging.warning("Invalid parent category id value");
            return next(createError(400));
        }

        let isError = false;

        // CHILD CATEGORY IDS
        if (Array.isArray(childCategoryIds)) {
            childCategoryIds.forEach((cid) => {
                if (Number.isNaN(+cid) || +cid <= 0) {
                    logging.warning("Invalid child category id value");
                    isError = true;
                    return;
                }
            });
        } else if (
            childCategoryIds === "" ||
            (childCategoryIds &&
                (Number.isNaN(+childCategoryIds) || +childCategoryIds <= 0))
        ) {
            logging.warning("Invalid child category id value");
            return next(createError(400));
        }

        // DISTRICT IDS
        if (Array.isArray(districtIds)) {
            districtIds.forEach((cid) => {
                if (Number.isNaN(+cid) || +cid <= 0) {
                    logging.warning("Invalid district id value");
                    isError = true;
                    return;
                }
            });
        } else if (
            districtIds === "" ||
            (districtIds && (Number.isNaN(+districtIds) || +districtIds <= 0))
        ) {
            logging.warning("Invalid district id value");
            return next(createError(400));
        }

        // LIMIT
        if (limit === "" || (limit && (Number.isNaN(+limit) || +limit <= 0))) {
            logging.warning("Invalid limit value");
            return next(createError(400));
        }

        // THRESHOLD
        if (
            threshold === "" ||
            (threshold && (Number.isNaN(+threshold) || +threshold <= 0))
        ) {
            logging.warning("Invalid threshold value");
            return next(createError(400));
        }

        if (isError) {
            logging.warning("Invalid child category id or district id value");
            return next(createError(400));
        }

        // GET DATA
        let posts;
        if (childCategoryIds && districtIds) {
            logging.info(
                "Read newest accepted posts by child categories and districts"
            );
            posts =
                await postServices.readNewestAcceptedPostsByChildCategoriesAndDistricts(
                    Array.isArray(childCategoryIds)
                        ? childCategoryIds.map((item) => +item)
                        : [+childCategoryIds],
                    Array.isArray(districtIds)
                        ? districtIds.map((item) => item)
                        : [districtIds],
                    Number.isInteger(+limit) ? +limit : null,
                    Number.isInteger(+threshold) ? +threshold : null
                );
        } else if (parentCategoryId && districtIds) {
            logging.info(
                "Read newest accepted posts by parent category and districts"
            );
            posts =
                await postServices.readNewestAcceptedPostsByParentCategoryAndDistricts(
                    +parentCategoryId,
                    Array.isArray(districtIds)
                        ? districtIds.map((item) => +item)
                        : [+districtIds],
                    Number.isInteger(+limit) ? +limit : null,
                    Number.isInteger(+threshold) ? +threshold : null
                );
        } else if (districtIds) {
            logging.info("Read newest accepted posts by districts");
            posts = await postServices.readNewestAcceptedPostsByDistricts(
                Array.isArray(districtIds)
                    ? districtIds.map((item) => +item)
                    : [+districtIds],
                Number.isInteger(+limit) ? +limit + 1 : null,
                Number.isInteger(+threshold) ? +threshold : null
            );
        } else if (childCategoryIds) {
            logging.info("Read newest accepted posts by child categories");
            posts = await postServices.readNewestAcceptedPostsByChildCategories(
                Array.isArray(childCategoryIds)
                    ? childCategoryIds.map((item) => +item)
                    : [+childCategoryIds],
                Number.isInteger(+limit) ? +limit : null,
                Number.isInteger(+threshold) ? +threshold : null
            );
        } else if (parentCategoryId) {
            logging.info("Read newest accepted posts by parent category");
            posts = await postServices.readNewestAcceptedPostsByParentCategory(
                +parentCategoryId,
                Number.isInteger(+limit) ? +limit : null,
                Number.isInteger(+threshold) ? +threshold : null
            );
        } else {
            logging.info("Read newest accepted posts");
            posts = await postServices.readNewestAcceptedPosts(
                Number.isInteger(+limit) ? +limit : null,
                Number.isInteger(+threshold) ? +threshold : null
            );
        }

        if (!posts) {
            return next(createError(500));
        }


        // MODIFY
        await Promise.all(
            posts.map(async (post, index: number) => {
                posts[index] = await formatPostBeforeReturn(post, lang);

            })
        );

        // console.log("ad",posts);


        // GET BOOKMARKS
        // CHECK AUTHORIZE OR NOT?
        if (req.headers.authorization) {
            const headerAuthorization = req.headers.authorization;
            if (!headerAuthorization) {
                logging.warning("readNewest: Invalid header authorization");
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
                                    ? posts.length <= +limit
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
                    })),
                    is_over:
                        Number.isInteger(+limit) && +limit > 0
                            ? posts.length <= +limit
                            : true,
                },
                message: "Successfully",
            });
        }
    } catch (error) {
        logging.error(
            "Read newest accepted posts controller has error: ",
            error
        );
        return next(createError(500));
    }
};

export default readNewestAcceptedPostsController;
