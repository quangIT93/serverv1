import { executeQuery } from "../../../configs/database/database";
import logging from "../../../utils/logging";

const updateTypeOfNotificationPlatformService = async ({
    accountId,
    type,
}: {
    accountId: string;
    type: number;
}) => {
    try {

        const query = `
            UPDATE type_notification_platform
            SET type = ?
            WHERE account_id = ?
        `;
        
        const values = [
            type,
            accountId,
        ];
    
        const res = await executeQuery(query, values);

        return res;

    } catch (error) {
        logging.error(error);
        return null;
    }
}

export default updateTypeOfNotificationPlatformService;