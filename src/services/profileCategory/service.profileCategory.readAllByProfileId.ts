import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readAllByProfileId = async (profileId: string) => {
    try {
        logging.info("Read all categories by profile id service start ...");
        const query =
            "SELECT profiles_categories.category_id as child_category_id, child_categories.name as child_category, child_categories.parent_category_id, parent_categories.name as parent_category  " +
            "FROM profiles_categories, child_categories, parent_categories " +
            "WHERE profiles_categories.account_id = ? AND profiles_categories.category_id = child_categories.id AND child_categories.parent_category_id = parent_categories.id";
        const params = [profileId];
        return executeQuery(query, params);
    } catch (error) {
        logging.error(
            `Read all categories by profile id servive has error: ${error}`
        );
        throw error;
    }
};

export default readAllByProfileId;
