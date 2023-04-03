import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import { initQueryReadDetailPost } from "./_service.post.initQuery";

const readPostByIdService = async (postId: number, lang: string | null = "vi",) => {
    try {
        logging.info("Read post by id service start ...");
        const query =
            initQueryReadDetailPost(lang) +
            "WHERE posts.id = ? " +
            "GROUP BY posts.id";
        const params = [postId];
        const res = await executeQuery(query, params);
        // console.log("res: ", res);
        return res ? res : null;
    } catch (error) {
        logging.error("Read post by id service has error: ", error);
        throw error;
    }
};

export default readPostByIdService;
