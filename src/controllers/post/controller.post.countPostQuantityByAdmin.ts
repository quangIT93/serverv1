import createError from "http-errors";
import { Request, Response, NextFunction } from "express";
import * as postServices from "../../services/post/_service.post";
import logging from "../../utils/logging";

const countPostQuantityByAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Count post quantity by account id controller start ... ");

        const isOwn = req.query.is_own;
        const aid = req.query.aid;
        let quatityPerDays, quantityPerMonths;

        console.log(isOwn, aid);

        if (isOwn === "true") {
            if (!req.user || !req.user.id) {
                console.log(req.user);
                return next(createError(401));
            }
            quatityPerDays =
                await postServices.countPostQuantityPerDayByAccountId(
                    req.user.id
                );

            quantityPerMonths =
                await postServices.countPostQuantityPerMonthByAccountId(
                    req.user.id
                );
        } else if (aid) {
            quatityPerDays =
                await postServices.countPostQuantityPerDayByAccountId(aid);

            quantityPerMonths =
                await postServices.countPostQuantityPerMonthByAccountId(aid);
        } else {
            return next(createError(400));
        }

        return res.status(200).json({
            code: 200,
            success: true,
            data: {
                quatity_per_days: quatityPerDays.map((item) => ({
                    ...item,
                    quantity: Number(item.quantity),
                })),
                quantity_per_months: quantityPerMonths.map((item) => ({
                    ...item,
                    quantity: Number(item.quantity),
                })),
            },
            message: "Successfully",
        });
    } catch (error) {
        logging.error(
            "Count post quantity by account id controller has error: ",
            error
        );
        return next(createError(500));
    }
};

export default countPostQuantityByAdminController;
