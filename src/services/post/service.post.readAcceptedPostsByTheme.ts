import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import initQueryReadPost from "./_service.post.initQuery";

const readAcceptedPostsByTheme = async (
    themeId: number,
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info("Read accepted posts by theme service start ...");
        let query =
            initQueryReadPost.q1 +
            "WHERE posts.status = ? AND posts.salary_type = salary_types.id " +
            "AND posts.id IN (SELECT post_id FROM themes_posts WHERE theme_id = ?) ";

        let params = [1, themeId];

        query += threshold && threshold > 0 ? "AND posts.id < ? " : " ";
        params =
            threshold && threshold > 0 ? [...params, threshold] : [...params];

        query +=
            limit && limit > 0
                ? "GROUP BY posts.id ORDER BY posts.id DESC LIMIT ?"
                : "GROUP BY posts.id ORDER BY posts.id DESC";
        params = limit && limit > 0 ? [...params, limit] : [...params];

        const res = await executeQuery(query, params);
        return res ? res : false;
    } catch (error) {
        logging.error(
            "Read accepted posts by theme service has error: ",
            error
        );
        throw error;
    }
};

export default readAcceptedPostsByTheme;
