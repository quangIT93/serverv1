import logging from '../../utils/logging';
import { executeQuery } from '../../configs/database/database';

const readAllNotificationsByAccountIdV2Service = async (
    accountId: string,
    page: number,
    lang: string = "vi",
) => {
    try {
        const query =
            `
                SELECT t.*
                FROM (
                    SELECT notifications.id,
                    notifications.application_id,
                    notifications.is_read,
                    notifications.type,
                    notifications.created_at,
                    notifications.application_status,
                    applications.name,
                    posts.title as post_title,
                    posts.company_name,
                    posts.id as post_id,
                    null as salary_min,
                    null as salary_max,
                    null as salary_type,
                    null as money_type,
                    null as image,
                    null as district,
                    null as province,
                    null as salary_type_name,
                    notifications.account_id

                    FROM notifications
                    LEFT JOIN applications ON applications.id = notifications.application_id
                    LEFT JOIN posts ON posts.id = applications.post_id
                    

                    UNION SELECT
                    post_notification.id,
                    null as application_id,
                    post_notification.is_read,
                    3 as type,
                    post_notification.created_at,
                    null as application_status,
                    null as name,
                    posts.title as post_title,
                    posts.company_name,
                    posts.id as post_id,
                    posts.salary_min,
                    posts.salary_max,
                    posts.salary_type,
                    posts.money_type,
                    post_images.image AS image,
                    ${lang === "vi" ? "districts.full_name" :  "districts.full_name_en"} as district,
                    ${lang === "vi" ? "provinces.full_name" :  "provinces.full_name_en"} as province,
                    ${lang === "vi" ? "salary_types.value" : lang === "en" ? "salary_types.value_en" : "salary_types.value_ko"} as salary_type,
                    post_notification.account_id
                    FROM post_notification
                    LEFT JOIN posts ON posts.id = post_notification.post_id
                    LEFT JOIN wards
                    ON wards.id = posts.ward_id
                    LEFT JOIN districts
                    ON districts.id = wards.district_id
                    LEFT JOIN provinces
                    ON provinces.id = districts.province_id
                    LEFT JOIN salary_types
                    ON salary_types.id = posts.salary_type
                    LEFT JOIN post_images
                    ON post_images.post_id = posts.id
                    LEFT JOIN job_types
                    ON job_types.id = posts.job_type
                ) as t
                WHERE t.account_id = ?
                ORDER BY created_at DESC
                ${page ? ` LIMIT 10 OFFSET ${(page - 1) * 10}` : 'LIMIT 10'}
            `
        const params = [accountId];
        const result = await executeQuery(query, params);
        return result;
    } catch (error) {
        logging.error(error);
        return null;
    }
}

export default readAllNotificationsByAccountIdV2Service;
