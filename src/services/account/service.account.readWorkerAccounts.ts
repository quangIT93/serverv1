import { executeQuery } from "../../configs/database";
import logging from "../../utils/logging";

const readWorkerAccounts = async () => {
    try {
        logging.info("Read worker accounts service start: ");
        const query = "SELECT * FROM accounts WHERE role = ?";
        const params = [2];
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error("Read worker accounts service has error: ", error);
        throw error;
    }
};

export default readWorkerAccounts;
