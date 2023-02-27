import { executeQuery } from "../../configs/database";
import logging from "../../utils/logging";

const createAccountWithEmailService = async (
    id: String,
    email: String,
    role: number = 0
) => {
    try {
        logging.info("Create account with email service start: ", email);
        const res = await executeQuery(
            "INSERT INTO accounts (id, email, role) VALUES (?, ?, ?)",
            [id, email, role]
        );
        // console.log(res);
        return res.affectedRows === 1;
    } catch (error) {
        logging.error("Create account with email service has error: ", error);
        throw error;
    }
};

export default createAccountWithEmailService;
