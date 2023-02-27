import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readDistrictsByProvince = async (provinceId: number) => {
    try {
        const query = "SELECT id, full_name FROM districts WHERE province_id = ?";
        const params = [provinceId];
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error("Read districts by province has error: ", error);
        throw error;
    }
};

export default readDistrictsByProvince;
