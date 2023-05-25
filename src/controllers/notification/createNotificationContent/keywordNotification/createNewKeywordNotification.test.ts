import { Notification } from "firebase-admin/lib/messaging/messaging-api";
import { NotificationData } from "../../../../models/notification/class/notificationData.class";
import generateTitle from "./generateTitle";
import generateBody from "./generateBody";
import { KeywordNotification } from "../../../../models/notification/keyword/class/keywordNotification.class";
import logging from "../../../../utils/logging";

const createNewKeywordNotification = (
    {
        postId,
        type,
        postTitle,
        companyName,
        notificationId,
        isRead,
        createdAt,
        image,
        lang = "vi",
    }: {
        postId: number;
        type: number;
        postTitle: string;
        companyName: string;
        notificationId: number;
        isRead: boolean;
        createdAt: number;
        image?: string;
        lang?: string;
    }
): KeywordNotification => {
    // DATA
    try {

        const data: NotificationData = {
            // applicationId,
            notificationId,
            postId,
            type,
            isRead,
            createdAt,
            image,
            typeText: "keyword"
        }
    
        // CONTENT
        const content: Notification = {
            title: generateTitle({lang}),
            body: generateBody({
                postTitle,
                companyName,
                lang
            }),
        }
        const content_app = {
            title: generateTitle({lang}),
            body: generateBody({
                postTitle,
                companyName,
                lang
            }),
        }
    
        // CREATE NOTIFICATION
        const notification = new KeywordNotification(data, content, content_app);
    
        return notification;
    } catch (error) {
        logging.error(error);
        return;
    }
}

export default createNewKeywordNotification;