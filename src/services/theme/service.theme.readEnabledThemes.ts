import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const readEnabledThemes = async (
    provinces: string[] = [],
) => {
    try {
        logging.info("Read enabled themes service start ...");
        let query = 
            "SELECT themes.id, " +
            "themes.title, " +
            "themes.image, " +
            "themes.district_id, " +
            "COUNT(themes_posts.post_id) AS number_of_posts " +
            "FROM themes " +
            "LEFT JOIN themes_posts " +
            "ON themes_posts.theme_id = themes.id " +
            "LEFT JOIN posts " +
            "ON posts.id = themes_posts.post_id " +
            "LEFT JOIN districts " +
            "ON districts.id = themes.district_id " +
            "WHERE themes.status = ? AND posts.status = 1 " +
            `${provinces.length > 0 ? "AND districts.province_id IN " + 
            "(" + provinces.map((_) => "?").join(", ") + ")" : ""}` +
            "GROUP BY themes.id";
        let params = [1, ...provinces];

        // console.log(query)

        const res = await executeQuery(query, params);
        return res ? res : null;
    } catch (error) {
        logging.error("Read enabled themes service has error: ", error);
        throw error;
    }
};

export default readEnabledThemes;
