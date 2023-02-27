import logging from "../../../utils/logging";
import { executeQuery } from "../../../configs/database";

const readApplicationProfileByIdService = async (applicationId: number) => {
    try {
        logging.info("Read application profile by id service start ...");
        const query = 
            "SELECT applications.account_id, applications.name, applications.birthday, applications.liked, " +
            "provinces.id as province_id, provinces.name as address, applications.status as application_status, " +
            "applications.gender, applications.introduction, applications.phone, " +
            "applications.email, applications.avatar, applications.facebook, applications.linkedin " +
            "FROM applications " +
            "LEFT JOIN provinces " +
            "ON provinces.id = applications.address " +
            "WHERE applications.id = ?";
        const params = [applicationId];
        const res = await executeQuery(query, params);
        // console.log(res);
        return res ? res[0] : null;
        
    } catch (error) {
        logging.error(
            "Read application profile by id service has error: ",
            error
        );
        return null;
    }
}

export default readApplicationProfileByIdService;