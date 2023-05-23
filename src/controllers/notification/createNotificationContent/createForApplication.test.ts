import { Notification } from "firebase-admin/lib/messaging/messaging-api";
import { NotificationData } from "../../../models/notification/class/notificationData.class";
import { SystemNotification } from "../../../models/notification/system/class/system.notification";
import generateTitle from "./generateTitle";
import generateBody from "./generateBody";

const createNotificationForApplication = (
    {
        applicationId,
        postId,
        type,
        // type_text,
        applicationStatus,
        postTitle,
        companyName,
        name,
        notificationId,
        lang = "vi"
    }: {
        applicationId: number;
        postId: number;
        type: number;
        // type_text: string;
        applicationStatus: number;
        postTitle: string;
        companyName: string;
        name: string;
        notificationId: number;
        lang?: string;
    }
): SystemNotification => {
    // DATA
    const data: NotificationData = {
        applicationId,
        postId,
        type,
        applicationStatus,
        notificationId
    }

    // CONTENT
    const content: Notification = {
        title: generateTitle({
            type,
            applicationStatus,
            lang
        }),
        body: generateBody({
            type,
            applicationStatus,
            postTitle,
            companyName,
            name,
            lang
        }),
    }

    // CREATE NOTIFICATION
    const notification = new SystemNotification(data, content);

    console.log(notification);

    return notification;
}

export default createNotificationForApplication;