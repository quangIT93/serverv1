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
        console.log(accountId)

        let query =
            initQueryReadPost.q1 +
            "WHERE posts.status = ? " +
            "AND provinces.id IN (" + 
            provinceIds.map((_) => "?").join(", ") +
            ") " +
            "AND district_id NOT IN (SELECT location_id FROM profiles_locations WHERE account_id = ?) " +
            (threshold && threshold > 0 ? "AND posts.id < ? " : "") +
            "GROUP BY posts.id " +
            `${provinceIds.length > 1 ? "ORDER BY FIELD(provinces.id, " + 
            provinceIds.map((_) => "?").join(", ") + ") " : ""}` +
            (limit && limit > 0 ? "LIMIT ?" : "");
        
        let params = [1, ...provinceIds];
        params = [...params, accountId];

        if (threshold && threshold > 0) {
            params = [...params, threshold];
        }
        
        
        if (provinceIds.length > 1) {
            params = [...params, ...provinceIds];
        }


        if (limit && limit > 0) {
            params = [...params, limit];
        }

        console.log(query)
        console.log(params)

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
