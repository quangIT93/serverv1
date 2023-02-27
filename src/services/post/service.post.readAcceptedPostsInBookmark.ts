import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readAcceptedPostsInBookmark = async (
    accountId: string,
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info("Read accepted posts in bookmark service start ...");

        const query =
            "SELECT bookmarks.id as bookmark_id, " +
            "posts.id," +
            "posts.status," +
            "posts.account_id," +
            "posts.title," +
            "posts.company_name," +
            "posts.address," +
            // "posts.latitude," +
            // "posts.longitude," +
            "posts.ward_id," +
            "posts.is_date_period," +
            "posts.is_working_weekend," +
            "posts.start_date," +
            "posts.end_date," +
            "posts.start_time," +
            "posts.end_time," +
            "posts.salary_min," +
            "posts.salary_max," +
            "posts.salary_type," +
            "posts.money_type," +
            // "posts.description," +
            // "posts.phone_contact," +
            "posts.created_at," +
            "wards.full_name as ward," + 
            "wards.name as ward_name," +
            "districts.id as district_id," +
            "districts.full_name as district," + 
            "districts.name as district_name," +
            "provinces.full_name as province," +
            "provinces.name as province_name," +
            "provinces.id as province_id," +
            "post_images.image AS image " +
            "FROM bookmarks " +
            "LEFT JOIN posts " +
            "ON posts.id = bookmarks.post_id " +
            "LEFT JOIN posts_categories " +
            "ON posts_categories.post_id = posts.id " +
            "LEFT JOIN salary_types " +
            "ON posts.salary_type = salary_types.id " +
            "LEFT JOIN wards " + 
            "ON posts.ward_id = wards.id " + 
            "LEFT JOIN districts " +
            "ON districts.id = wards.district_id " +
            "LEFT JOIN provinces " +
            "ON districts.province_id = provinces.id " +
            "LEFT JOIN post_images " + 
            "ON post_images.post_id = posts.id " +
            "WHERE posts.status = 1 " +
            "AND bookmarks.account_id = ? " +
            `${threshold ? "AND bookmarks.id < ? " : ""} ` +
            "GROUP BY bookmarks.id ORDER BY bookmarks.id DESC " +
            `${limit ? "LIMIT ?" : ""}`;
        const params = threshold
            ? [accountId, threshold, limit]
            : [accountId, limit];
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read accepted posts in bookmark service has error: ",
            error
        );
        return false;
    }
};

export default readAcceptedPostsInBookmark;
