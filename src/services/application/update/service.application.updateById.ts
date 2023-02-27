import logging from "../../../utils/logging";
import { executeQuery } from "../../../configs/database";

const updateApplicationByIdService = async (applicationId: number, status: number) => {
    try {
        logging.info("Update application by id service start ...");
        const query = "UPDATE applications SET status = ? WHERE id = ?";
        const params = [status, applicationId];
        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Update application by id service has error: ",
            error
        );
        return null;
    }
}

export default updateApplicationByIdService;