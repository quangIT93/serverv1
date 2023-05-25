import { executeQuery } from '../../configs/database/database';
import logging from './../../utils/logging';

const readQuantityOfNewNotificationsService = async (accountId: string) => {
    try {
        const query = "SELECT COUNT (notifications.id) as total FROM notifications WHERE notifications.account_id = ? AND notifications.is_read = '0'";
        const params = [accountId];
        const result = await executeQuery(query, params);
        return result[0].total;
    } catch (error) {
        logging.error(error);
        return null;
    }
}

export default readQuantityOfNewNotificationsService;