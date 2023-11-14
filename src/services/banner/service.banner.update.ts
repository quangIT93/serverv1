import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database/database";

const updateBanner = async (
  bannerId: number,
  redirectUrl: string,
  image: string,
  type: number,
  version: number,
  order: number
) => {
  try {
    logging.info("Update banner service start ...");
    const query =
      "UPDATE banners SET image = ?, redirect_url = ?, type = ?, version = ?, `order` = ? WHERE id = ?";
    const params = [image, redirectUrl, type, version, order, bannerId];

    const res = await executeQuery(query, params);
    return res ? res.affectedRows === 1 : false;
  } catch (error) {
    logging.error("Update banner service has error: ", error);
    throw error;
  }
};

export default updateBanner;
