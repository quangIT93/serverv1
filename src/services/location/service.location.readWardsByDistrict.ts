import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readWardsByDistrict = async (provinceId: number) => {
    try {
        const query = "SELECT id, full_name FROM wards WHERE district_id = ?";
        const params = [provinceId];
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error("Read districts by province has error: ", error);
        throw error;
    }
};

export default readWardsByDistrict;
