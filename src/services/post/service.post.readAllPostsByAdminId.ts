import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readAllPostsByAdminId = async (accountId) => {
    try {
        logging.info("Read posts service start ...");
        const query =
            "SELECT id, status, account_id, title, company_name, created_at " +
            "FROM posts " +
            "WHERE account_id = ? " +
            "GROUP BY posts.id " +
            "ORDER BY posts.id DESC";
        const params = [accountId];
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error("Read posts service has error: ", error);
        throw error;
    }
};

export default readAllPostsByAdminId;
