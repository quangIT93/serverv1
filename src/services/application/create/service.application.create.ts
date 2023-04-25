import logging from "../../../utils/logging";
import { executeQuery } from "../../../configs/database";

const createApplicationService = async (accountId: String, postId: number) => {
    try {
        logging.info("Create application service start ...");
        // console.log(accountId);
        const query = "INSERT INTO applications (account_id, post_id, name, birthday, address," +
        " gender, introduction, phone, email, facebook, linkedin, avatar, cv_url)" +
        " SELECT ?, ?, profiles.name, profiles.birthday, profiles.address," +
        " profiles.gender, profiles.introduction, profiles.phone, profiles.email, profiles.facebook," +
        " profiles.linkedin, profiles.avatar, cv_url FROM profiles WHERE profiles.id = ?";
        const params = [accountId, postId, accountId];
        const res = await executeQuery(query, params);
        // console.log(res);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Create application service has error: ",
            error
        );
        return null;
    }
};

export default createApplicationService;
