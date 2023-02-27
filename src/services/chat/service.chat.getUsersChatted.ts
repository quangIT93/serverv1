import { executeQuery } from "../../configs/database";
import logging from "../../utils/logging";

const getUsersChatted = async (id: string) => {
    try {
        logging.info("Get users chated service start ...");

        const query =
            // Right???
            // "SELECT t.*, posts.title AS post_title, profiles.name, profiles.avatar, profiles.phone " +
            // "FROM " +
            // "( " +
            // "select chats.* from chats " +
            // "join " +
            // "( " +
            // "select user, max(id) m from " +
            // "( " +
            // "(select id, receiver_id USER, created_at from chats where sender_id='596ed003-a4f8-4002-8abd-412851703e2e') " +
            // "union " +
            // "(select id, sender_id USER, created_at from chats where receiver_id='596ed003-a4f8-4002-8abd-412851703e2e') " +
            // ") t1 group by user " +
            // ") t2 " +
            // "on ((sender_id='596ed003-a4f8-4002-8abd-412851703e2e' and receiver_id=user) or " +
            // "(sender_id=user AND receiver_id='596ed003-a4f8-4002-8abd-412851703e2e')) and (id = m) " +
            // "order by created_at DESC " +
            // ") t, profiles, posts " +
            // "WHERE posts.id = t.post_id AND profiles.id = IF(t.sender_id = '596ed003-a4f8-4002-8abd-412851703e2e', t.receiver_id, t.sender_id) " +
            // "GROUP BY t.id ";

            "SELECT t.*, posts.title AS post_title, profiles.name, profiles.avatar, profiles.phone " +
            "FROM (select chats.* from chats " +
            "join " +
            "(select user, max(id) m from " +
            "((select id, receiver_id user from chats where sender_id=?) " +
            "union (select id, sender_id user from chats where receiver_id=?) " +
            ") t1 group by user) t2 " +
            "on ((sender_id=? and receiver_id=user) or " +
            "(sender_id=user and receiver_id=?)) and (id = m) " +
            "order by created_at DESC) AS t, profiles, posts " +
            "WHERE posts.id = t.post_id AND profiles.id = IF(t.sender_id = ?, t.receiver_id, t.sender_id) " +
            "GROUP BY t.id";
        const params = [id, id, id, id, id];
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error("Get users chated service has error: ", error);
        throw error;
    }
};

export default getUsersChatted;
