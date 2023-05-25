import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import * as notificationService from "../../../../services/notification/_service.notification";
import logging from "../../../../utils/logging";
import { INotification } from "../../../../models/notification/interface/notification.interface";
import createNewKeywordNotification from "../../createNotificationContent/keywordNotification/createNewKeywordNotification.test";
import createNewNotificationForApplication from "../../createNotificationContent/application/createForApplication.test";
import readDefaultPostImageByPostId from "../../../../services/category/service.category.readDefaultPostImageByPostId";
import ImageBucket from "../../../../models/enum/imageBucket.enum";

const readAllNotificationsByAccountIdV2Controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // TODO: 
    // READ ALL NOTIFICATIONS BY ACCOUNT ID
    // Notification type 1: Application
    // Notification type 2: Recruiter
    // Notification type 3: Keyword

    //
    const { id: accountId } = req.user;

    const { page } = req.query;

    if (page && isNaN(+page)) {
      return next(createHttpError(400, "Page must be a number"));
    }

    // Call service
    // Read all notifications by account id from database
    let result =
      await notificationService.readAllNotificationsByAccountIdV2Service(
        accountId,
        +page
      );

    if (!result || result.length === 0) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: "No notifications found",
        data: [],
      });
    }
    const notifications: INotification[] = [];

    // Format data
    // After format, data will be implemented to notifications array
    // Interface INotification

    await Promise.all(
      result.map(async (item) => {
        let notification: INotification;
        // Notification type 3: Keyword
        if (item.image === null) {
          item.defaultImage = await readDefaultPostImageByPostId(
            item.post_id
          );
        }
        if (+item.type === 3) {
            // image need to use when get notification type 3 by mobile
            // No need image when push notification type 3 to mobile

          notification = createNewKeywordNotification({
            notificationId: item.id,
            postId: item.post_id,
            postTitle: item.post_title,
            type: +item.type,
            companyName: item.company_name,
            isRead: Boolean(+item.is_read),
            createdAt: new Date(item.created_at).getTime(),
            image: item.image
              ? `${process.env.AWS_BUCKET_PREFIX_URL}/${ImageBucket.POST_IMAGES}/${item.post_id}/` +
                item.image
              : item.defaultImage.image,
            lang: req.query.lang.toString(),
          });
        } else {
        // Notification type 1: Application
        // Notification type 2: Recruiter
          notification = createNewNotificationForApplication({
            notificationId: item.id,
            applicationId: item.application_id,
            postId: item.post_id,
            type: +item.type,
            applicationStatus: +item.application_status,
            postTitle: item.post_title,
            companyName: item.company_name,
            name: item.name,
            isRead: Boolean(+item.is_read),
            createdAt: new Date(item.created_at).getTime(),
            lang: req.query.lang.toString(),
          });
        }

        notifications.push(notification);
      })
    );

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Read all notifications by account id successfully",
      data: {
        total: result.total,
        notifications: notifications,
      },
    });
  } catch (error) {
    logging.error(error);
    return next(createHttpError(500, "Internal server error"));
  }
};

export default readAllNotificationsByAccountIdV2Controller;
// Path: src/controllers/notification/controller.notification.readAllByAccountId.ts
