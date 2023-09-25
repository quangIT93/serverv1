import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database/database";

const updatePersonalInformationService = async (
    id: string,
    name: string,
    birthday: number,
    gender: number,
    address: string,
    introduction: string,
    jobTypeId: number = null,
    jobTypeName: string = null
) => {
    try {
        logging.info(
            "Update personal information of profile service start ..."
        );
        const query =
            "UPDATE profiles " +
            "SET name = ?, birthday = ?, gender = ?, address = ?, introduction = ? " +
            `${jobTypeId ? ", job_type_id = ? " : ""}` +
            `${jobTypeName ? ", job_type_name = ? " : ""}` +
            "WHERE id = ?";
        const params = [name, birthday, gender, address, introduction, id];
        // console.log(query);
        if (jobTypeId) params.splice(5, 0, jobTypeId);
        if (jobTypeName) params.splice(6, 0, jobTypeName);
        // console.log(params);
        const res = await executeQuery(query, params);
        // console.log(res);
        return res ? res.affectedRows === 1 : false;
    } catch (error) {
        console.log(
            "Update personal information of profile service has error: ",
            error
        );
        throw error;
    }
};

export default updatePersonalInformationService;
