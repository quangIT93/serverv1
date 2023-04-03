import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import logging from "../../../../utils/logging";
import * as postServices from "../../../../services/post/_service.post";
import * as bookmarkServices from "../../../../services/bookmark/_service.bookmark";
// import MoneyType from "../../enum/money_type.enum";
import { formatPostBeforeReturn } from "../../_controller.post.formatPostBeforeReturn";
import { isArrayNumber, isNumber } from "../../../../helpers/checkData/checkTypeOfData";
import { formatToArrayNumber, formatToStringNumberArray } from "../../../../helpers/formatData/formatArray";
import {PostResponse, PostService} from "../../../../interface/Post";

const readNearbyAcceptedPostsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // logging.info("Read nearby accepted posts controller start ...");

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
        if (parentCategoryId && isNumber(parentCategoryId) === false || +parentCategoryId <= 0) {
            logging.warning("Invalid parent category id value");
            return next(createError(400));
        }


        // CHILD CATEGORY IDS
        if (childCategoryIds) {
            if (Array.isArray(childCategoryIds)) {
                if(isArrayNumber(childCategoryIds) === false) {
                    logging.warning("Invalid child category id value");
                    return next(createError(400, "Invalid child category id value"));
                }
            } else if (isNumber(childCategoryIds) === false || +childCategoryIds <= 0) {
                logging.warning("Invalid child category id value");
                return next(createError(400, "Invalid child category id value"));
            }
        }

        // GET DATA
        let posts: PostService[];
        if (childCategoryIds && provinceIds) {
            // logging.info(
            //     "Read nearby accepted posts by child categories and provinces"
            // );
            posts =
                await postServices.readNewestAcceptedPostsByChildCategoriesAndProvinces(
                    req.user.id,
                    formatToArrayNumber(childCategoryIds),
                    formatToStringNumberArray(provinceIds),
                    +limit + 1,
                    threshold ? +threshold : null
                );
        } else if (parentCategoryId && provinceIds) {
            // logging.info(
            //     "Read nearby accepted posts by parent category and provinces"
            // );
            posts =
                await postServices.readNewestAcceptedPostsByParentCategoryAndProvinces(
                    req.user.id,
                    +parentCategoryId,
                    formatToStringNumberArray(provinceIds),
                    +limit + 1,
                    threshold ? +threshold : null
                );
        } else {
            // logging.info("Read nearby accepted posts by provinces");
            posts = await postServices.readNewestAcceptedPostsByProvinces(
                req.user.id,
                formatToStringNumberArray(provinceIds),
                +limit + 1,
                threshold ? +threshold : null
            );
        }

        if (!posts) {
            return next(createError(500));
        }

        // MODIFY
        const postResponse: PostResponse[] = await Promise.all(
            posts.map(async (post: PostService) => {
                return await formatPostBeforeReturn(post);
            })
        );


        // GET BOOKMARKS OF ACCOUNT
        const bookmarks = await bookmarkServices.readByAccountId(req.user.id);
        if (!bookmarks) {
            return next(createError(500));
        }

        const postIdsOnBookmark = bookmarks.map((bookmark) => bookmark.post_id);

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: {
                posts: postResponse.map((post) => ({
                    ...post,
                    bookmarked: postIdsOnBookmark.includes(post.id),
                })),
                is_over:
                    +limit > 0
                        ? postResponse.length <= +limit
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
