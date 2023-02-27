import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readAllSalaryTypes = async () => {
    try {
        logging.info("Read all salary types service start ...");
        const query = "SELECT * FROM salary_types";
        const res = await executeQuery(query);
        return res ? res : null;
    } catch (error) {
        logging.error("Read all salary types service has error: ", error);
        throw error;
    }
};

export default readAllSalaryTypes;
