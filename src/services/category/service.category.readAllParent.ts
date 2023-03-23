import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readAllParentCategories = async (lang: string) => {
    try {
        // logging.info("Read all parent categories service start ...");
        const query = "SELECT " +
        "id, " +
        `${lang === "vi" ? "name, " : lang === "en" ? "name_en as name, " : "name_kor as name, "}` +
        "default_post_image, image " +
        "FROM parent_categories";

        // console.log(query);

        const res = await executeQuery(query);
        return res ? res : null;
    } catch (error) {
        logging.error("Read all parent categories has error: ", error);
        throw error;
    }
};

export default readAllParentCategories;
