import logging from "../../../utils/logging";
import { executeQuery } from "../../../configs/database";

const readApplicationLocationsByIdService = async (applicationId: number) => {
    try {
        logging.info("Read application locations service start ...");
        const query = "SELECT applications_locations.location_id as district_id, " +
        "districts.full_name as district," + 
        "districts.name as district_name," +
        "provinces.full_name as province," +
        "provinces.name as province_name," +
        "provinces.id as province_id " +
        "FROM applications_locations " +
        "JOIN districts ON applications_locations.location_id = districts.id " +
        "JOIN provinces ON districts.province_id = provinces.id " +
        "WHERE applications_locations.application_id = ?";
        const params = [applicationId];
        const res = await executeQuery(query, params);
        // console.log(res);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read application locations service has error: ",
            error
        );
        return null;
    }
}

export default readApplicationLocationsByIdService;