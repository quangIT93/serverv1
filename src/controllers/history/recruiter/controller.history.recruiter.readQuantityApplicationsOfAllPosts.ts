import { Request, Response, NextFunction } from 'express';
import logging from '../../../utils/logging';
import createError from 'http-errors';
import applicationService from '../../../services/application/_service.application';
import MoneyType from '../../../enum/money_type.enum';
import { formatPostBeforeReturn } from '../../post/_controller.post.formatPostBeforeReturn';
import readDefaultPostImageByPostId from '../../../services/category/service.category.readDefaultPostImageByPostId';

const readQuantityApplicationOfAllPostsController = async (req: Request, res: Response, next: NextFunction) => {
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

        const titles = await applicationService.read.readByRecruiterId(
            recruiterId,
            Number.isInteger(+limit) ? +limit : null,
            Number.isInteger(+threshold) ? +threshold : null
        );

        if (!titles) {
            return next(createError(404, "Not found any posts"));
        }

        titles.forEach(element => { 
            element = formatPostBeforeReturn(element);
            element.num_of_application = Number(element.num_of_application);
        })

        const data = await Promise.all(titles.map(async (a) => {
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
            } else {
                a.image = `${process.env.AWS_BUCKET_IMAGE_URL}/posts_images/${a.id}/` + a.image;
            }
            return a;
        }));

        let isOver: boolean = false;

        if (limit) {
            if (titles.length < +limit) {
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