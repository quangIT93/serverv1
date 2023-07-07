import { executeQuery } from "../../configs/database/database";
import logging from "../../utils/logging";

// const readWorkerAccounts = async () => {
//     try {
//         logging.info("Read worker accounts service start: ");
//         const query = "SELECT * FROM accounts WHERE role = ?";
//         const params = [2];
//         const res = await executeQuery(query, params);
//         return res ? res : null;
//     } catch (error) {
//         logging.error("Read worker accounts service has error: ", error);
//         throw error;
//     }
// };

const readWorkerAccounts = async (page, limit) => {
    try {
      logging.info("Read worker accounts service start: ");
      const offset = (page - 1) * limit;

      const countQuery = "SELECT COUNT(*) as total FROM accounts";
      const countResult = await executeQuery(countQuery);
      const totalAccounts = countResult[0].total;

      const query = "SELECT * FROM accounts WHERE role = ? LIMIT ? OFFSET ?";
      const params = [2, limit, offset];
      const res = await executeQuery(query, params);
      return { totalAccounts, data: res ? res : null };
    } catch (error) {
      logging.error("Read worker accounts service has error: ", error);
      throw error;
    }
  };

export default readWorkerAccounts;
