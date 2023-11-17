import { executeQuery } from './../../configs/database/database';


const updateStatusAllNotificationService = async (accountId: string) => {
    try {
        const query = `
            UPDATE notifications
            SET is_read = '2'
            WHERE account_id = ?
            AND is_read = '0'
        `;
        const params = [accountId];
        await executeQuery(query, params);

        const query2 = `
            UPDATE post_notification
            SET is_read = 2
            WHERE account_id = ?
            AND is_read = 0
        `;

        await executeQuery(query2, params);

        const query3 = `
            UPDATE communication_notifications
            SET status = 2
            WHERE communication_id IN (
                SELECT id
                FROM communications
                WHERE account_id = ?
            )
            AND status = 0
        `;

        await executeQuery(query3, params);

        const query4 = `
            UPDATE view_profiles
            SET is_read = 2
            WHERE profile_id = ?
            AND is_read = 0
        `;

        await executeQuery(query4, params);

        return true;
    } catch (error) {
        return null;
    }
}

export default updateStatusAllNotificationService;