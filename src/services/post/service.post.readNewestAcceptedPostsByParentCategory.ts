import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import initQueryReadPost from "./_service.post.initQuery";

const readNewestAcceptedPostsByParentCategory = async (
    parentCategoryId: number,
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info(
            "Read newest accepted posts by parent category service start ..."
        );

        let query =
            initQueryReadPost.q1 +
            "JOIN posts_categories " +
            "ON posts_categories.post_id = posts.id " +
            "JOIN child_categories " +
            "ON child_categories.id = posts_categories.category_id " +
            "WHERE posts.status = ? AND posts_categories.category_id = child_categories.id " +
            "AND child_categories.parent_category_id = ? AND posts.salary_type = salary_types.id ";

        let params = [1, parentCategoryId];

        query += threshold && threshold > 0 ? "AND posts.id < ? " : "";
        params =
            threshold && threshold > 0 ? [...params, threshold] : [...params];

        query +=
            limit && limit > 0
                ? "GROUP BY posts.id ORDER BY posts.id DESC LIMIT ?"
                : "GROUP BY posts.id ORDER BY posts.id DESC";
        params = limit && limit > 0 ? [...params, limit] : [...params];

        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read newest accepted posts by parent category service has error: ",
            error
        );
        throw error;
    }
};

export default readNewestAcceptedPostsByParentCategory;
