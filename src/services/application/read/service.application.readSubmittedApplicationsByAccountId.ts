import logging from "../../../utils/logging";
import { executeQuery } from "../../../configs/database";

const readSubmittedApplicationByAccountIdService = async (
    accountId: string,
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info("Read submitted applications by account id service start ...");
        const query =
            "SELECT " +
            "applications.id, " +
            "applications.post_id, " +
            "applications.account_id, " +
            "applications.status, " +
            "applications.created_at, " +
            "posts.title, " +
            "posts.company_name, " +
            "posts.start_date, " +
            "posts.end_date, " +
            "posts.salary_min, " +
            "posts.salary_max, " +
            "posts.id as post_id, " +
            "wards.full_name as ward," + 
            "wards.name as ward_name," +
            "districts.id as district_id," +
            "districts.full_name as district," + 
            "districts.name as district_name," +
            "provinces.full_name as province," +
            "provinces.name as province_name," +
            "provinces.id as province_id," +
            "posts.salary_type as salary_type_id, " +
            "post_images.image as image, " +
            "salary_types.value as salary_type, " +
            "posts.money_type " +
            " FROM applications" +
            " LEFT JOIN posts ON applications.post_id = posts.id" +
            " LEFT JOIN wards ON posts.ward_id = wards.id" +
            " LEFT JOIN districts ON wards.district_id = districts.id" +
            " LEFT JOIN provinces ON districts.province_id = provinces.id" +
            " LEFT JOIN post_images ON posts.id = post_images.post_id" +
            " LEFT JOIN salary_types ON posts.salary_type = salary_types.id" +
            " WHERE applications.account_id = ?" +
            ` ${threshold ? " AND applications.id < ?" : ""}` +
            " GROUP BY applications.id"
            " ORDER BY applications.id DESC" +
            ` ${limit ? " LIMIT ?" : ""}`;
        const params: any[] = [accountId];
        if (threshold) {
            params.push(threshold);
        }
        if (limit) {
            params.push(limit);
        }
        const res = await executeQuery(query, params);
        // console.log(res);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read submitted applications by account id service has error: ",
            error
        );
        return null;
    }
};

export default readSubmittedApplicationByAccountIdService;
