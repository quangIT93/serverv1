import readAllNotificationsByAccountIdController from "./controller.notification.readByAccountId";
import readQuantityOfNewNotificationsController from "./controller.notification.readQuantityOfNewNotifications";
import updateNotificationStatus from "./controller.notification.updateStatus";

const notificationController = {
    readByAccountId: readAllNotificationsByAccountIdController,
    updateStatus: updateNotificationStatus,
    readQuantityOfNewNotifications: readQuantityOfNewNotificationsController
};

export default notificationController;