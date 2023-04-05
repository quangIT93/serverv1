import { Request,Response, NextFunction } from "express";
import logging from "../../utils/logging";
import createHttpError from "http-errors";

const deleteAccountControllerById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    try {

        logging.info("Delete account by id");

        if (!id) {
            return next(createHttpError(400, "Bad request"));
        }

    } catch (error) {
        logging.error("Delete account by id error: ", error);
        return res.status(500).json({
            message: "Delete account by id error",
            error: error,
        });

    }

}

export default deleteAccountControllerById;