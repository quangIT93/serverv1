import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import initQueryReadPost from "./_service.post.initQuery";

const readNewestAcceptedPostsByProvinces = async (
    provinceIds: string[],
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info(
            "Read newest accepted posts by provinces service start ..."
        );

        let query =
            initQueryReadPost.q1 +
            "WHERE posts.status = ? " +
            "AND provinces.id IN (" + 
            provinceIds.map((provinceId) => "?").join(", ") +
            ") " +
            (threshold && threshold > 0 ? "AND posts.id < ? " : "") +
            "GROUP BY posts.id " +
            "ORDER BY " +
            `${provinceIds.length > 1 ? "FIELD(provinces.id, " + 
            provinceIds.map((provinceId) => "?").join(", ") + ") " : ""}` +
            (limit && limit > 0 ? "LIMIT ?" : "");
        
        console.log(query);
        let params = [1, ...provinceIds, ...provinceIds];

        if (threshold && threshold > 0) {
            params = [...params, threshold];
        }

        if (limit && limit > 0) {
            params = [...params, limit];
        }

        // console.log(query)
        // console.log(params)

        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read newest accepted posts by provinces service has error: ",
            error
        );
        throw error;
    }
};

export default readNewestAcceptedPostsByProvinces;
