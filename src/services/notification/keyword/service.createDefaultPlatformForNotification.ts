import { executeQuery } from "../../../configs/database/database";
import { CreateKeywordNotificationDto } from "../../../models/notification/keyword/dto/keyword-create.dto";
import logging from "../../../utils/logging";

const createDefaultPlatformNotificationService = async (
    accountId: string,
    pushStatus: number,
    emailStatus: number,
) => {
    try {

        const query = "INSERT INTO type_notification_platform " +
        "(account_id, type, push_status, email_status) " +
        "VALUES (?, ?, ?, ?) RETURNING *";
        
        const values = [accountId, 0, pushStatus, emailStatus];
    
        const res = await executeQuery(query, values);

        return res;

    } catch (error) {
        logging.error(error);
        return null;
    }
}

export default createDefaultPlatformNotificationService;