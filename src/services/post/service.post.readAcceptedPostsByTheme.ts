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
            "WHERE posts.status = ? AND posts.salary_type = salary_types.id " +
            "AND posts.id IN (SELECT post_id FROM themes_posts WHERE theme_id = ?) ";

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
