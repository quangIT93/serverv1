import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import * as categoryServices from "../../services/category/_service.category";

const readAllCategoriesController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Read all categories controller start ...");

        // READ ALL PARENT CATEGORIES
        const parentCategories =
            await categoryServices.readAllParentCategories();
        if (!parentCategories) {
            return next(createError(500));
        }

        // REMOVE CATEGORY "Tất cả"
        parentCategories.shift();

        // LOOP EACH PARENT CATEGORY
        const categories = await Promise.all(
            parentCategories.map(async (parentCategory) => {
                // GET DISTRICTS BY PROVINCE
                const childCategories =
                    await categoryServices.readChildCategoriesByParentCategoryId(
                        parentCategory.id
                    );
                return {
                    parent_category_id: parentCategory.id,
                    parent_category: parentCategory.name,
                    image: parentCategory.image,
                    childs: childCategories,
                };
            })
        );

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: categories,
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Read all categories controller has error: ", error);
        return next(createError(500));
    }
};

export default readAllCategoriesController;
