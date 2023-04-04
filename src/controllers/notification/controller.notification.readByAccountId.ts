import console from 'console';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import * as notificationService from '../../services/notification/_service.notification';
import logging from '../../utils/logging';
import { createNotificationContent, NotificationContent } from './createNotificationContent/createForApplication';

const readAllNotificationsByAccountIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: accountId } = req.user;

        const { page } = req.query;

        if (page && isNaN(+page)) {
            return next(createHttpError(400, "Page must be a number"));
        }

        let result = await notificationService.readAllNotificationsByAccountIdService(accountId, +page);

        if (!result || result.length === 0) {
            return res.status(200).json({
                code: 200,
                success: true,
                message: "No notifications found",
                data: []
            });
        }
        // console.log(result);

        const data = result.map((notification) => {
            const notificationContent: NotificationContent = {
                application_id: notification.application_id,
                post_id: notification.post_id,
                type: +notification.type,
                applicationStatus: +notification.application_status,
                postTitle: notification.post_title,
                companyName: notification.company_name,
                name: notification.name,
                notificationId: notification.notification_id
            }
            
            const content = createNotificationContent(
                req.query.lang.toString(),
                notificationContent
            );
            notification.created_at = new Date(notification.created_at).getTime();
            notification.is_read_value = notification.is_read === "1" ? true : false;
            notification.type = +notification.type;
            notification.is_read = +notification.is_read;
            notification.type_text = +notification.type === 0 ? "applicator" : "recruiter"

            return {
                ...notification,
                title: content.title,
                content: content.body,
            }
        })

        // console.log(result[0]);
        return res.status(200).json({
            code: 200,
            success: true,
            message: "Read all notifications by account id successfully",
            data: {
                total: result.total,
                notifications: data
            }
        });
    } catch (error) {
        logging.error(error);
        return next(createHttpError(500, "Internal server error"));
    }
}

export default readAllNotificationsByAccountIdController;
// Path: src/controllers/notification/controller.notification.readAllByAccountId.ts