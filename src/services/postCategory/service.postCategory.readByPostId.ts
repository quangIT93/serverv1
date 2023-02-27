import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readCategoriesOfPost = async (postId: number) => {
    try {
        // logging.info("Read categories of post service start ...");
        const query =
            "SELECT posts_categories.category_id as child_category_id, child_categories.name as child_category, child_categories.parent_category_id, parent_categories.name as parent_category  " +
            "FROM posts_categories, child_categories, parent_categories " +
            "WHERE posts_categories.post_id = ? AND posts_categories.category_id = child_categories.id AND child_categories.parent_category_id = parent_categories.id";
        const params = [postId];
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error("Read categories of post service has error: ", error);
        throw error;
    }
};

export default readCategoriesOfPost;
