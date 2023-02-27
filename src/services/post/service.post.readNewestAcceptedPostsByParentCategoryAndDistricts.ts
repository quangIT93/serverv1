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

        // let query =
        //     "SELECT posts.id, posts.status, posts.account_id, posts.title, posts.company_name, " +
        //     "posts.is_date_period, posts.start_date, posts.end_date, posts.start_time, " +
        //     "posts.end_time, posts.salary_min, posts.salary_max, salary_types.value as salary_type, posts.created_at, " +
        //     "provinces.name as province, provinces.id as province_id, districts.name as district, " +
        //     "districts.id as district_id, post_images.image AS image, posts.money_type, " +
        //     "posts.salary_type as salary_type_id " +
        //     "FROM (posts, salary_types, posts_categories, child_categories, parent_categories) " +
        //     "LEFT JOIN (districts, provinces) " +
        //     "ON districts.id = posts.district_id AND districts.province_id = provinces.id " +
        //     "LEFT JOIN post_images " +
        //     "ON post_images.post_id = posts.id " +
        //     "WHERE posts.status = ? AND posts.id = posts_categories.post_id AND posts_categories.category_id = child_categories.id " +
        //     "AND child_categories.parent_category_id = ? AND posts.salary_type = salary_types.id AND posts.district_id IN ";

        // let params = [1, parentCategoryId];
        // districtIds.forEach((districtId, index) => {
        //     query += index === 0 ? `(?` : `, ?`;
        //     params = [...params, districtId];
        // });

        // query += threshold && threshold > 0 ? ") AND posts.id < ? " : ") ";
        // params =
        //     threshold && threshold > 0 ? [...params, threshold] : [...params];

        // query +=
        //     limit && limit > 0
        //         ? "GROUP BY posts.id ORDER BY posts.id DESC LIMIT ?"
        //         : "GROUP BY posts.id ORDER BY posts.id DESC";
        // params = limit && limit > 0 ? [...params, limit] : [...params];

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
