import { executeQuery } from "../../configs/database/database";
import logging from "../../utils/logging";

// const readUserAccounts = async () => {
//     try {
//         logging.info("Read all accounts service start: ");
//         const res = await executeQuery(
//             "SELECT id, email, phone, created_at from accounts where role = 0"
//         );
//         return res ? res : null;
//     } catch (error) {
//         logging.error("Read all accounts service has error: ", error);
//         throw error;
//     }
// };

const readUserAccounts = async (page, limit) => {
    try {
      logging.info("Read all accounts service start: ");    
      const offset = (page - 1) * limit;
      const query =
        "SELECT id, email, phone, created_at FROM accounts WHERE role = 0 LIMIT ? OFFSET ?";
      const params = [limit, offset];
      const res = await executeQuery(query, params);
      return res ? res : null;
    } catch (error) {
      logging.error("Read all accounts service has error: ", error);
      throw error;
    }
  };
  

export default readUserAccounts;
