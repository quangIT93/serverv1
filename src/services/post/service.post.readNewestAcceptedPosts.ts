import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import initQueryReadPost from "./_service.post.initQuery";

const readNewestAcceptedPosts = async (
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info("Read newest accepted posts service start ...");
        let query =
            initQueryReadPost.q1 +
            "WHERE posts.status = ? ";

        let params = [1];

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
        logging.error(`Read newest accepted posts service has error: ${error}`);
        throw error;
    }
};

export default readNewestAcceptedPosts;
