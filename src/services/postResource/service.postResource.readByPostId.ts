import { executeQuery } from "../../configs/database";
import logging from "../../utils/logging";

const readPostResourceService = async (
    post_id: number
) => {
    try {
        logging.info("Create post resource service start");
        const query = "SELECT * from post_resource where post_id = ?";
        const params = [post_id];
        const res = await executeQuery(query, params);
        return res[0];
    } catch (error) {
        logging.error("Create post resource service has error: ", error);
        throw error;
    }
};

export default readPostResourceService;
