import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const createPost = async (
    accountId: string,
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
    description: string | null,
    phoneNumber: string,
    moneyType: number,
    role: number
) => {
    try {
        logging.info("Create post service start ...");
        const query =
            "INSERT INTO posts(" +
            "account_id, " +
            "title, " +
            "company_name, " +
            "address, " +
            "latitude, " +
            "longitude, " +
            "ward_id, " +
            "is_date_period, " +
            "is_working_weekend, " +
            "is_remotely, " +
            "start_date, " +
            "end_date, " +
            "start_time, " +
            "end_time, " +
            "salary_min, " +
            "salary_max, " +
            "salary_type, " +
            "description, " +
            "phone_contact, " +
            "money_type, "+
            "is_inhouse_data," +
            "status" //test
            ") " +
            "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const params = [
            accountId,
            title,
            companyName,
            address,
            latitude,
            longitude,
            wardId,
            isDatePeriod,
            isWorkingWeekend,
            isRemotely.toString(),
            startDate,
            endDate,
            startTime,
            endTime,
            salaryMin,
            salaryMax,
            salaryType,
            description,
            phoneNumber,
            moneyType,
            role === 1 || role === 2 ? '1' : '0',
            1 //test
        ];
        const res = await executeQuery(query, params);
        return res ? Number(res.insertId) : null;
    } catch (error) {
        logging.error("Create post service has error: ", error);
        throw error;
    }
};

export default createPost;
