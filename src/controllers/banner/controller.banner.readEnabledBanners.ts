import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import logging from "../../utils/logging";
import * as bannerServices from "../../services/banner/_service.banner";
import { formatBannerResponse } from "./handler/formatBannerResponse";
import ImageBucket from "../../enum/imageBucket.enum";

const readEnabledBannersController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Read enabled banners controller start ...");

        const version = +req.query.v;
        if (!Number.isInteger(version)) {
            console.log("Invalid banner version");
            return next(createError(400));
        }

        // GET BANNERS
        const banners = await bannerServices.readEnabledBanners(version);
        if (!banners) {
            return next(createError(500));
        }

        banners.forEach((banner) => {
            banner.image = `${process.env.AWS_BUCKET_IMAGE_URL}/${ImageBucket.BANNER_IMAGES}/` + banner.image;
        });

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: banners,
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Read enabled banners controller has error: ", error);
        return next(createError(500));
    }
};

export default readEnabledBannersController;
