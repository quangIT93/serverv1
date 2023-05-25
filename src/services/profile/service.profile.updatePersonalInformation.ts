import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database/database";

const updatePersonalInformationService = async (
    id: string,
    name: string,
    birthday: number,
    gender: number,
    address: string,
    introduction: string
) => {
    try {
        logging.info(
            "Update personal information of profile service start ..."
        );
        const query =
            "UPDATE profiles " +
            "SET name = ?, birthday = ?, gender = ?, address = ?, introduction = ? " +
            "WHERE id = ?";
        const params = [name, birthday, gender, address, introduction, id];
        const res = await executeQuery(query, params);
        // console.log(res);
        return res ? res.affectedRows === 1 : false;
    } catch (error) {
        logging.error(
            "Update personal information of profile service has error: ",
            error
        );
        throw error;
    }
};

export default updatePersonalInformationService;
