import { executeQuery } from "../../configs/database/database";
import logging from "../../utils/logging";

const readTodayUserAccounts = async () => {
    try {
        logging.info("Read today accounts service start: ");
        const res = await executeQuery(
            "SELECT * FROM accounts WHERE role = 0 AND DATE(created_at) = CURDATE()"
        );
        return res ? res : null;
    } catch (error) {
        logging.error("Read today accounts service has error: ", error);
        throw error;
    }
};

export default readTodayUserAccounts;
