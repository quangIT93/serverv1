import { executeQuery } from "../../configs/database";
import logging from "../../utils/logging";

const createOtpService = async (otp: String, accountId: String) => {
    try {
        logging.info("Create otp service start: ", otp);
        const query = "INSERT INTO otps (account_id, otp) VALUES (?, ?)";
        const params = [accountId, otp];
        const res = await executeQuery(query, params);
        return res.affectedRows === 1;
    } catch (error) {
        logging.error("Create otp service has error: ", error);
        throw error;
    }
};

export default createOtpService;
