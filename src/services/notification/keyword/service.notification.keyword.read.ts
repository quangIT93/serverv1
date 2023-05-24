import { executeQuery } from "../../../configs/database/database";
import logging from "../../../utils/logging";

const readKeywordNotificationByAccountIdService = async (accountId: string) => {
    try {

        const query = `
            SELECT *
            FROM keywords_notification
            WHERE account_id = ?
        `;

        const values = [
            accountId,
        ];
    
        const res = await executeQuery(query, values);

        return res;

    } catch (error) {
        logging.error(error);
        return null;
    }
}

export default readKeywordNotificationByAccountIdService;