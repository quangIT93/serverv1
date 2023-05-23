import { executeQuery } from "../../configs/database/database";
import logging from "../../utils/logging";

const getChatMessages = async (
    firstId: string,
    secondId: string,
    postId: number
) => {
    try {
        logging.info("Get chats service start ...");
        // console.log(postId);
        const query =
            "SELECT id, type, message, status, created_at, sender_id FROM chats " +
            "WHERE post_id = ? AND ((sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?))";
        const params = [postId, firstId, secondId, secondId, firstId];
        const res = await executeQuery(query, params);
        return res && res;
    } catch (error) {
        logging.error("Get chats service has error: ", error);
        throw error;
    }
};

export default getChatMessages;
