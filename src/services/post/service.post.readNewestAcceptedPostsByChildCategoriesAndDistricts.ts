import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import initQueryReadPost from "./_service.post.initQuery";

const readNewestAcceptedPostsByChildCategoriesAndDistricts = async (
    chilCategoryIds: number[],
    districtIds: string[],
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info(
            "Read newest accepted posts by child categories and districts service start ..."
        );

        let query =
            initQueryReadPost.q1 +
            "LEFT JOIN posts_categories "+
            "ON posts_categories.post_id = posts.id "+
            "WHERE posts.status = ? AND posts.salary_type = salary_types.id AND wards.district_id IN ";

        let params: any[] = [1];
        districtIds.forEach((districtId, index) => {
            query += index === 0 ? `(?` : `, ?`;
            params = [...params, districtId];
        });

        query +=
            ") AND posts.id = posts_categories.post_id AND posts_categories.category_id IN ";

        chilCategoryIds.forEach((chilCategoryId, index) => {
            query += index === 0 ? `(?` : `, ?`;
            params = [...params, chilCategoryId];
        });

        query += threshold && threshold > 0 ? ") AND posts.id < ? " : ") ";
        params =
            threshold && threshold > 0 ? [...params, threshold] : [...params];

        query +=
            limit && limit > 0
                ? "GROUP BY posts.id ORDER BY posts.id DESC LIMIT ?"
                : "GROUP BY posts.id ORDER BY posts.id DESC";
        params = limit && limit > 0 ? [...params, limit] : [...params];

        const res = await executeQuery(query, params);
        // console.log(res);
        return res ? res : null;
    } catch (error) {
        logging.error(
            "Read newest accepted posts by child categories and districts service has error: ",
            error
        );
        throw error;
    }
};

export default readNewestAcceptedPostsByChildCategoriesAndDistricts;
