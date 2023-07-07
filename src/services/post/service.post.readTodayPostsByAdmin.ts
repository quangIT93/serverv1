import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database/database";

// const readTodayPostsByAdmin = async () => {
//     try {
//         logging.info("Read today posts by admin service start ...");
//         const query =
//             "SELECT posts.id, posts.status, posts.account_id, posts.title, posts.company_name, " +
//             "posts.created_at, profiles.name as poster " +
//             "FROM posts " +
//             "LEFT JOIN profiles " +
//             "ON profiles.id = posts.account_id " +
//             "WHERE DATE(posts.created_at) = CURDATE() " +
//             "GROUP BY posts.id " +
//             "ORDER BY posts.id DESC";
//         const res = await executeQuery(query);
//         return res ? res : null;
//     } catch (error) {
//         logging.error("Read today posts by admin service has error: ", error);
//         throw error;
//     }
// };


const readTodayPostsByAdmin = async (page, limit) => {
    try {
      logging.info("Read today posts by admin service start ...");
      const offset = (page - 1) * limit; // Tính offset (vị trí bắt đầu của trang)
      const query = `
        SELECT posts.id, posts.status, posts.account_id, posts.title, posts.company_name,
          posts.created_at, profiles.name as poster
        FROM posts
        LEFT JOIN profiles
          ON profiles.id = posts.account_id
        WHERE DATE(posts.created_at) = CURDATE()
        GROUP BY posts.id
        ORDER BY posts.id DESC
        LIMIT ${limit} OFFSET ${offset}`;
      const res = await executeQuery(query);
      return res ? res : null;
    } catch (error) {
      logging.error("Read today posts by admin service has error: ", error);
      throw error;
    }
  };
  

export default readTodayPostsByAdmin;
