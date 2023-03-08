import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import initQueryReadPost from "./_service.post.initQuery";

const readNewestAcceptedPostsByParentCategoryAndDistricts = async (
    parentCategoryId: number,
    districtIds: number[],
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info(
            "Read newest accepted posts by parent category and districts service start ..."
        );

        let query = 
            initQueryReadPost.q1 + 
            "JOIN posts_categories " +
            "ON posts_categories.post_id = posts.id " +
            "JOIN child_categories " +
            "ON child_categories.id = posts_categories.category_id " +
            "JOIN parent_categories " +
            "ON parent_categories.id = child_categories.parent_category_id " +
            "WHERE posts.status = ? AND parent_categories.id = ? AND wards.district_id IN ";

        let params = [1, parentCategoryId];
        districtIds.forEach((districtId, index) => {
            query += index === 0 ? `(?` : `, ?`;
            params = [...params, districtId];
        });

        query += threshold && threshold > 0 ? ") AND posts.id < ? " : ") ";
        query += limit && limit > 0 ? 
            "GROUP BY posts.id ORDER BY posts.id DESC LIMIT ?" : 
            "GROUP BY posts.id ORDER BY posts.id DESC";
        params =
            threshold && threshold > 0 ? [...params, threshold] : [...params];
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

export default readNewestAcceptedPostsByParentCategoryAndDistricts;
