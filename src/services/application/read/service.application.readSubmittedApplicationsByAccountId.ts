import logging from "../../../utils/logging";
import { executeQuery } from "../../../configs/database";

const readSubmittedApplicationByAccountIdService = async (
    lang: string | null = "vi",
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
            ` ${lang === "vi" ? "wards.full_name" : "wards.full_name_en"} as ward,` +
            "wards.name as ward_name," +
            "districts.id as district_id," +
            ` ${lang === "vi" ? "districts.full_name" : "districts.full_name_en"
            } as district,` +
            "districts.name as district_name," +
            ` ${lang === "vi" ? "provinces.full_name" : "provinces.full_name_en"
            } as province,` +
            "provinces.name as province_name," +
            "provinces.id as province_id," +
            "posts.salary_type as salary_type_id, " +
            "post_images.image as image, " +
            ` ${lang === "vi"
                ? "salary_types.value"
                : lang === "en"
                    ? "salary_types.value_en"
                    : "salary_types.value_ko"
            } as salary_type,` +
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
            " GROUP BY applications.id" +
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
