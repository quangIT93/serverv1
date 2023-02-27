import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import * as accountServices from "../../services/account/_service.account";

const readTodayAccountsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Read today accounts controller start ...");

        // READ ALL ACCOUNTS
        const accounts = await accountServices.readTodayUserAccounts();
        if (!accounts) {
            return next(createError(500));
        }

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: accounts,
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Read today accounts controller has error: ", error);
        return next(createError(500));
    }
};

export default readTodayAccountsController;
