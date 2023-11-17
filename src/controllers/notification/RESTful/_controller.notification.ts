import readAllNotificationsByAccountIdController from "./controller.notification.readByAccountId";
import readQuantityOfNewNotificationsController from "./controller.notification.readQuantityOfNewNotifications";
import updateNotificationStatus from "./controller.notification.updateStatus";
import keywordNotificationController from "../keywords/RESTful/_controller.notification.keyword";
import readAllNotificationsByAccountIdV2Controller from "./V2/controller.notification.readByAccountIdV2";
import updateTypeOfNotificationPlatform from "../keywords/RESTful/controller.notification.keyword.updateTypeOfPlatform";
import readQuantityOfNewNotificationsControllerV2 from "./V2/controller.notification.readQuantityOfNewNotificationsV2";

const notificationController = {
    readByAccountId: readAllNotificationsByAccountIdController,
    readByAccountIdV2: readAllNotificationsByAccountIdV2Controller,
    updateStatus: updateNotificationStatus,
    readQuantityOfNewNotifications: readQuantityOfNewNotificationsController,
    updateTypeOfNotificationPlatform: updateTypeOfNotificationPlatform,
    keyword: keywordNotificationController,
    readQuantityOfNewNotificationsV2: readQuantityOfNewNotificationsControllerV2
};

export default notificationController;