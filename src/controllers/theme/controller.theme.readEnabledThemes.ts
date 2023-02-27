import createError from "http-errors";
import { NextFunction, Request, Response } from "express";

import logging from "../../utils/logging";
import * as themeServices from "../../services/theme/_service.theme";

const readEnabledThemesController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Read enabled themes controller start ...");

        // GET THEMES
        const themes = await themeServices.readEnabledThemes();
        if (!themes) {
            return next(createError(500));
        }

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: themes.map((theme) => ({
                ...theme,
                number_of_posts: Number(theme.number_of_posts),
            })),
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Read enabled themes controller has error: ", error);
        return next(createError(500));
    }
};

export default readEnabledThemesController;
