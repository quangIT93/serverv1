import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readAllParentCategories = async () => {
    try {
        logging.info("Read all parent categories service start ...");
        const query = "SELECT * FROM parent_categories";
        const res = await executeQuery(query);
        return res ? res : null;
    } catch (error) {
        logging.error("Read all parent categories has error: ", error);
        throw error;
    }
};

export default readAllParentCategories;
