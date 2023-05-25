import readAllNotificationsByAccountIdController from "./controller.notification.readByAccountId";
import readQuantityOfNewNotificationsController from "./controller.notification.readQuantityOfNewNotifications";
import updateNotificationStatus from "./controller.notification.updateStatus";
import keywordNotificationController from "../keywords/RESTful/_controller.notification.keyword";
import readAllNotificationsByAccountIdV2Controller from "./V2/controller.notification.readByAccountIdV2";
import updateTypeOfNotificationPlatform from "../keywords/RESTful/controller.notification.keyword.updateTypeOfPlatform";

const notificationController = {
    readByAccountId: readAllNotificationsByAccountIdController,
    readByAccountIdV2: readAllNotificationsByAccountIdV2Controller,
    updateStatus: updateNotificationStatus,
    readQuantityOfNewNotifications: readQuantityOfNewNotificationsController,
    updateTypeOfNotificationPlatform: updateTypeOfNotificationPlatform,
    keyword: keywordNotificationController
};

export default notificationController;