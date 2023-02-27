import logging from "../../../utils/logging";
import { executeQuery } from "../../../configs/database";

const readApplicationLocationsByIdService = async (applicationId: number) => {
    try {
        logging.info("Read application locations service start ...");
        const query = "SELECT applications_locations.location_id as district_id, districts.name as district," +
        " districts.province_id as province_id, provinces.name as provinces" +
        " FROM applications_locations" +
        " JOIN districts ON applications_locations.location_id = districts.id" +
        " JOIN provinces ON districts.province_id = provinces.id" +
        " WHERE applications_locations.application_id = ?";
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