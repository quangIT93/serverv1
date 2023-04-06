import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import { initQueryReadPost } from "./_service.post.initQuery";

const readAcceptedPostsByTheme = async (
    lang: string = "vi",
    themeId: number,
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info("Read accepted posts by theme service start ...");
        let query =
            initQueryReadPost(lang) +
            "INNER JOIN themes ON themes.id = ? " +
            "WHERE posts.status = ? " +
            "AND districts.id = themes.district_id " +
            `${threshold && threshold > 0 ? "AND posts.id < ? " : " "}` +
            "GROUP BY posts.id ORDER BY posts.id DESC LIMIT ?";
        let params = [themeId, 1]
        params = threshold && threshold > 0 ? [...params, threshold] : [...params];
        params = limit && limit > 0 ? [...params, limit] : [...params];

        const res = await executeQuery(query, params);
        return res ? res : false;
    } catch (error) {
        logging.error(
            "Read accepted posts by theme service has error: ",
            error
        );
        throw error;
    }
};

export default readAcceptedPostsByTheme;
