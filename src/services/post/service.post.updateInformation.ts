import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const updateInformation = async (
    postId: number,
    title: string,
    companyName: string,
    wardId: string,
    address: string,
    latitude: number,
    longitude: number,
    isDatePeriod: number,
    isWorkingWeekend: number,
    isRemotely: number,
    startDate: number | null,
    endDate: number | null,
    startTime: number,
    endTime: number,
    salaryMin: number,
    salaryMax: number,
    salaryType: number,
    description: string,
    phoneNumber: string,
    moneyType: number
) => {
    try {
        logging.info("Update post information service start ...");
        const query =
            "UPDATE posts " +
            "SET title = ?, " +
            "company_name = ?, " +
            "ward_id = ?, " +
            "address = ?, " +
            "latitude = ?, " +
            "longitude = ?, " +
            "is_date_period = ?, " +
            "start_date = ?, " +
            "end_date = ?, " +
            "start_time = ?, " +
            "end_time = ?, " +
            "is_working_weekend = ?, " +
            "is_remotely = ?, " +
            "salary_min = ?, " +
            "salary_max = ?, " +
            "salary_type = ?, " +
            "description = ?, " +
            "phone_contact = ?, " +
            "money_type = ? " +
            "WHERE id = ?";

        const params = isDatePeriod
            ? [
                title,
                companyName,
                wardId,
                address,
                latitude,
                longitude,
                isDatePeriod,
                startDate,
                endDate,
                startTime,
                endTime,
                isWorkingWeekend,
                isRemotely.toString(),
                salaryMin,
                salaryMax,  
                salaryType,
                description,
                phoneNumber,
                moneyType,
                postId,

              ]
            : [
                title,
                companyName,
                wardId,
                address,
                latitude,
                longitude,
                isDatePeriod,
                null,
                null,
                startTime,
                endTime,
                isWorkingWeekend,
                isRemotely.toString(),
                salaryMin,
                salaryMax,
                salaryType,
                description,
                phoneNumber,
                moneyType,
                postId,
              ];
        const res = await executeQuery(query, params);
        // return res ? res.affectedRows === 1 : false;
        return res ? res.affectedRows === 1 ? true : 2 : false;
    } catch (error) {
        logging.error("Update post information service has error: ", error);
        throw error;
    }
};

export default updateInformation;
