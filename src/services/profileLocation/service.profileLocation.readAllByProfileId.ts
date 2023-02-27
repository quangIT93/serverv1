import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readAllByProfileId = async (profileId: string) => {
    try {
        logging.info("Read all locations by profile id service start ...");
        const query =
            "SELECT profiles_locations.location_id as district_id, " +
            "districts.full_name as district," + 
            "districts.name as district_name," +
            "provinces.full_name as province," +
            "provinces.name as province_name," +
            "provinces.id as province_id " +
            "FROM profiles_locations " +
            "JOIN districts ON profiles_locations.location_id = districts.id " +
            "JOIN provinces ON districts.province_id = provinces.id " +
            "WHERE profiles_locations.account_id = ?";
        const params = [profileId];
        return executeQuery(query, params);
    } catch (error) {
        logging.error(
            `Read all locations by profile id servive has error: ${error}`
        );
        throw error;
    }
};

export default readAllByProfileId;
