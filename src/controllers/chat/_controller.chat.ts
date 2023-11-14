import getUsersChatedController from "./controller.chat.getUsersChated";
import getPostChatsController from "./controller.chat.getPostChats";
import updateStatusController from "./controller.chat.updateStatus";
import getQuantityUnreadChatsController from "./controller.chat.getQuantityUnreadChats";
import getUsersChattedV2Controller from "./controller.chat.v2.getUsersChated";

const chatController = {
    getUsersChated: getUsersChatedController,
    getPostChats: getPostChatsController,
    updateStatus: updateStatusController,
    getUnreadChats: getQuantityUnreadChatsController,
    getUsersChatedV2: getUsersChattedV2Controller,
};

export default chatController;
