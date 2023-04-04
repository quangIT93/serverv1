import {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
import ApplicationStatus from '../../enum/application.enum';
import applicationService from '../../services/application/_service.application';
import logging from '../../utils/logging';
import {formatPostBeforeReturn} from '../post/_controller.post.formatPostBeforeReturn';
import MoneyType from '../../enum/money_type.enum';
import { readDefaultPostImageByPostId } from '../../services/category/_service.category';
import ImageBucket from '../../enum/imageBucket.enum';

const readAllByAccountId = async (req: Request, res: Response, next: NextFunction) => {
    logging.info('Read All by account id controller start ...');
    const { id: accountId } = req.user;
    const { page = "" } = req.query;
    try {
        if (page === "" || (page && (Number.isNaN(+page) || +page < 0))) {
            logging.warning("Invalid page value");
            return next(createError(400));
        }
        
        const result = await applicationService.read.readPostsAndApplicationsBYAccountId(
            req.query.lang.toString(), accountId, +page
        );

        // console.log(result);
        
        if (!result) {
            return next(createError(404, 'Applications not found'));
        }

        const data = await Promise.all(result.map(async (a) => {
            if (a.type === 'post') {
                const n = a.num_of_application;
                a = await formatPostBeforeReturn(a);
                a.num_of_application = Number(n) || 0;
                a.type = 'post';
            }
            if (a.type === 'application') {
                a.created_at = new Date(a.created_at).getTime();
                a.application_status_text = ApplicationStatus[a.status];
                a.num_of_application = Number(a.num_of_application);
                a.money_type = +a.money_type;
                a.money_type_text = MoneyType[a.money_type];
                a.start_date = +a.start_date || null;
                a.end_date = +a.end_date || null;
                delete a.num_of_application;
                if (a.image === null) {
                    const firstParentCategoryImage =
                        await readDefaultPostImageByPostId(
                            a.post_id
                        );
                    if (!firstParentCategoryImage) {
                        a.image = null;
                    } else {
                        a.image = firstParentCategoryImage.image;
                    }
                } else {
                    a.image = `${process.env.AWS_BUCKET_IMAGE_URL}/${ImageBucket.POST_IMAGES}/${a.post_id}/` + a.image;
                }
                a.type = 'application';
            }
            return a;
        }));
        
        let isOver: boolean;

        if (result.length < 10) {
            isOver = true;
        } else {
            isOver = false;
        }

        res.status(200).json({
            code: 200,
            message: 'Read all by account id controller success',
            data: data,            
            is_over: isOver,
        });
    } catch (error) {
        logging.error(error);
        next(createError(500, 'Internal server error'));
    }
    
}

export default readAllByAccountId;