import { Notification } from "firebase-admin/lib/messaging/messaging-api";
import { INotification } from "../../interface/notification.interface";
import { NotificationData } from "../../class/notificationData.class";


export class SystemNotification implements INotification {
    data: NotificationData;
    content: Notification;

    constructor(data: NotificationData, content: Notification) {
        this.data = data;
        this.content = content;
    }

    // this method is used to get the notification data
    getData(): NotificationData {
        return this.data;
    }

    // this method is used to get the notification content
    getContent(): Notification {
        return this.content;
    }

    // this method is used to set the notification data
    setData(data: NotificationData): void {
        this.data = data;
    }

    // this method is used to set the notification content
    setContent(content: Notification): void {
        this.content = content;
    }
}