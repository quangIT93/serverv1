import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import { multerUploadImages } from "../../configs/multer";
import * as awsServices from "../../services/aws/_service.aws";
import * as postServices from "../../services/post/_service.post";
import * as postImageServices from "../../services/postImage/_service.postImage";
import * as postCategoryServices from "../../services/postCategory/_service.postCategory";
import Helper from "../../helpers/helper.class";

const createPostController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Create post controller start ...");
        multerUploadImages(req, res, async (err) => {
            if (err) {
                logging.error("Multer error");
                return next(createError(500));
            }

            if (!req.user && !req.user.id) {
                return next(401);
            }

            // GET ROLE OF USER
            const { role } = req.user;

            // GET DATA
            const accountId = req.user.id;
            const title = req.body.title
                ? req.body.title.toString().trim()
                : null;
            const companyName = req.body.companyName
                ? req.body.companyName.toString().trim()
                : null;
            const wardId = req.body.wardId;
            const address = req.body.address;
            const latitude = req.body.latitude;
            const longitude = req.body.longitude;
            const isDatePeriod = +req.body.isDatePeriod;
            const isWorkingWeekend = +req.body.isWorkingWeekend;
            const isRemotely = +req.body.isRemotely;
            const startDate = Number.isInteger(+req.body.startDate)
                ? +req.body.startDate
                : null;
            const endDate = Number.isInteger(+req.body.endDate)
                ? +req.body.endDate
                : null;
            const startTime = +req.body.startTime;
            const endTime = +req.body.endTime;
            const salaryMin = +req.body.salaryMin;
            const salaryMax = +req.body.salaryMax;
            const salaryType = +req.body.salaryType;
            const description = req.body.description
                ? req.body.description.toString().trim()
                : null;
            const categoryIds = req.body.categoryIds
                ? typeof req.body.categoryIds === "string"
                    ? [req.body.categoryIds]
                    : req.body.categoryIds
                : null;
            let phoneNumber = req.body.phoneNumber
                ? req.body.phoneNumber
                : null;
            let moneyType = req.body.moneyType ? +req.body.moneyType : null;

            // VALIDATION
            if (!accountId || !title || !companyName) {
                logging.warning("Invalid body data");
                return next(createError(400, "Invalid body data"));
            }

            if (!address || !address.toString().trim()) {
                logging.warning("Invalid address value");
                return next(createError(400, "Invalid address value"));
            }

            if (
                parseFloat(latitude) < 8.0 ||
                parseFloat(latitude) > 23.0 ||
                !parseFloat(latitude)
            ) {
                logging.warning("Invalid latitude value");
                return next(createError(400, "Invalid latitude value"));
            }

            if (
                parseFloat(longitude) < 102.0 ||
                parseFloat(longitude) > 109.0 ||
                !parseFloat(longitude)
            ) {
                logging.warning("Invalid longitude value");
                return next(createError(400, "Invalid longitude value"));
            }

            if (
                !Number.isInteger(isDatePeriod) ||
                isDatePeriod < 0 ||
                isDatePeriod > 1
            ) {
                logging.warning("Invalid isDatePeriod value");
                return next(createError(400, "Invalid isDatePeriod value"));
            }

            if (
                isDatePeriod === 1 &&
                (new Date(startDate).toString() === "Invalid Date" ||
                    new Date(startTime).toString() === "Invalid Date" ||
                    new Date(startDate) > new Date(endDate))
            ) {
                logging.warning("Invalid date value");
                return next(createError(400, "Invalid date value"));
            }

            if (
                !Number.isInteger(isWorkingWeekend) ||
                isWorkingWeekend < 0 ||
                isWorkingWeekend > 1
            ) {
                logging.warning("Invalid isWorkingWeekend value");
                return next(createError(400, "Invalid isWorkingWeekend value"));
            }

            if (
                !Number.isInteger(isRemotely) ||
                (isRemotely !== 0 && isRemotely !== 1)
            ) {
                logging.warning("Invalid isRemotely value");
                return next(createError(400, "Invalid isRemotely value"));
            }

            if (
                new Date(startTime).toString() === "Invalid Date" ||
                new Date(endTime).toString() === "Invalid Date"
            ) {
                logging.warning("Invalid time value");
                return next(createError(400, "Invalid time value"));
            }

            if (
                startTime < 57600000 ||
                endTime < 57600000 ||
                startTime > 144000000 ||
                endTime > 144000000
            ) {
                logging.warning("Invalid time value");
                return next(createError(400, "Invalid time value"));
            }

            if (!Number.isInteger(salaryMin) || salaryMin <= 0) {
                logging.warning("Invalid salary value");
                return next(createError(400, "Salary must be greater than 0"));
            }

            if (!Number.isInteger(salaryMax) || salaryMax <= 0) {
                logging.warning("Invalid salary value");
                return next(createError(400, "Salary must be greater than 0"));
            }

            if (salaryMin > salaryMax) {
                logging.warning("Invalid salary value");
                return next(
                    createError(400, "Salary min must be less than salary max")
                );
            }

            if (!Number.isInteger(salaryType) || salaryType <= 0) {
                logging.warning("Invalid salaryType value");
                return next(createError(400, "Invalid salaryType value"));
            }

            //HELPER
            const helper = new Helper();

            if (phoneNumber && !helper.checkPhoneNumberFormat(phoneNumber)) {
                logging.warning("Invalid phone number format");
                return next(
                    createError(
                        400,
                        "Please enter a valid Vietnamese phone number"
                    )
                );
            }

            if (!moneyType) {
                logging.warning("Invalid money type");
                return next(createError(400, "Type of money is required"));
            }

            if (moneyType !== 1 && moneyType !== 2) {
                logging.warning("Invalid money type");
                return next(
                    createError(
                        400,
                        "Invalid money type, only 1 (VND) or 2 (USD)"
                    )
                );
            }

            if (!description) {
                logging.warning("Invalid description");
                return next(createError(400, "Description is required"));
            }
            if (description.length > 4000) {
                logging.warning("Invalid description");
                return next(
                    createError(
                        400,
                        "Description must be less than 4000 characters"
                    )
                );
            }

            if (!categoryIds) {
                logging.warning("Invalid categoryIds");
                return next(createError(400, "CategoryIds is required"));
            }

            let isValidCategoryId = true;
            categoryIds.forEach((categoryId) => {
                if (!Number.isInteger(+categoryId)) {
                    isValidCategoryId = false;
                    return;
                }
            });
            if (!isValidCategoryId) {
                return next(createError(400));
            }

            // HANDLE CREATE
            const postIdCreated = await postServices.createPost(
                accountId,
                title,
                companyName,
                wardId,
                address.toString().trim(),
                parseFloat(latitude),
                parseFloat(longitude),
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
                description.toString().trim(),
                helper.formatPhoneNumber(phoneNumber),
                moneyType,
                role
            );
            if (!postIdCreated) {
                return next(createError(500));
            }

            // CREATE CATEGORIES OF POST
            const isCreateCategoriesOfPostSuccess =
                await postCategoryServices.create(postIdCreated, categoryIds);
            if (!isCreateCategoriesOfPostSuccess) {
                return next(createError(500));
            }

            if (req.files && req.files.length > 0) {
                // UPLOAD IMAGES TO AWS
                const urlsUploaded = await awsServices.uploadImages(req.files);

                // CREATE IMAGES OF POST
                if (urlsUploaded && urlsUploaded.length > 0) {
                    const isCreateImagesOfPostSuccess =
                        await postImageServices.create(
                            postIdCreated,
                            urlsUploaded
                        );
                    if (!isCreateImagesOfPostSuccess) {
                        return next(createError(500));
                    }
                }
            }

            // SUCCESS
            return res.status(200).json({
                code: 200,
                success: true,
                message: "Successfully",
            });
        });
    } catch (error) {
        logging.error("Create post controller has error: ", error);
        return next(createError(500));
    }
};

export default createPostController;
