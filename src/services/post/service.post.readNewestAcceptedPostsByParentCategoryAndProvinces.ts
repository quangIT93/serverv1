import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import initQueryReadPost from "./_service.post.initQuery";

const readNewestAcceptedPostsByParentCategoryAndProvinces = async (
    accountId: string,
    parentCategoryId: number,
    provinceIds: string[],
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info(
            "Read newest accepted posts by parent category and provinces service start ..."
        );

        let query =
            initQueryReadPost.q1 +
            "LEFT JOIN posts_categories " +
            "ON posts_categories.post_id = posts.id " +
            "LEFT JOIN child_categories " +
            "ON child_categories.id = posts_categories.category_id " +
            "LEFT JOIN parent_categories " +
            "ON parent_categories.id = child_categories.parent_category_id " +
            "WHERE posts.status = ? AND parent_categories.id = ? " +
            "AND district_id NOT IN (SELECT location_id FROM profiles_locations WHERE account_id = ?) " +
            `${provinceIds.length > 0 ? `AND provinces.id IN (${provinceIds.map((_) => `?`).join(", ")})` : ""}` +
            `${threshold && threshold > 0 ? "AND posts.id < ? " : " "}` +
            "GROUP BY posts.id " +  
            `${provinceIds.length > 1 ? "ORDER BY FIELD(provinces.id, " + 
            provinceIds.map((_) => "?").join(", ") + ") " : ""}` +
            `${limit && limit > 0 ? "LIMIT ?" : ""}`;

        let params: any[] = [1, parentCategoryId, accountId];
        
        if (provinceIds.length > 0) {
            params = [...params, ...provinceIds];
        }
        params = threshold && threshold > 0 ? [...params, threshold] : [...params];
        params = [...params, ...(provinceIds.length > 1 ? provinceIds : [])];
        params = limit && limit > 0 ? [...params, limit] : [...params];


        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read newest accepted posts by parent category and provinces service has error: ",
            error
        );
        throw error;
    }
};

export default readNewestAcceptedPostsByParentCategoryAndProvinces;


// select parent_categories.id, parent_categories.name, child_categories.id as cid, child_categories.name as cname from parent_categories JOIN child_categories ON child_categories.parent_category_id  = parent_categories.id where parent_categories.id = 2 ORDER by cname;
