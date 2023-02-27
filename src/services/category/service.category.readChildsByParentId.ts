import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readChildCategoriesByParentCategoryId = async (
    parentCategoryId: number
) => {
    try {
        logging.info(
            "Read child categories by parent category id service start ..."
        );
        const query =
            "SELECT id, name FROM child_categories WHERE parent_category_id = ?";
        const params = [parentCategoryId];
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read child categories by parent category id has error: ",
            error
        );
        throw error;
    }
};

export default readChildCategoriesByParentCategoryId;
