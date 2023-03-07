import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import initQueryReadPost from "./_service.post.initQuery";

const readNewestAcceptedPostsByChildCategoriesAndProvinces = async (
    chilCategoryIds: number[],
    provinceIds: number[],
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info(
            "Read newest accepted posts by child categories and provinces service start ... ???"
        );

        let query =
            initQueryReadPost.q1 +
            "WHERE posts.status = ? AND wards.district_id = districts.id " +
            "AND posts.id IN " +
            "(SELECT post_id FROM posts_categories WHERE category_id IN " +
            `(${chilCategoryIds.map(() => "?").join(", ")})) ` +
            "AND provinces.id IN " +
            `(${provinceIds.map(() => "?").join(", ")}) ` +
            `${threshold ? "AND posts.id < ? " : ""} ` +
            "UNION " +
            "GROUP BY posts.id " +
            "ORDER BY " +
            `${provinceIds.length > 1 ? "FIELD(provinces.id, " + 
            provinceIds.map((provinceId) => "?").join(", ") + ") " : ""}` +
            `${limit ? "LIMIT ?" : ""}`;

        // console.log(query);

        const params = [
            1,
            ...chilCategoryIds,
            ...provinceIds,
            ...(threshold ? [threshold] : []),
            ...provinceIds,
            ...(limit ? [limit] : []),
        ];

        const res = await executeQuery(query, params);

        // console.log(res);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read newest accepted posts by child categories and provinces service has error: ",
            error
        );
        throw error;
    }
};

export default readNewestAcceptedPostsByChildCategoriesAndProvinces;
