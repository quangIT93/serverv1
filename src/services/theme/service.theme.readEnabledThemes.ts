import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readEnabledThemes = async () => {
    try {
        logging.info("Read enabled themes service start ...");
        // let query =
        //     "SELECT themes.id, themes.title, themes.image, COUNT(themes_posts.post_id) AS number_of_posts " +
        //     "FROM themes " +
        //     "LEFT JOIN themes_posts " +
        //     "ON themes_posts.theme_id = themes.id " +
        //     "WHERE themes.status = ? GROUP BY themes.id";

        let query = 
            "SELECT themes.id, themes.title, themes.image, COUNT(themes_posts.post_id) AS number_of_posts " +
            "FROM themes " +
            "LEFT JOIN themes_posts " +
            "ON themes_posts.theme_id = themes.id " +
            "LEFT JOIN posts " +
            "ON posts.id = themes_posts.post_id " +
            "WHERE themes.status = ?  AND posts.status = 1 GROUP BY themes.id";
        let params = [1];

        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error("Read enabled themes service has error: ", error);
        throw error;
    }
};

export default readEnabledThemes;
