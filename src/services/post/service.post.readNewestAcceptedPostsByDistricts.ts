import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import { initQueryReadPost } from "./_service.post.initQuery";

const readNewestAcceptedPostsByDistricts = async (
    lang: string = "vi",
    districtIds: string[],
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info(
            "Read newest accepted posts by parent category and districts service start ..."
        );

        let query =
            initQueryReadPost(lang) +
            "WHERE posts.status = ? AND posts.salary_type = salary_types.id" +
            `AND posts.district_id IN (${districtIds ? districtIds.join(",") : ""})`

        let params = [1, ...districtIds];
        
        query += threshold && threshold > 0 ? ") AND posts.id < ? " : ") ";
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
            "Read newest accepted posts by parent category and districts service has error: ",
            error
        );
        throw error;
    }
};

export default readNewestAcceptedPostsByDistricts;
