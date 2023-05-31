import createHttpError from 'http-errors';
import createKeywordNotificationService from '../../../../services/notification/keyword/service.notification.keyword.create';
import { CreateKeywordNotificationDto } from '../../../../models/notification/keyword/dto/keyword-create.dto';

import { NextFunction, Request, Response } from "express";
import readTypeOfNotificationPlatformService from '../../../../services/notification/keyword/service.readTypeOfNotificationPlatform';
import createDefaultPlatformNotificationService from '../../../../services/notification/keyword/service.createDefaultPlatformForNotification';
// import readKeywordNotification from './controller.notification.keyword.read';
import readKeywordNotificationByAccountIdService from '../../../../services/notification/keyword/service.notification.keyword.read';

const createKeywordNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto = CreateKeywordNotificationDto.fromRequest(req);

        if (!CreateKeywordNotificationDto.validate(dto)) {
            return next(createHttpError(400, 'Bad request'));
        }
    
        const limitKeyword = 10;

        const countKeyword = await readKeywordNotificationByAccountIdService(dto.accountId);

        if (countKeyword.length >= limitKeyword) {
            return next(createHttpError(400, `You can only create ${limitKeyword} keywords`));
        }

        const isCreateSuccess = await createKeywordNotificationService(dto);
    
        if (!isCreateSuccess) {
            return next(createHttpError(500, 'Internal server error'));
        }

        const defaultPlatform = await readTypeOfNotificationPlatformService({accountId: dto.accountId});

        if (!defaultPlatform[0]?.type) {
            const isCreateDefaultPlatformSuccess = await createDefaultPlatformNotificationService(dto.accountId);

            if (!isCreateDefaultPlatformSuccess) {
                return next(createHttpError(500, 'Internal server error'));
            }
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