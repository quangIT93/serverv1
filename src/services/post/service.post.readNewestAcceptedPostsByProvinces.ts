import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import initQueryReadPost from "./_service.post.initQuery";

const readNewestAcceptedPostsByProvinces = async (
    accountId: string,
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
            provinceIds.map((_) => "?").join(", ") +
            ") " +
            (threshold && threshold > 0 ? "AND posts.id < ? " : "") +
            "AND districts.id NOT IN (SELECT location_id FROM profiles_locations WHERE account_id = ?) " +
            "GROUP BY posts.id " +
            `${provinceIds.length > 1 ? "ORDER BY FIELD(provinces.id, " + 
            provinceIds.map((_) => "?").join(", ") + ") " : ""}` +
            (limit && limit > 0 ? "LIMIT ?" : "");

        const params: any[] = [1, ... provinceIds]
            .concat(threshold && threshold > 0 ? [threshold] : [])
            .concat(provinceIds.length > 1 ? provinceIds : [])
            .concat(accountId)
            .concat(limit && limit > 0 ? [limit] : []);

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
