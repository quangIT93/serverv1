import { executeQuery } from './../../configs/database';
import logging from './../../utils/logging';

const searchByQueryV2Service = async (
    lang: string,
    q: string,
    page: number | null,
    districtIds: string[] | undefined | null,
    categoryIds: number[] | undefined | null,
    salaryMin: number | undefined | null,
    salaryMax: number | undefined | null,
    salaryType: number[] | undefined | null,
    isWorkingWeekend: number | undefined | null,
    isRemotely: number | undefined | null,
    startDate : number | undefined | null,
    endDate : number | undefined | null,
    moneyType: number | undefined | null,
    accountId: string | undefined | null,
) => {
    try {
        // search by like, match in boolean mode, match in natural language mode
        // then union all
        // then order by relevance
        // then limit 20
        logging.info("Search by query service called: ");
        const query =
            "SELECT " +
            "posts.id," +
            "posts.status," +
            "posts.account_id," +
            "posts.title," +
            "posts.company_name, " +
            "posts.is_date_period," +
            "posts.start_date," +
            "posts.end_date," +
            "posts.start_time, " +
            "posts.end_time," +
            "posts.salary_min," +
            "posts.salary_max," +
            `${lang === "vi" ? "salary_types.value " : 
                lang === "en" ? "salary_types.value_en " : "salary_types.value_ko "}` +
            "AS salary_type, " +
            "posts.created_at, " +
            "post_images.image AS image, " +
            "posts.address, " +
            "posts.ward_id, " +
            `${lang === "vi" ? "wards.full_name as ward, " : "wards.full_name_en as ward, "}` +
            "wards.name as ward_name," +
            "districts.id as district_id," +
            `${lang === "vi" ? "districts.full_name as district, " : "districts.full_name_en as district, "}` +
            "districts.name as district_name, " +
            `${lang === "vi" ? "provinces.full_name as province, " : "provinces.full_name_en as province, "}` +
            "provinces.name as province_name, " +
            "posts.salary_type as salary_type_id, " +
            "posts.money_type, " +
            `${accountId !== null ? "bookmarks.post_id as bookmark_post_id, " : ""}` +
            "company_resource.icon as company_resource_icon, " +
            "COUNT(*) OVER() AS total " + 
            "FROM posts " +
            "LEFT JOIN salary_types " +
            "ON posts.salary_type = salary_types.id " +
            "LEFT JOIN wards " +
            "ON posts.ward_id = wards.id " +
            "LEFT JOIN districts " +
            "ON wards.district_id = districts.id " +
            "LEFT JOIN provinces " +
            "ON districts.province_id = provinces.id " +
            "LEFT JOIN post_images " +
            "ON post_images.post_id = posts.id " +
            `${accountId !== null ? "LEFT JOIN (SELECT post_id FROM bookmarks WHERE account_id = ?) AS bookmarks " +
            "ON bookmarks.post_id = posts.id " : ""}` +
            "LEFT JOIN post_resource " +
            "ON post_resource.post_id = posts.id " +
            "LEFT JOIN company_resource " +
            "ON company_resource.id = post_resource.company " + //@; HiJob, 7: CHOTOT, 8 :FB  AND company_resource.id IN (7,8,2)
            "WHERE posts.status = 1 " +
            "AND (title LIKE ? OR " +
            "company_name LIKE ?) " +
            `${districtIds.length > 0 ? `AND wards.district_id IN (${districtIds.join(",")}) ` : ''}` +
            `${categoryIds.length > 0 ? 
                `AND posts.id IN (SELECT post_id 
                    FROM posts_categories WHERE category_id 
                        IN (${categoryIds.join(",")}) GROUP BY post_id) ` : ""}` +
            `${salaryMin !== null ? "AND posts.salary_min >= ? " : ""}` +
            `${salaryMax !== null ? "AND posts.salary_max <= ? " : ""}` +
            `${salaryType.length > 0 ? `AND posts.salary_type IN (${salaryType.join(",")}) ` : ''}` +
            `${moneyType !== null ? "AND posts.money_type = ? " : ""}` +
            `${isWorkingWeekend !== null ? "AND posts.is_working_weekend = ? " : ""}` +
            `${isRemotely !== null ? "AND posts.is_remotely = ? " : ""}` +
            `${startDate !== null ? "AND posts.start_date >= ? " : ""}` +
            `${endDate !== null ? "AND posts.end_date <= ? " : ""}` +
            // "AND (title LIKE ? OR " +
            // "company_name LIKE ?) " +
            // ADD expired date here
            // some posts are expired but still show up in search result
            // because they are not deleted yet
            // and some posts don't have expired date
            "AND (posts.expired_date IS NULL OR " +
            "posts.expired_date >= NOW()) " +
            "GROUP BY posts.id " + 
            "ORDER BY posts.created_at DESC " +
            "LIMIT 20 " +
            `OFFSET ${page ? (page - 1) * 20 : 0}`;
        const params = []
        .concat([`%${q}%`, `%${q}%`])
        .concat(accountId !== null ? [accountId] : [])
        .concat(salaryMin !== null ? [salaryMin] : [])
        .concat(salaryMax !== null ? [salaryMax] : [])
        .concat(moneyType !== null ? [moneyType] : [])
        .concat(isWorkingWeekend !== null ? [isWorkingWeekend] : [])
        .concat(isRemotely !== null ? [isRemotely.toString()] : [])
        .concat(startDate !== null ? [startDate] : [])
        .concat(endDate !== null ? [endDate] : [])
        // console.log(query);
        // console.log(params);
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error("Search by query service has error: ", error);
        throw error;
    }
};

export default searchByQueryV2Service;
