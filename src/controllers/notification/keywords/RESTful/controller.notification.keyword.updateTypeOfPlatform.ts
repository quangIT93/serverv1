import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import updateTypeOfNotificationPlatformService from "../../../../services/notification/keyword/service.updateTypeOfNotificationPlatform";


//this function is called from router
//this function is used to update type of notification platform
// 0: user only receive notification on mobile device
// 1: user only receive notification on email
const updateTypeOfNotificationPlatform = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: accountId } = req.user;
        const { type } = req.body;

        if (!type || !accountId) {
            return next(createHttpError(400, 'Invalid data'));
        }

        if (+type !== 0 && +type !== 1) {
            return next(createHttpError(400, 'Invalid data'));
        }

        const isUpdateSuccess = await updateTypeOfNotificationPlatformService({accountId, type: +type});

        if (!isUpdateSuccess) {
            return next(createHttpError(500, 'Internal server error'));
        }
        

        return res.status(201).json({
            message: 'Update type of notification platform successfully',
            // data: isCreateSuccess,
            success: true
        });

    } catch (error) {   
        return res.status(500).send('Internal server error');
    }
}

export default updateTypeOfNotificationPlatform;