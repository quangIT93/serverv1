import logging from "../../../utils/logging";
import { executeQuery } from "../../../configs/database";

const readApplicationsByPostIdService = async (postId: number, limit: number | null, threshold: number | null) => {
    try {
        const query = 
        "SELECT " +
        "applications.id, " +
        "applications.status as application_status, " +
        "applications.name, " +
        "applications.avatar, " +
        "applications.birthday, " +
        "applications.address, " +
        "applications.gender, " +
        "applications.created_at, " +
        "provinces.full_name as province, " +
        "provinces.name as province_name " +
        " FROM applications" +
        // " LEFT JOIN wards ON wards.id = applications.address" +
        " LEFT JOIN provinces ON provinces.id = applications.address" +
        " WHERE applications.post_id = ?" +
        ` ${threshold ? " AND applications.id < ?" : ""}` +
        " ORDER BY applications.id DESC" +
        ` ${limit ? " LIMIT ?" : ""}`;
        const params = threshold ? [postId, threshold, limit] : [postId, limit];
        const res = await executeQuery(query, params);
        // console.log(res)
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read applications of post id service has error: ",
            error
        );
        throw error;
    }
}

export default readApplicationsByPostIdService;