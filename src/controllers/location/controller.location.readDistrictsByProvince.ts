import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import * as locationServices from "../../services/location/_service.location";

const readDistrictByProvince = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Read districts by province controller start ...");

        // GET PROVINCE ID
        const provinceId = +req.query.pid;
        if (!provinceId || !Number.isInteger(provinceId)) {
            logging.warning("Invalid province id");
            return next(createError(400));
        }

        // GET DATA
        const districts = await locationServices.readDistrictsByProvince(
            provinceId
        );
        if (!districts) {
            return next(createError(500));
        }

        // Sort
        const sortedDistrict = districts.sort((a, b) => a.full_name.localeCompare(b.full_name));

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: sortedDistrict,
            message: "Successfully",
        });
    } catch (error) {
        logging.error(
            "Read districts by province controller has error: ",
            error
        );
        return next(createError(500));
    }
};

export default readDistrictByProvince;
