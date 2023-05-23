import logging from '../../utils/logging';
import { executeQuery } from '../../configs/database/database';

const readAllNotificationsByAccountIdService = async (
    accountId: string,
    page: number,
) => {
    try {
        const query =
            "SELECT notifications.id, " +
            "notifications.application_id, " +
            "notifications.is_read, " +
            "notifications.type, " +
            "notifications.created_at, " +
            "notifications.application_status, " +
            "applications.name, " +
            "posts.title as post_title, " +
            "posts.company_name, posts.id as post_id " +
            // "COUNT (notifications.id) as total " +
            "FROM notifications " +
            "LEFT JOIN applications ON applications.id = notifications.application_id " +
            "LEFT JOIN posts ON posts.id = applications.post_id " +
            "WHERE notifications.account_id = ? " +
            "ORDER BY notifications.created_at DESC " +
            `${page ? ` LIMIT 10 OFFSET ${(page - 1) * 10}` : 'LIMIT 10'}`;
        const params = [accountId];
        const result = await executeQuery(query, params);
        return result;
    } catch (error) {
        logging.error(error);
        return null;
    }
}

export default readAllNotificationsByAccountIdService;
