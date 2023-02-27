import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readParentCategoryImage = async (parentCategoryId: number) => {
    try {
        logging.info("Read parent category image service start ...");
        const query = "SELECT image FROM parent_categories WHERE id = ?";
        const params = [parentCategoryId];
        const res = await executeQuery(query, params);
        return res ? res[0] : null;
    } catch (error) {
        logging.error("Read parent category image has error: ", error);
        throw error;
    }
};

export default readParentCategoryImage;
