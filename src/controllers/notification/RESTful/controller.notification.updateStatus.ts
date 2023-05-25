import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import * as notificationService from '../../../services/notification/_service.notification';
import logging from '../../../utils/logging';

const updateNotificationStatus = async (req: Request, res: Response, next: NextFunction) => {
    const { id: accountId } = req.user;
    const { notification_id: notificationId } = req.body;
    const { is_read: isRead } = req.body;

    try {

        // CHECK DATA
        if (notificationId === undefined || notificationId === null) {
            return next(createHttpError(400, "Notification id is required"));
        }

        if (isRead !== 0 && isRead !== 1 && !isRead) {
            return next(createHttpError(400, "Is read is required"));
        }

        const result = await notificationService.updateNotificationService(isRead, notificationId, accountId);
        
        if (result.affectedRows === 0) {
            return res.status(200).json({
                code: 200,
                success: true,
                message: "Notification not found or you are not the owner of this notification",
                data: null
            });
        }

        return res.status(200).json({
            code: 200,
            success: true,
            message: "Update notification status successfully",
            data: null
        });
    } catch (error) {
        logging.error(error);
        return next(createHttpError(500, "Internal server error"));
    }
};

export default updateNotificationStatus;