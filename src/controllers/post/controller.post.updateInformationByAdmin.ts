import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import * as postServices from "../../services/post/_service.post";
import * as postImageServices from "../../services/postImage/_service.postImage";
import * as postCategoryServices from "../../services/postCategory/_service.postCategory";
import Helper from "../../helpers/helper.class";

const updatePostInformationByAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Update post information controller start ...");
        // GET BODY DATA
        const postId = +req.body.id;
        const title = req.body.title ? req.body.title.toString().trim() : null;
        const companyName = req.body.companyName
            ? req.body.companyName.toString().trim()
            : null;
        const wardId = req.body.wardId ? req.body.wardId : null;
        const address = req.body.address ? req.body.address : null;
        const phoneContact = req.body.phoneContact
            ? req.body.phoneContact
            : null;
        const isDatePeriod = +req.body.isDatePeriod;
        const isWorkingWeekend = +req.body.isWorkingWeekend;
        const isRemotely = +req.body.isRemotely;
        const startDate = +req.body.startDate;
        const endDate = +req.body.endDate;
        const startTime = +req.body.startTime;
        const endTime = +req.body.endTime;
        const salaryMin = +req.body.salaryMin;
        const salaryMax = +req.body.salaryMax;
        const salaryType = +req.body.salaryType;
        const description = req.body.description ? req.body.description : null;
        const categoryIds = req.body.categoryIds ? req.body.categoryIds : null;
        const moneyType = req.body.moneyType ? +req.body.moneyType : null;
        const enabledImageIds = req.body.enabledImageIds
            ? req.body.enabledImageIds
            : null;
        let disabledImageIds = req.body.disabledImageIds
            ? req.body.disabledImageIds
            : null;

        // VALIDATION
        if (!Number.isInteger(postId) || postId <= 0) {
            logging.error("Invalid post id");
            return next(createError(400));
        }

        if (!title || !companyName || !description || !wardId || !address) {
            logging.warning("Invalid body data");
            return next(createError(400));
        }

        const helper = new Helper();

        if (phoneContact && !helper.checkPhoneNumberFormat(phoneContact)) {
            logging.warning("Invalid phone number format");
            return next(createError(400));
        }

        if (
            new Date(startTime).toString() === "Invalid Date" ||
            new Date(endTime).toString() === "Invalid Date"
        ) {
            logging.warning("Invalid time value");
            return next(createError(400));
        }

        if (
            !Number.isInteger(isDatePeriod) ||
            isDatePeriod < 0 ||
            isDatePeriod > 1
        ) {
            logging.warning("Invalid isDatePeriod value");
            return next(createError(400));
        }

        if (
            isDatePeriod === 1 &&
            (new Date(startDate).toString() === "Invalid Date" ||
                new Date(startTime).toString() === "Invalid Date" ||
                new Date(startDate) > new Date(endDate))
        ) {
            logging.warning("Invalid date value");
            return next(createError(400));
        }

        if (
            !Number.isInteger(isWorkingWeekend) ||
            isWorkingWeekend < 0 ||
            isWorkingWeekend > 1
        ) {
            logging.warning("Invalid isWorkingWeekend value");
            return next(createError(400));
        }

        if (!Number.isInteger(isRemotely) || isRemotely < 0 || isRemotely > 1) {
            logging.warning("Invalid isRemotely value");
            return next(createError(400));
        }

        if (!Number.isInteger(salaryMin) || salaryMin <= 0) {
            logging.warning("Invalid salary value");
            return next(createError(400));
        }

        if (!Number.isInteger(salaryMax) || salaryMax <= 0) {
            logging.warning("Invalid salary value");
            return next(createError(400));
        }

        if (!Number.isInteger(salaryType) || salaryType <= 0) {
            logging.warning("Invalid salaryType value");
            return next(createError(400));
        }

        if (!moneyType) {
            logging.warning("Invalid money type");
            return next(createError(400, "Type of money is required"));
        }

        if (moneyType !== 1 && moneyType !== 2) {
            logging.warning("Invalid money type");
            return next(
                createError(400, "Invalid money type, only 1 (VND) or 2 (USD)")
            );
        }

        // HANDLE UPDATE
        const isUpdateSuccess = await postServices.updateInformationByAdmin(
            postId,
            title,
            companyName,
            wardId,
            address,
            helper.formatPhoneNumber(phoneContact),
            isDatePeriod,
            isWorkingWeekend,
            isRemotely,
            startDate,
            endDate,
            startTime,
            endTime,
            salaryMin,
            salaryMax,
            salaryType,
            moneyType,
            description
        );

        if (!isUpdateSuccess) {
            // console.log("Update post information failed");
            return next(createError(500));
        }

        // HANDLE IMAGES OF POST
        if (enabledImageIds.length > 0) {
            await postImageServices.updateStatus(enabledImageIds, 1);
        }

        if (disabledImageIds.length > 0) {
            await postImageServices.updateStatus(disabledImageIds, 0);
        }

        // HANDLE CATEGORIES OF POST
        if (Array.isArray(categoryIds) && categoryIds.length > 0) {
            const newCategoryIds = categoryIds.map((cateId) => +cateId);
            // GET ALL CATEGORIES OF POST
            const categoriesOfPost =
                await postCategoryServices.readCategoriesOfPost(postId);
            if (categoriesOfPost) {
                const categoryIdsOfPost = categoriesOfPost.map(
                    (category) => category.child_category_id
                );
                const categoryIdsWillBeCreated = [...newCategoryIds];
                const categoryIdsWillBeDeleted = [];

                // FILTER
                categoryIdsOfPost.forEach((categoryId: number) => {
                    if (newCategoryIds.includes(categoryId)) {
                        // THIS CATEGORY WILL BE KEEPED
                        categoryIdsWillBeCreated.splice(
                            categoryIdsWillBeCreated.indexOf(categoryId),
                            1
                        );
                    } else {
                        // THIS CATEGORY WILL BE DELETED
                        categoryIdsWillBeDeleted.push(categoryId);
                    }
                });

                // MODIFY
                if (categoryIdsWillBeCreated.length > 0) {
                    // CREATE
                    const isCreateCategoriesOfPostSuccess =
                        await postCategoryServices.create(
                            postId,
                            categoryIdsWillBeCreated
                        );
                    if (!isCreateCategoriesOfPostSuccess) {
                        return next(createError(500));
                    }
                }

                if (categoryIdsWillBeDeleted.length > 0) {
                    // DELETE
                    const isDeleteCategoriesOfPostSuccess =
                        await postCategoryServices.deleteCategoriesOfPostByIds(
                            postId,
                            categoryIdsWillBeDeleted
                        );
                    if (!isDeleteCategoriesOfPostSuccess) {
                        return next(createError(500));
                    }
                }
            }
        } else {
            // DELETE ALL CATEGORIES OF POST
            await postCategoryServices.deleteByPostId(postId);
        }

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Update post information controller has error: ", error);
        return next(createError(500));
    }
};

export default updatePostInformationByAdminController;
