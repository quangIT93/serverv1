import logging from "../../../utils/logging";
import { executeQuery } from "../../../configs/database/database";

const readApplicationsByRecruiterIdService = async (
    lang: string | null = "vi",
    recruiterId: string,
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info("Read applications of recruiter id service start ...");
        const query =
            "SELECT " +
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
            "post_images.image AS image, " +
            ` ${lang === "vi"
                ? "salary_types.value"
                : lang === "en"
                    ? "salary_types.value_en"
                    : "salary_types.value_ko"
            } as salary_type,` +
            "posts.job_type," +
            `${lang === "vi" ? "job_types.name" : lang === "en" ? "job_types.name_en" : "job_types.name_ko"} as job_type_name,` +
            "COUNT(applications.id) as num_of_application " +
            "FROM posts " +
            "LEFT JOIN salary_types ON posts.salary_type = salary_types.id " +
            "LEFT JOIN applications ON applications.post_id = posts.id " +
            "LEFT JOIN wards ON wards.id = posts.ward_id " +
            "LEFT JOIN districts ON districts.id = wards.district_id " +
            "LEFT JOIN provinces ON provinces.id = districts.province_id " +
            "LEFT JOIN (SELECT DISTINCT post_id, image FROM post_images GROUP BY post_id) " +
            "AS post_images ON post_images.post_id = posts.id " +
            "LEFT JOIN job_types ON job_types.id = posts.job_type " +
            "WHERE posts.account_id = ? " +
            ` ${threshold ? "AND posts.id < ? " : ""}` +
            "GROUP BY posts.id ORDER BY posts.id DESC " +
            ` ${limit ? "LIMIT ?" : ""}`;
        const params = threshold
            ? [recruiterId, threshold, limit]
            : [recruiterId, limit];
        // console.log(query);
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read applications of recruiter id service has error: ",
            error
        );
        return null;
    }
};

export default readApplicationsByRecruiterIdService;
