import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import * as locationServices from "../../services/location/_service.location";

const readAllProvinces = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Read all provinces controller start ...");
        const provinces = await locationServices.readAllProvinces();
        if (!provinces) {
            return next(createError(500));
        }

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: provinces,
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Read all provinces controller has error: ", error);
        return next(createError(500));
    }
};

export default readAllProvinces;
