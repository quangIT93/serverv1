import { executeQuery } from "../../../configs/database/database";
import { CreateKeywordNotificationDto } from "../../../models/notification/keyword/dto/keyword-create.dto";
import logging from "../../../utils/logging";

const createKeywordNotificationService = async (dto: CreateKeywordNotificationDto) => {
    try {

        const query = "INSERT INTO keywords_notification " +
        "(keyword, category_id, district_id, account_id) " +
        "VALUES (?, ?, ?, ?) RETURNING *";
        
        const values = [dto.keyword, dto.category_id, dto.district_id, dto.accountId];
    
        const res = await executeQuery(query, values);

        return res;

    } catch (error) {
        logging.error(error);
        return null;
    }
}

export default createKeywordNotificationService;