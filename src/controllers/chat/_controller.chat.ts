import getUsersChatedController from "./controller.chat.getUsersChated";
import getPostChatsController from "./controller.chat.getPostChats";
import updateStatusController from "./controller.chat.updateStatus";
import getQuantityUnreadChatsController from "./controller.chat.getQuantityUnreadChats";

const chatController = {
    getUsersChated: getUsersChatedController,
    getPostChats: getPostChatsController,
    updateStatus: updateStatusController,
    getUnreadChats: getQuantityUnreadChatsController,
};

export default chatController;
