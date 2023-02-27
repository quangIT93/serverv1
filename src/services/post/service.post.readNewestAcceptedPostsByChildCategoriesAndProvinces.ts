import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import initQueryReadPost from "./_service.post.initQuery";

const readNewestAcceptedPostsByChildCategoriesAndProvinces = async (
    chilCategoryIds: number[],
    provinceId: number[],
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info(
            "Read newest accepted posts by child categories and provinces service start ... ???"
        );

        // let query =
        //     "SELECT posts.id, posts.status, posts.account_id, posts.title, posts.company_name, " +
        //     "posts.is_date_period, posts.start_date, posts.end_date, posts.start_time, " +
        //     "posts.end_time, posts.salary_min, posts.salary_max, salary_types.value as salary_type, posts.created_at, " +
        //     "provinces.name as province, provinces.id as province_id, districts.name as district, " +
        //     "districts.id as district_id, post_images.image AS image, posts.money_type, posts.salary_type as salary_type_id " +
        //     "FROM (posts, salary_types, posts_categories, districts, provinces) " +
        //     "LEFT JOIN post_images " +
        //     "ON post_images.post_id = posts.id " +
        //     "WHERE posts.status = ? AND posts.salary_type = salary_types.id AND posts.district_id = districts.id " +
        //     "AND districts.province_id = provinces.id and provinces.id IN ";

        let query =
            initQueryReadPost.q1 +
            // "JOIN posts_categories " +
            // "ON posts_categories.post_id = posts.id " +
            "WHERE posts.status = ? AND wards.district_id = districts.id " +
            "AND posts.id IN " +
            "(SELECT post_id FROM posts_categories WHERE category_id IN " +
            `(${chilCategoryIds.map(() => "?").join(", ")})) ` +
            "AND provinces.id IN " +
            `(${provinceId.map(() => "?").join(", ")}) ` +
            `${threshold ? "AND posts.id < ? " : ""} ` +
            "GROUP BY posts.id " +
            "ORDER BY posts.id DESC " +
            `${limit ? "LIMIT ?" : ""}`;

        // console.log(query);

        const params = [
            1,
            ...chilCategoryIds,
            ...provinceId,
            ...(threshold ? [threshold] : []),
            ...(limit ? [limit] : []),
        ];

        const res = await executeQuery(query, params);

        // console.log(res);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read newest accepted posts by child categories and provinces service has error: ",
            error
        );
        throw error;
    }
};

export default readNewestAcceptedPostsByChildCategoriesAndProvinces;
