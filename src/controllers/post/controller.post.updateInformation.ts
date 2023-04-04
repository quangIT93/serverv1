import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import { multerUploadImages } from "../../configs/multer";
import * as postServices from "../../services/post/_service.post";
import * as postImageServices from "../../services/postImage/_service.postImage";
import * as postCategoryServices from "../../services/postCategory/_service.postCategory";
import * as awsServices from "../../services/aws/_service.aws";
import Helper from "../../helpers/helper.class";
import ImageBucket from "../../enum/imageBucket.enum";

const updatePostInformationController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Update post information controller start ...");
        multerUploadImages(req, res, async (err) => {
            if (err) {
                logging.error("Multer error");
                return next(createError(400, "You can only upload 5 images"));
            }

            // UPLOAD IMAGES TO AWS
            const postId = +req.body.id;

            if (!Number.isInteger(postId) || postId <= 0) {
                logging.error("Invalid post id");
                return next(createError(400));
            }

            const urlsUploaded =
                req.files && req.files.length as number > 0
                    ? await awsServices.uploadImages(req.files, ImageBucket.POST_IMAGES, postId)
                    : [];

            // GET BODY DATA
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
            const startDate = +req.body.startDate;
            const endDate = +req.body.endDate;
            const startTime = +req.body.startTime;
            const endTime = +req.body.endTime;
            const salaryMin = +req.body.salaryMin;
            const salaryMax = +req.body.salaryMax;
            const salaryType = +req.body.salaryType;
            const description = req.body.description
                ? req.body.description.toString().trim()
                : null;
            const categoryIds = req.body.categoryIds
                ? req.body.categoryIds
                : null;
            let deletedImages = req.body.deletedImages
                ? req.body.deletedImages
                : null;
            let phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : null;
            let moneyType = req.body.moneyType ? +req.body.moneyType : null;
                
            // PARSE DATA
            if (Array.isArray(deletedImages)) {
                deletedImages.forEach((e, index) => {
                    deletedImages[index] = JSON.parse(e);
                });
            } else {
                if (deletedImages) deletedImages = [JSON.parse(deletedImages)];
                else deletedImages = [];
            }

            // VALIDATION

            if (!title || !companyName || !description) {
                logging.warning("Invalid body data");
                return next(createError(400));
            }
            
            if (parseFloat(latitude) < 8.0 || parseFloat(latitude) > 23.0 || !parseFloat(latitude)) {
                logging.warning("Invalid latitude value");
                return next(createError(400, "Invalid latitude value"));
            }

            if (parseFloat(longitude) < 102.0 || parseFloat(longitude) > 109.0 || !parseFloat(longitude)) {
                logging.warning("Invalid longitude value");
                return next(createError(400, "Invalid longitude value"));
            }

            if (
                new Date(startTime).toString() === "Invalid Date" ||
                new Date(endTime).toString() === "Invalid Date"
            ) {
                logging.warning("Invalid time value");
                return next(createError(400));
            }

            if (startTime < 57600000 || 
                endTime < 57600000 || 
                startTime > 144000000 || 
                endTime > 144000000
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

            if (
                !Number.isInteger(isRemotely) ||
                (isRemotely !== 0 && isRemotely !== 1)
            ) {
                logging.warning("Invalid isRemotely value");
                return next(createError(400, "Invalid isRemotely value"));
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

            const helper = new Helper()

            // remove char + at head of phone number
            phoneNumber = phoneNumber.replace(/^\+/, '');

            if (phoneNumber && !helper.checkPhoneNumberFormat(phoneNumber)) {
                logging.warning("Invalid phone number format");
                return next(createError(400));
            }

            if (!moneyType) {
                logging.warning("Invalid money type");
                return next(createError(400, 'Type of money is required'));
            }

            if (moneyType !== 1 && moneyType !== 2) {
                logging.warning("Invalid money type");
                return next(createError(400, 'Invalid money type, only 1 (VND) or 2 (USD)'));
            }

            if (description.length > 1500) {
                logging.warning("Description is too long");
                return next(createError(400, "Mô tả quá dài (tối đa 1500 ký tự)"));
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

            // HANDLE UPDATE

            logging.info("Update post information: " + isRemotely);
            const isUpdateSuccess = await postServices.updateInformation(
                postId,
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
                description,
                helper.formatPhoneNumber(phoneNumber),
                moneyType
            );
            // if (isUpdateSuccess === 2) {
            //     console.log("Not thing to update");
            //     return res.status(200).json({
            //         code: 200,
            //         success: true,
            //         message: "Not thing to update",
            //     });

            // }
            if (!isUpdateSuccess) {
                console.log("Update post information failed");
                return next(createError(500));
            }

            // HANDLE IMAGES OF POST
            // GET IMAGES WILL BE DELETED
            if (deletedImages.length > 0) {
                // DELETE IMAGES OF POST BY IMAGE IDS
                const deletedImageIds = deletedImages.map((image) => +image.id);
                if (deletedImageIds.length > 0) {
                    const isDeleteImagesSuccess =
                        await postImageServices.deleteByIds(
                            postId,
                            deletedImageIds
                        );  
                    if (!isDeleteImagesSuccess) {
                        return next(createError(500));
                    }
                }
            }

            // IF POST HAS NEW IMAGES => CREATE IMAGES OF POST
            if (urlsUploaded.length > 0) {
                const isCreateImagesOfPostSuccess =
                    await postImageServices.create(postId, urlsUploaded);
                if (!isCreateImagesOfPostSuccess) {
                    return next(createError(500));
                }
            }

            // HANDLE CATEGORIES OF POST
            if (Array.isArray(categoryIds) && categoryIds.length > 0) {
                const newCategoryIds = categoryIds.map((cateId) => +cateId);
                // GET ALL CATEGORIES OF POST
                const categoriesOfPost =
                    await postCategoryServices.readCategoriesOfPost("vi", postId);
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
        });
    } catch (error) {
        logging.error("Update post information controller has error: ", error);
        return next(createError(500));
    }
};

export default updatePostInformationController;
