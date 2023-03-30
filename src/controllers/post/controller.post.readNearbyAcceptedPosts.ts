import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import logging from "../../utils/logging";
import * as postServices from "../../services/post/_service.post";
import * as bookmarkServices from "../../services/bookmark/_service.bookmark";
// import MoneyType from "../../enum/money_type.enum";
import { formatPostBeforeReturn } from "./_controller.post.formatPostBeforeReturn";

const readNearbyAcceptedPostsController = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
        // logging.info("Read nearby accepted posts controller start ...");
        
        // CHECK AUTHORIZE
        if (!req.user) {
            return next(createError(401));
        }
        
        // GET QUERY PARAMETERS
        const parentCategoryId = req.query.pcid;
        const childCategoryIds = req.query.ccid;
        const provinceIds = req.query.pvid;
        const limit = req.query.limit;
        const threshold = req.query.threshold;
        // PROVINCE IDS
        if (!provinceIds) {
            logging.warning("Invalid province id value");
            return next(createError(400));
        }
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
        if (childCategoryIds && provinceIds) {
            logging.info(
                "Read nearby accepted posts by child categories and provinces"
            );
            posts =
                await postServices.readNewestAcceptedPostsByChildCategoriesAndProvinces(
                    req.user.id,
                    Array.isArray(childCategoryIds)
                        ? childCategoryIds.map((item) => +item)
                        : [+childCategoryIds],
                    Array.isArray(provinceIds)
                        ? provinceIds.map((item) => +item)
                        : [+provinceIds],
                    Number.isInteger(+limit) ? +limit + 1 : null,
                    Number.isInteger(+threshold) ? +threshold : null
                );
        } else if (parentCategoryId && provinceIds) {
            logging.info("Run query:")

            logging.info(
                "Read nearby accepted posts by parent category and provinces"
            );
            posts =
                await postServices.readNewestAcceptedPostsByParentCategoryAndProvinces(
                    req.user.id,
                    +parentCategoryId,
                    Array.isArray(provinceIds)
                        ? provinceIds.map((item) => item)
                        : [provinceIds],
                    Number.isInteger(+limit) ? +limit + 1 : null,
                    Number.isInteger(+threshold) ? +threshold : null
                );
        } else {
            logging.info("Read nearby accepted posts by provinces");
            posts = await postServices.readNewestAcceptedPostsByProvinces(
                req.user.id,
                Array.isArray(provinceIds)
                    ? provinceIds.map((item) => item)
                    : [provinceIds],
                Number.isInteger(+limit) ? +limit + 1 : null,
                Number.isInteger(+threshold) ? +threshold : null
            );
        }

        if (!posts) {
            return next(createError(500));
        }

        // MODIFY
        await Promise.all(
            posts.map(async (post, index) => {
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

        
        // GET BOOKMARKS OF ACCOUNT
        const bookmarks = await bookmarkServices.readByAccountId(req.user.id);
        if (!bookmarks) {
            return next(createError(500));
        }
        
        const postIdsOnBookmark = bookmarks.map((bookmark) => bookmark.post_id);
        
        // console.log(posts);
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
    } catch (error) {
            logging.error(
                "Read nearby accepted posts controller has error: ",
            error
        );
        return next(createError(500));
    }
};

export default readNearbyAcceptedPostsController;
