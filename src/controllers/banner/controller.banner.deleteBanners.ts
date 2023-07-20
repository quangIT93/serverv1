import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import logging from "../../utils/logging";
import * as bannerServices from "../../services/banner/_service.banner";
import { formatBannerResponse } from "./handler/formatBannerResponse";
import ImageBucket from "../../models/enum/imageBucket.enum";
import { shuffle } from "../../utils/shuffleArray";
import deleteImages from "../../services/aws/service.aws.deleteImages";
import createHttpError from "http-errors";

const deleteBannersController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Delete banners controller start ...");
    
        let imageName = req.body.imageName ? req.body.imageName : [];
        let id = req.body.id ? req.body.id : ''
    
        if (imageName.length > 0) {
            imageName = imageName.map(image => ImageBucket.BANNER_IMAGES + "/" + image);
        }

        try {

            console.log(imageName);
            // Delete banner from s3

            // if (deleteImages.length > 0 ) {
                // await deleteImages(imageName)
            // }

            // Delete bannner from server

            // if (id == '') {
            //     return next(createHttpError(400, "Bad request. Can not delete banner."));
            // }

            // const res = await bannerServices.deleteBanner(id)

            // if (res === null) {
                // return next(createError(500));
            // }

            return res.status(200).json({
                code: 200,
                success: true,
                message: "Successfully",
            });

        } catch (error) {
            logging.error("Delete banner controller has error: ", error);
            return next(createError(500));
        }
      
    } catch (error) {
        logging.error("Delete enabled banners controller has error: ", error);
        return next(createError(500));
    }
    
};

export default deleteBannersController;
