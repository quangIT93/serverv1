import createHttpError from 'http-errors';
import createKeywordNotificationService from '../../../services/notification/keyword/service.notification.keyword.create';
import { CreateKeywordNotificationDto } from '../../../models/notification/keyword/dto/keyword-create.dto';

import { NextFunction, Request, Response } from "express";

const createKeywordNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto = CreateKeywordNotificationDto.fromRequest(req);

        if (!CreateKeywordNotificationDto.validate(dto)) {
            return next(createHttpError(400, 'Bad request'));
        }
    
        const isCreateSuccess = await createKeywordNotificationService(dto);
    
        if (!isCreateSuccess) {
            return next(createHttpError(500, 'Internal server error'));
        }

        return res.status(201).json({
            message: 'Create keyword notification successfully',
            data: isCreateSuccess,
            success: true
        });        

    } catch (error) {
        return res.status(500).send('Internal server error');
    } 
};

export default createKeywordNotification;