import {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
// import ImageBucket from '../../../enum/imageBucket.enum';
// import MoneyType from '../../../enum/money_type.enum';
import applicationService from '../../../services/application/_service.application';
// import { readDefaultPostImageByPostId } from '../../../services/category/_service.category';
import logging from '../../../utils/logging';
import { formatPostBeforeReturn } from '../../post/_controller.post.formatPostBeforeReturn';


const readSubmittedApplicationByAccountId = async (req: Request, res: Response, next: NextFunction) => {
    const {id: accountId} = req.user;
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
        let applications = await applicationService.read.readSubmittedApplicationByAccountId(
            req.query.lang.toString(),
            accountId,
            +limit,
            +threshold
        );
            
        if (!applications) {
            return next(createError(404, "Not found any applications"));
        }

        // applications.forEach(element => {
        //     element.created_at = new Date(element.created_at).getTime();
        // })
        applications = await Promise.all(applications.map(async (post) => {
            post = await formatPostBeforeReturn(post);
            return post;
        }));

        let isOver: boolean = false;

        if (limit) {
            if (applications.length < +limit) {
                isOver = true;
            }
        } else {
            isOver = true;
        }


        return res.status(200).json({
            code: 200,
            success: true,
            message: "Read applications successfully",
            data: applications,
            is_over: isOver

        });
    } catch (error) {
        logging.error(error);
        next(createError(500, "Internal server error"));
    }

}

export default readSubmittedApplicationByAccountId;