import {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
import ImageBucket from '../../../enum/imageBucket.enum';
import applicationService from '../../../services/application/_service.application';
import logging from '../../../utils/logging';

const readAcceptedApplicationsByRecruiterId = async (req: Request, res: Response, next: NextFunction) => {
    logging.info('Read accepted applications by recruiter id controller start ...');
    const {id: recruiterId} = req.user;
    const {limit, threshold} = req.query;
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

        const applications = await applicationService.read.readAcceptedApplicationByRecruiterId(recruiterId, +limit, +threshold);
        
        if (!applications) {
            return next(createError(404, 'Applications not found'));
        }

        const data = await Promise.all(applications.map(async (a) => {
            a.created_at = new Date(a.created_at).getTime();
            a.birthday = a.birthday ? +a.birthday : null;
            a.categories = await applicationService.read.readCategoriesById(a.id);
            a.avatar = a.avatar ? 
                `${process.env.AWS_BUCKET_IMAGE_URL}/${ImageBucket.AVATAR_IMAGES}/` + a.avatar : null;
            return a;
        }));
        
        let isOver: boolean;

        if (applications.length < +limit || limit === '0' || !limit) {
            isOver = true;
        } else {
            isOver = false;
        }

        res.status(200).json({
            code: 200,
            message: 'Read accepted applications by recruiter id controller success',
            data: data,            
            is_over: isOver,
        });
    } catch (error) {
        logging.error(error);
        next(createError(500, 'Internal server error'));
    }
    
}

export default readAcceptedApplicationsByRecruiterId;