import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readAllPostsByAdmin = async () => {
    try {
        logging.info("Read posts service start ...");
        const query =
            "SELECT posts.id, posts.status, posts.account_id, posts.title, posts.company_name, " +
            "posts.created_at, profiles.name as poster " +
            "FROM posts " +
            "LEFT JOIN profiles " +
            "ON profiles.id = posts.account_id " +
            "GROUP BY posts.id " +
            "ORDER BY posts.id DESC";
        const res = await executeQuery(query);
        return res ? res : null;
    } catch (error) {
        logging.error("Read posts service has error: ", error);
        throw error;
    }
};

export default readAllPostsByAdmin;
