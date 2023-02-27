import logging from '../../utils/logging';
import { executeQuery } from './../../configs/database';

const createNotificationService = async (
    accountId: string,
    applicationId: number,
    applicationStatus: number,
    type: 0 | 1
) => {
    try {
        const query =
            "INSERT INTO notifications (account_id, application_id, type, application_status) " +
            "VALUES (?, ?, ?, ?)";
        const params = [
            accountId,
            applicationId,
            type.toString(),
            applicationStatus,
        ];
        // console.log(params);
        const result = await executeQuery(query, params);
        return result;
    } catch (error) {
        logging.error(error);
        return null;
    }
}

export default createNotificationService;