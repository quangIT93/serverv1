import readAllNotificationsByAccountIdController from "./controller.notification.readByAccountId";
import readQuantityOfNewNotificationsController from "./controller.notification.readQuantityOfNewNotifications";
import updateNotificationStatus from "./controller.notification.updateStatus";
import keywordNotificationController from "../keywords/RESTful/_controller.notification.keyword";

const notificationController = {
    readByAccountId: readAllNotificationsByAccountIdController,
    updateStatus: updateNotificationStatus,
    readQuantityOfNewNotifications: readQuantityOfNewNotificationsController,
    keyword: keywordNotificationController
};

export default notificationController;