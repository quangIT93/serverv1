import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database/database";

const readEnabledBanners = async (version: number, order: number) => {
  try {
    logging.info("Read enabled banners service start ...");
    // const query =
    //   "SELECT id, image, redirect_url, type from banners WHERE status = ? AND version = ? AND `order` = ? ORDER BY ID DESC";

    const query = `SELECT id, image, redirect_url, type, \`order\` from banners WHERE status = ? AND version = ? ${
      order ? "AND `order` = ?" : ""
    } ORDER BY ID DESC`;

    const params = [1, version, order];
    const res = await executeQuery(query, params);
    return res ? res : null;
  } catch (error) {
    logging.error("Read enabled banners service has error: ", error);
    throw error;
  }
};

export default readEnabledBanners;
