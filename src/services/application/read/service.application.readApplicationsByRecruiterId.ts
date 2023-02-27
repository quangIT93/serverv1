import logging from "../../../utils/logging";
import { executeQuery } from "../../../configs/database";

const readApplicationsByRecruiterIdService = async (
        recruiterId: string,
        limit: number | null,
        threshold: number | null
    ) => {
    try {
        logging.info("Read applications of recruiter id service start ...");
        // const query = "SELECT posts.id, posts.status, posts.account_id, posts.title, posts.company_name, " +
        // "posts.is_date_period, posts.start_date, posts.end_date, posts.start_time, posts.money_type," +
        // "posts.end_time, posts.salary_min, posts.salary_max, salary_types.value as salary_type, posts.created_at, " +
        // "provinces.name as province, provinces.id as province_id, districts.name as district, posts.salary_type as salary_type_id," +
        // "districts.id as district_id, post_images.image AS image, "+
        const query = "SELECT " +
        "posts.id," +
        "posts.status," +
        "posts.account_id, " +
        "posts.title," +
        "posts.company_name," +
        "posts.ward_id," +
        "posts.start_date," +
        "posts.end_date," +
        "posts.start_time," +
        "posts.end_time," +
        "posts.salary_min," +
        "posts.salary_max," +
        "posts.salary_type as salary_type_id," +
        "posts.money_type," +
        "posts.created_at," +
        "wards.full_name as ward," + 
        "wards.name as ward_name," +
        "districts.id as district_id," +
        "districts.full_name as district," + 
        "districts.name as district_name," +
        "provinces.full_name as province," +
        "provinces.name as province_name," +
        "provinces.id as province_id," +
        "post_images.image AS image, " +
        "salary_types.value as salary_type, " +
        "COUNT(applications.id) as num_of_application " +
        "FROM posts " +
        "LEFT JOIN salary_types ON posts.salary_type = salary_types.id " +
        "LEFT JOIN applications ON applications.post_id = posts.id " +
        "LEFT JOIN wards ON wards.id = posts.ward_id " +
        "LEFT JOIN districts ON districts.id = wards.district_id " +
        "LEFT JOIN provinces ON provinces.id = districts.province_id " +
        "LEFT JOIN (SELECT DISTINCT post_id, image FROM post_images GROUP BY post_id) " +
        "AS post_images ON post_images.post_id = posts.id " +
        "WHERE posts.account_id = ? " +
        ` ${threshold ? "AND posts.id < ? " : ""}` +
        "GROUP BY posts.id ORDER BY posts.id DESC " +
        ` ${limit ? "LIMIT ?" : ""}`;
        const params = threshold ? [recruiterId, threshold, limit] : [recruiterId, limit];
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read applications of recruiter id service has error: ",
            error
        );
        return null;
    }
    
}

export default readApplicationsByRecruiterIdService;