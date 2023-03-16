import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import * as categoryServices from "../../services/category/_service.category";
import { sortChildrenCategory } from "./_sortChildrenCategory";

const readChildCategoriesByParentCategoryId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info(
            "Read child categories by parent category id controller start ..."
        );

        // GET PARENT CATEGORY ID
        const parentCategoryId = +req.query.pid;

        if (!parentCategoryId || !Number.isInteger(parentCategoryId)) {
            logging.warning("Invalid parent category");
            return next(createError(400));
        }

        // GET CHILD CATEGORIES
        const childCategories =
            await categoryServices.readChildCategoriesByParentCategoryId(
                parentCategoryId
            );
        if (!childCategories) {
            return next(createError(500));
        }

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: sortChildrenCategory(childCategories),
            message: "Successfully",
        });
    } catch (error) {
        logging.error(
            "Read child categories by parent category id controller has error: ",
            error
        );
        return next(createError(500));
    }
};

export default readChildCategoriesByParentCategoryId;
