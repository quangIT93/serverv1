import createKeywordNotification from "./controller.notification.keyword.create";
import updateKeywordNotificationStatusController from "./controller.notification.keyword.update";

const keywordNotificationController = {
    create: createKeywordNotification,
    updateStatus: updateKeywordNotificationStatusController
}

export default keywordNotificationController;