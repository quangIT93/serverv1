import { executeQuery } from './../../configs/database';
import logging from './../../utils/logging';

const searchByQueryService = async (
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
        logging.info("Search by query service");
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
            "salary_types.value as salary_type," +
            "posts.created_at, " +
            "post_images.image AS image, " +
            "posts.description, " +
            "posts.address, " +
            "posts.ward_id, " +
            "wards.full_name as ward," + 
            "wards.name as ward_name," +
            "districts.id as district_id," +
            "districts.full_name as district, " + 
            "districts.name as district_name, " +
            "provinces.full_name as province, " +
            "provinces.name as province_name, " +
            "posts.salary_type as salary_type_id, " +
            "posts.money_type, " +
            `${accountId !== null ? "bookmarks.post_id as bookmark_post_id, " : ""}` +
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
            "WHERE posts.status = 1 " +
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
            "AND (title LIKE ? OR " +
            "company_name LIKE ? OR " +
            "description LIKE ? OR " +
            // "MATCH (title, company_name, description) AGAINST (? IN BOOLEAN MODE) OR " +
            "MATCH (title, company_name, description) AGAINST (? IN NATURAL LANGUAGE MODE) OR " +
            "MATCH (title, company_name, description) AGAINST (? WITH QUERY EXPANSION)) " +
            "GROUP BY posts.id " +
            "ORDER BY " +
            // "MATCH (title, company_name, description) AGAINST (? IN BOOLEAN MODE) DESC, " +
            "MATCH (title, company_name, description) AGAINST (? IN NATURAL LANGUAGE MODE) DESC, " +
            "MATCH (title, company_name, description) AGAINST (? WITH QUERY EXPANSION) DESC " +
            // }` +
            "LIMIT 20 " +
            `OFFSET ${page ? (page - 1) * 20 : 0}`;
        const params = []
        .concat(accountId !== null ? [accountId] : [])
        .concat(salaryMin !== null ? [salaryMin] : [])
        .concat(salaryMax !== null ? [salaryMax] : [])
        .concat(moneyType !== null ? [moneyType] : [])
        .concat(isWorkingWeekend !== null ? [isWorkingWeekend] : [])
        .concat(isRemotely !== null ? [isRemotely.toString()] : [])
        .concat(startDate !== null ? [startDate] : [])
        .concat(endDate !== null ? [endDate] : [])
        .concat([`%${q}%`, `%${q}%`, `%${q}%`, q, q, q, q, q, q ])
        // console.log(query);
        // console.log(params);
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error("Search by query service has error: ", error);
        throw error;
    }
};

export default searchByQueryService;
