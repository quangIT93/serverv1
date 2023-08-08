import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database/database";
import { expiredDateCondition, initQueryReadPost, sort, sortByCompanyResource, sortByDate } from "./_service.post.initQuery";

const readNewestAcceptedPosts = async (
    lang: string = "vi",
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info("Read newest accepted posts service start ...");
        let query =
            initQueryReadPost(lang) +
            "WHERE posts.status = ? " +
            expiredDateCondition() +
            `${threshold && threshold > 0 ? "AND posts.id < ? " : " "}` +
            "GROUP BY posts.id " +
            sort([sortByDate(), sortByCompanyResource()]) +
            `${limit && limit > 0 ? "LIMIT ?" : ""}`;

        // console.log(query);

        let params = [1]
        .concat(threshold && threshold > 0 ? [threshold] : [])
        .concat(limit && limit > 0 ? [limit] : []);
        const res = await executeQuery(query, params);


        return res ? res : null;
    } catch (error) {
        // logging.error(`Read newest accepted posts service has error: ${error}`);
        console.log(error);
        throw error;
    }
};

export default readNewestAcceptedPosts;
