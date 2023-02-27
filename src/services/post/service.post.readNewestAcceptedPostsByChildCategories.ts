import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import initQueryReadPost from "./_service.post.initQuery";

const readNewestAcceptedPostsByChildCategories = async (
    chilCategoryIds: number[],
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info(
            "Read newest accepted posts by child categories service start ..."
        );
        let query =
            initQueryReadPost.q1 +
            "LEFT JOIN posts_categories " +
            "ON posts.id = posts_categories.post_id " +
            "WHERE posts.status = ? AND posts_categories.category_id IN ";

        let params = [1];

        chilCategoryIds.forEach((chilCategoryId, index) => {
            query += index === 0 ? `(?` : `, ?`;
            params = [...params, chilCategoryId];
        });

        query += threshold && threshold > 0 ? ") AND posts.id < ? " : ") ";
        params =
            threshold && threshold > 0 ? [...params, threshold] : [...params];

        query +=
            limit && limit > 0
                ? "GROUP BY posts.id ORDER BY posts.id DESC LIMIT ?"
                : "GROUP BY posts.id ORDER BY posts.id DESC";
        params = limit && limit > 0 ? [...params, limit] : [...params];
        // console.log(query, params)
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read newest accepted posts by child categories service has error: ",
            error
        );
        throw error;
    }
};

export default readNewestAcceptedPostsByChildCategories;
