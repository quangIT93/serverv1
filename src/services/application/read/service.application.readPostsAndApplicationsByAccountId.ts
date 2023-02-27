import logging from "../../../utils/logging";
import { executeQuery } from "../../../configs/database";

const readPostsAndApplicationsBYAccountIdService = async (accountId: String, page: number = 0) => {
    try {
        logging.info('Read posts and applications applications by recruiter id service start ...');
        const query = "SELECT t.*, " +
        "wards.full_name as ward, " + 
        "wards.name as ward_name, " +
        "districts.id as district_id, " +
        "districts.full_name as district, " + 
        "districts.name as district_name, " +
        "provinces.full_name as province, " +
        "provinces.name as province_name, " +
        "provinces.id as province_id, " +
        "post_images.image as image, " +
        "salary_types.value as salary_type " +
        "FROM ( " +
        "SELECT " +
        "applications.id, " +
        "applications.post_id, " +
        "posts.account_id, " +
        "posts.title, " +
        "posts.company_name, " +   
        "posts.address, " +
        "posts.ward_id, " +
        "applications.status, " +
        "'application' as type, " +
        "applications.created_at, " +
        "NULL as num_of_application, " +
        "posts.start_date, " +
        "posts.end_date, " +
        "posts.salary_min, " +
        "posts.salary_max, " +
        "posts.salary_type as salary_type_id," +
        "posts.money_type " +
        "FROM applications " +
        "LEFT JOIN posts ON applications.post_id = posts.id " +
        "WHERE applications.account_id = ? " +
        "UNION SELECT " +
        "posts.id, " +
        "posts.id as post_id, " +
        "posts.account_id, " +
        "posts.title, " +
        "posts.company_name, " +
        "posts.address, " +
        "posts.ward_id, " +
        "posts.status, " +
        "'post' as type, " +
        "posts.created_at, " +
        "COUNT(applications.id) as num_of_application, " +
        "posts.start_date, " +
        "posts.end_date, " +
        "posts.salary_min, " +
        "posts.salary_max, " +
        "posts.salary_type as salary_type_id," +
        "posts.money_type " +
        "FROM posts " +
        "LEFT JOIN applications ON applications.post_id = posts.id " +
        "WHERE posts.account_id = ? " +
        "GROUP BY posts.id " +
        ") as t " +
        "LEFT JOIN wards ON wards.id = t.ward_id " +
        "LEFT JOIN salary_types ON salary_types.id = t.salary_type_id " +
        "LEFT JOIN districts ON districts.id = wards.district_id " +
        "LEFT JOIN provinces ON provinces.id = districts.province_id " +
        "LEFT JOIN (SELECT DISTINCT post_id, image FROM post_images GROUP BY post_id) " +
        "as post_images ON post_images.post_id = t.post_id " +
        "ORDER BY created_at DESC " +
        "LIMIT ? OFFSET ?";
        
        const params = [accountId, accountId, 10, page * 10];
        const res = await executeQuery(query, params);

        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read applications of post id service has error: ",
            error
        );
        throw error;
    }
}

export default readPostsAndApplicationsBYAccountIdService;
