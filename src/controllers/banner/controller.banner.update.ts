import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import logging from "../../utils/logging";
import * as awsServices from "../../services/aws/_service.aws";
import * as bannerServices from "../../services/banner/_service.banner";

const updateBannerController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Update banner controller start ...");

        // GET DATA
        const bannerId = +req.body.id;
        const redirectUrl = req.body.redirectUrl
            ? req.body.redirectUrl.toString().trim()
            : null;
        const type = +req.body.type;
        const version = +req.body.version;

        // VALIDATION
        if (!Number.isInteger(bannerId)) {
            logging.warning("Invalid theme id");
            return next(createError(400));
        }
        if (!redirectUrl) {
            logging.warning("Invalid body data");
            return next(createError(400));
        }
        if (!Number.isInteger(type)) {
            logging.warning("Invalid type");
            return next(createError(400));
        }
        if (!Number.isInteger(version)) {
            logging.warning("Invalid version");
            return next(createError(400));
        }

        //
        let imageUrl: string;
        if (req.files && req.files.length > 0) {
            // UPLOAD FILE TO AWS
            const urlsUploaded = await awsServices.uploadImages(req.files);
            imageUrl =
                urlsUploaded && urlsUploaded.length > 0
                    ? urlsUploaded[0]
                    : null;
        } else {
            imageUrl = req.body.imageUrl
                ? req.body.imageUrl.toString().trim()
                : null;
        }

        if (!imageUrl) {
            logging.warning("Invalid image url");
            return next(createError(400));
        }

        // UPDATE BANNER
        const isUpdateBannerWithImageSuccess = await bannerServices.update(
            bannerId,
            redirectUrl,
            imageUrl,
            type,
            version
        );
        if (!isUpdateBannerWithImageSuccess) {
            return next(createError(500));
        }

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: {
                image: imageUrl,
            },
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Update banner controller has error: ", error);
        return next(createError(500));
    }
};

export default updateBannerController;
