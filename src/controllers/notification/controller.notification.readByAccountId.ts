import console from 'console';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import * as notificationService from '../../services/notification/_service.notification';
import logging from '../../utils/logging';

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

        result.forEach(async (notification) => {
            // type 0 is notification for application
            if (notification.type === "0") {
                notification.type_text = "applicator"
                if (+notification.application_status === 2) {
                    notification.title = "Đơn ứng tuyển đã được duyệt";
                    notification.content = `Đơn ứng tuyển của bạn vào ${notification.company_name} cho công việc ${notification.post_title} đã được duyệt.`;
                } else if (+notification.application_status === 3) {
                    notification.title = "Đơn ứng tuyển đã bị từ chối";
                    notification.content = `Đơn ứng tuyển của bạn vào vào ${notification.company_name} cho công việc ${notification.post_title} đã bị từ chối.`;
                } else if (+notification.application_status === 4) {
                    notification.title = "Chúc mừng";
                    notification.content = `Chúc mừng bạn đã được chọn cho công việc ${notification.post_title} tại ${notification.company_name}.`;
                }
            } else if (notification.type === "1") {
                // if (notification.application_status === ) {
                // }
                notification.type_text = "recruiter"
                notification.title = "Đơn ứng tuyển mới";
                notification.content = `${notification.name} đã ứng tuyển vào công việc ${notification.post_title}.`;
            }   
            notification.created_at = new Date(notification.created_at).getTime();
            notification.is_read_value = notification.is_read === "1" ? true : false;
            notification.type = +notification.type;
            notification.is_read = +notification.is_read;
        })

        // console.log(result[0]);
        return res.status(200).json({
            code: 200,
            success: true,
            message: "Read all notifications by account id successfully",
            data: {
                total: result.total,
                notifications: result
            }
        });
    } catch (error) {
        logging.error(error);
        return next(createHttpError(500, "Internal server error"));
    }
}

export default readAllNotificationsByAccountIdController;
// Path: src/controllers/notification/controller.notification.readAllByAccountId.ts