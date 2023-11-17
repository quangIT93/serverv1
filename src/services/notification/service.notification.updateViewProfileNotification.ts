import { executeQuery } from '../../configs/database/database';
import logging from '../../utils/logging';

const updateViewProfileNotificationService = async (
    isRead: number,
    id: number,
    account_id: string,
) => {
    try {
        const query = "UPDATE view_profiles SET is_read = ? WHERE id = ? AND profile_id = ?";
        const params = [isRead, id, account_id];
        const result = await executeQuery(query, params);
        return result;
    } catch (error) {
        logging.error(error);
        throw error;
    }
}

export default updateViewProfileNotificationService;

