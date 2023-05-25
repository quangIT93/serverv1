import logging from '../../utils/logging';
import { executeQuery } from '../../configs/database/database';

const createNotificationForKeywordService = async (
    account_id: string[],
    post_id: string,
) => {
    try {
        const query =
            "INSERT INTO post_notification (account_id, post_id) " +
            `VALUES ${account_id.map((item: string) => `(?, ?)`).join(",")}`;

        const params = account_id.map((item: string) => [item, post_id]).flat();


        const result = await executeQuery(query, params);
        
        return result;
    } catch (error) {
        logging.error(error);
        return null;
    }
}

export default createNotificationForKeywordService;