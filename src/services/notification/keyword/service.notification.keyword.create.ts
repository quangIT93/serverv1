import { executeQuery } from "../../../configs/database/database";
import { CreateKeywordNotificationDto } from "../../../models/notification/keyword/dto/keyword-create.dto";
import logging from "../../../utils/logging";

const createKeywordNotificationService = async (dto: CreateKeywordNotificationDto) => {
    try {

        const query = "INSERT INTO keywords_notification " +
        "(keyword, category_id, category_status, district_id, district_status, account_id) " +
        "VALUES (?, ?, ?, ?, ?, ?) RETURNING *";
        
        const values = [
            dto.keyword,
            dto.category_id,
            dto.category_status,
            dto.district_id,
            dto.district_status,
            dto.accountId
        ];
    
        const res = await executeQuery(query, values);

        return res;

    } catch (error) {
        logging.error(error);
        return null;

    }
}

export default createKeywordNotificationService;