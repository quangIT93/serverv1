import readAllNotificationsByAccountIdController from "./controller.notification.readByAccountId";
import readQuantityOfNewNotificationsController from "./controller.notification.readQuantityOfNewNotifications";
import updateNotificationStatus from "./controller.notification.updateStatus";
import keywordNotificationController from "../keywords/RESTful/_controller.notification.keyword";
import readAllNotificationsByAccountIdV2Controller from "./V2/controller.notification.readByAccountIdV2";

const notificationController = {
    readByAccountId: readAllNotificationsByAccountIdController,
    readByAccountIdV2: readAllNotificationsByAccountIdV2Controller,
    updateStatus: updateNotificationStatus,
    readQuantityOfNewNotifications: readQuantityOfNewNotificationsController,
    keyword: keywordNotificationController
};

export default notificationController;