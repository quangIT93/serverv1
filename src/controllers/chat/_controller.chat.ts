import getUsersChatedController from "./controller.chat.getUsersChated";
import getPostChatsController from "./controller.chat.getPostChats";
import updateStatusController from "./controller.chat.updateStatus";

const chatController = {
    getUsersChated: getUsersChatedController,
    getPostChats: getPostChatsController,
    updateStatus: updateStatusController,
};

export default chatController;
