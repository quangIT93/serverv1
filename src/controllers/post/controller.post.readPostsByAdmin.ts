import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import logging from "../../utils/logging";
import * as postServices from "../../services/post/_service.post";
import MoneyType from "../../enum/money_type.enum";

const readPostsByAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // logging.info("Read posts by admin controller start ...");

        if (!req.user || !req.user.id) {
            return next(createError(401));
        }

        const isToday = req.query.is_today;
        const status = req.query.status;
        const isOwn = req.query.is_own;
        const aid = req.query.aid;

        let posts;

        // GET POSTS
        if (aid) {
            // Read post by account id
            posts = await postServices.readPostsByAdminId(aid);
        } else if (isToday === "true" && Number(status) === 0) {
            // READ TODAY PENDING POSTS
            posts = await postServices.readTodayPendingPostsByAdmin();
        } else if (isToday === "true") {
            // READ TODAY POSTS
            posts = await postServices.readTodayPostsByAdmin();
        } else if (Number(status) === 0) {
            // READ PENDING POSTS
            posts = await postServices.readPendingPostsByAdmin();
        } else if (isOwn === "true") {
            posts = await postServices.readPostsByAdminId(req.user.id);
        } else {
            // READ ALL POSTS
            posts = await postServices.readAllPostsByAdmin();
        }

        if (!posts) {
            return next(createError(500));
        }

        // MODIFY
        posts.forEach((post) => {
            post.created_at = new Date(post.created_at).getTime();
        });

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: posts,
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Read posts by admin controller has error: ", error);
        return next(createError(500));
    }
};

export default readPostsByAdminController;
