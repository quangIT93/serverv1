import logging from '../../utils/logging';
import { executeQuery } from '../../configs/database/database';

const filterService = async (
    districtIds: number[] | undefined | null,
    categoryIds: number[] | undefined | null,
    salaryMin: number | undefined | null,
    salaryMax: number | undefined | null,
    salaryType: number | undefined | null,
    isWorkingWeekend: number | undefined | null,
    startDate : number | undefined | null,
    endDate : number | undefined | null,
    startTime : number | undefined | null,
    endTime : number | undefined | null,
    page: number | undefined | null,
) => {
    try {
        const query =
            "SELECT posts.id, posts.status, posts.account_id, posts.title, posts.company_name, " +
            "posts.is_date_period, posts.start_date, posts.end_date, posts.start_time, " +
            "posts.end_time, posts.salary_min, posts.salary_max, salary_types.value as salary_type, posts.created_at, " +
            "provinces.name as province, provinces.id as province_id, districts.name as district, " +
            "districts.id as district_id, post_images.image AS image, posts.description, " +
            "posts.is_working_weekend, COUNT(*) OVER() AS total " +
            "FROM posts " +
            "LEFT JOIN salary_types " +
            "ON posts.salary_type = salary_types.id " +
            "LEFT JOIN (districts, provinces) " +
            "ON districts.id = posts.district_id AND provinces.id = districts.province_id " +
            "LEFT JOIN post_images " +
            "ON post_images.post_id = posts.id " +
            "WHERE posts.status = ? " +
            `${categoryIds.length > 0 ? 
                `AND posts.id IN (SELECT post_id 
                    FROM posts_categories WHERE category_id 
                        IN (${categoryIds.join(",")}) GROUP BY post_id) ` : ""}` +
            `${districtIds.length > 0 ? `AND posts.district_id IN (${districtIds.join(",")}) ` : ""}` +
            // `${categoryIds.length > 0 ? `AND posts.category_id IN (${categoryIds.join(",")}) ` : ""}` +
            `${salaryMin !== null ? "AND posts.salary >= ? " : ""}` +
            `${salaryMax !== null ? "AND posts.salary <= ? " : ""}` +
            `${salaryType !== null ? "AND posts.salary_type = ? " : ""}` +
            `${isWorkingWeekend !== null ? "AND posts.is_working_weekend = ? " : ""}` +
            `${startDate !== null ? "AND posts.start_date >= ? " : ""}` +
            `${endDate !== null ? "AND posts.end_date <= ? " : ""}` +
            `${startTime !== null ? "AND posts.start_time >= ? " : ""}` +
            `${endTime !== null ? "AND posts.end_time <= ? " : ""}` +
            "GROUP BY posts.id " +
            "ORDER BY posts.created_at DESC " +
            "LIMIT 20 " +
            `OFFSET ${page ? (page - 1) * 20 : 0}`;
        const params = [1]
            .concat(salaryMin !== null ? [salaryMin] : [])
            .concat(salaryMax !== null ? [salaryMax] : [])
            .concat(salaryType !== null ? [salaryType] : [])
            .concat(isWorkingWeekend !== null ? [isWorkingWeekend] : [])
            .concat(startDate !== null ? [startDate] : [])
            .concat(endDate !== null ? [endDate] : [])
            .concat(startTime !== null ? [startTime] : [])
            .concat(endTime !== null ? [endTime] : []);
        // console.log('params', params)
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error("Filter service has error: ", error);
        throw error;
    }
};

export default filterService;