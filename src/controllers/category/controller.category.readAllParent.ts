import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import * as categoryServices from "../../services/category/_service.category";

const readAllParentCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Read all parent categories controller start ...");
        const parentCategories =
            await categoryServices.readAllParentCategories();
        if (!parentCategories) {
            return next(createError(500));
        }

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: parentCategories,
            message: "Successfully",
        });
    } catch (error) {
        logging.error(
            "Read all parent categories controller has error: ",
            error
        );
        return next(createError(500));
    }
};

export default readAllParentCategories;
