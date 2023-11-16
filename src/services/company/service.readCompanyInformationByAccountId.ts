import { executeQuery } from "../../configs/database/database";

const readCompanyInformationByAccountIdService = async (accountId: string) => {
    try {
        const query = `
            SELECT 
                id,
                status
            FROM companies
            WHERE account_id = ?
        `;

        const [rows, fields] = await executeQuery(query, [accountId]);

        if (!rows || rows.length === 0) {
            return null;
        }

        return rows;
    } catch (error) {
        throw error;
    }
}

export default readCompanyInformationByAccountIdService;