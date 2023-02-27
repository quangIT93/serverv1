import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import initQueryReadPost from "./_service.post.initQuery";

const readPostByIdService = async (postId: number) => {
    try {
        logging.info("Read post by id service start ...");
        const query =
            initQueryReadPost.q2 +
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
