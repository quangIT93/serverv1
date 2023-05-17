import { Request, Response, NextFunction } from 'express';
import logging from '../../../utils/logging';
import createError from 'http-errors';
import applicationService from '../../../services/application/_service.application';
// import MoneyType from '../../../enum/money_type.enum';
import { formatPostBeforeReturn } from '../../post/_controller.post.formatPostBeforeReturn';
// import readDefaultPostImageByPostId from '../../../services/category/service.category.readDefaultPostImageByPostId';

const readQuantityApplicationOfAllPostsController = async (req: Request, res: Response, next: NextFunction) => {
    const { id: recruiterId } = req.user;
    const { threshold, limit } = req.query;
    try {

        const titles = await applicationService.read.readByRecruiterId(
            req.query.lang.toString(),
            recruiterId,
            +limit + 1,
            Number.isInteger(+threshold) ? +threshold : null
        );

        if (!titles) {
            return next(createError(404, "Not found any posts"));
        }
        
        const data = await Promise.all(titles.map(async (post) => {
            const numOfApplication = post.num_of_application;
            post = await formatPostBeforeReturn(post, req.query.lang.toString());
            post.num_of_application = Number(numOfApplication) || 0;
            return post;
        }));

        let isOver: boolean = false;

        if (limit) {
            if (titles.length <= +limit) {
                isOver = true;
            }
        } else {
            isOver = true;
        }

        return res.status(200).json({
            code: 200,
            success: true,
            message: "Read title successfully",
            data: data,
            is_over: isOver
        });
    } catch (error) {   
        logging.error(error);   
        next(createError(500, "Internal server error"));
    }
}

export default readQuantityApplicationOfAllPostsController;