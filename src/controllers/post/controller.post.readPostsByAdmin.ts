import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import logging from "../../utils/logging";
import * as postServices from "../../services/post/_service.post";
// import MoneyType from "../../enum/money_type.enum";

const readPostsByAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // logging.info("Read posts by admin controller start ...")

        if (!req.user || !req.user.id || req.user.role === 0) {
            return next(createError(401));
        }

        const { page, limit } = req.query;
      
        const isToday = req.query.is_today;
        const status = req.query.status;
        const isOwn = req.query.is_own;
        const aid = req.query.aid;

        let pageNumber = +page ? +page : 1;
        let limitNumber = +limit ? +limit : 10;

        let posts;

        // GET POSTS
        if (aid) {
            // Read post by account id
            posts = await postServices.readPostsByAdminId(aid, +pageNumber, +limitNumber);    
        } else if (isToday === "true" && Number(status) === 0) {
            // READ TODAY PENDING POSTS
            posts = await postServices.readTodayPendingPostsByAdmin(+pageNumber, +limitNumber);
        } else if (isToday === "true") {
            // READ TODAY POSTS
            posts = await postServices.readTodayPostsByAdmin(+pageNumber, +limitNumber);
        } else if (Number(status) === 0) {
            // READ PENDING POSTS
            posts = await postServices.readPendingPostsByAdmin(+pageNumber, +limitNumber);
        } else if (isOwn === "true") {
            posts = await postServices.readPostsByAdminId(req.user.id, +pageNumber, +limitNumber);
        } else {
            // READ ALL POSTS
            posts = (await postServices.readAllPostsByAdmin(+pageNumber, +limitNumber));
            
        }

        // totalPosts = parseInt(posts.totalPosts);
        posts = posts.data;

        if (!posts) {
            return next(createError(500));
        }
        // MODIFY
        (posts).forEach((post) => {
            post.start_time = new Date(post.start_time).getTime();
            post.end_time = new Date(post.end_time).getTime();
            post.created_at = new Date(post.created_at).getTime();
        });

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            // totalPosts: totalPosts,
            data: posts,
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Read posts by admin controller has error: ", error);
        return next(createError(500));
    }
};

export default readPostsByAdminController;