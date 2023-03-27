import { Request, Response, NextFunction } from 'express';
import logging from '../../../utils/logging';
import createError from 'http-errors';
import * as postService from '../../../services/post/_service.post';
import readDefaultPostImageByPostId from '../../../services/category/service.category.readDefaultPostImageByPostId';

const readPostedJobByRecruiterIdController = async (req: Request, res: Response, next: NextFunction) => {
    const { id: recruiterId } = req.user;
    const { threshold, limit } = req.query;

    try {
        if (limit === "" || (limit && (Number.isNaN(+limit) || +limit <= 0))) {
            logging.warning("Invalid limit value");
            return next(createError(400));
        }

        // THRESHOLD
        if (
            (threshold && (Number.isNaN(+threshold) || +threshold <= 0))
        ) {
            logging.warning("Invalid threshold value");
            return next(createError(400));
        }

        const posts = await postService.readAllPostsByAccountIdService(recruiterId, +threshold, +limit);

        if (!posts) {
            return next(createError(404, "Not found any post"));
        }



        posts.forEach(element => {
            element.start_date = +element.start_date || null;
            element.end_date = +element.end_date || null;
            element.start_time = +element.start_time || null;
            element.end_time = +element.end_time || null;
            element.created_at = new Date(element.created_at).getTime();
            posts.image = posts.image ? 
                `${process.env.AWS_BUCKET_IMAGE_URL}/posts_images/${element.id}/` + posts.image : null;
        })

        const data = await Promise.all(posts.map(async (a) => {
            if (a.image === null) {
                const firstParentCategoryImage =
                    await readDefaultPostImageByPostId(
                        a.id
                    );
                if (!firstParentCategoryImage) {
                    a.image = null;
                } else {
                    a.image = firstParentCategoryImage.image;
                }
            }
            return a;
        }));

        let isOver: boolean = false;

        if (posts.length < +limit) {
            isOver = true;
        }   

        return res.status(200).json({
            code: 200,
            success: true,
            message: "Read posts successfully",
            data: data,
            is_over: isOver
        });
    } catch (error) {
        logging.error(error);
        next(createError(500, "Internal server error"));
    }
    
}

export default readPostedJobByRecruiterIdController;