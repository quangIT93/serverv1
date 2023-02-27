import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readProfileByIdService = async (profileId: string) => {
    try {
        logging.info("Read profile by id service start ...");
        // const query =
        //     "SELECT profiles.id, profiles.name, profiles.birthday, provinces.name as address, profiles.gender, profiles.introduction, profiles.phone, profiles.email, profiles.avatar " +
        //     "FROM profiles, provinces WHERE profiles.id = ? AND profiles.address = provinces.id";
        const query =
            "SELECT profiles.id, profiles.name, profiles.birthday, provinces.id as province_id, provinces.name as address, profiles.gender, profiles.introduction, profiles.phone, profiles.email, profiles.avatar, profiles.facebook, profiles.linkedin " +
            "FROM profiles " +
            "LEFT JOIN provinces " +
            "ON provinces.id = profiles.address " +
            "WHERE profiles.id = ?";
        const params = [profileId];
        const res = await executeQuery(query, params);
        return res ? res[0] : null;
    } catch (error) {
        logging.error("Read profile by id service has error: ", error);
        throw error;
    }
};

export default readProfileByIdService;
