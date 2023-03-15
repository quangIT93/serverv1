import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import initQueryReadPost from "./_service.post.initQuery";

const readNewestAcceptedPostsByChildCategoriesAndProvinces = async (
    accountId: string,
    childCategoryIds: number[],
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
            "AND district_id NOT IN (SELECT location_id FROM profiles_locations WHERE account_id = ?) " +
            "AND posts.id IN " +
            "(SELECT post_id FROM posts_categories WHERE category_id IN " +
            `(${childCategoryIds.map(() => "?").join(", ")})) ` +
            "AND provinces.id IN " +
            `(${provinceIds.map(() => "?").join(", ")}) ` +
            "AND districts.id NOT IN (SELECT location_id FROM profiles_locations WHERE account_id = ?) " +
            `${threshold ? "AND posts.id < ? " : ""} ` +
            "UNION " +
            "GROUP BY posts.id " +
            `${provinceIds.length > 1 ? "ORDER BY FIELD(provinces.id, " + 
            provinceIds.map((_) => "?").join(", ") + ") " : ""}` +
            `${limit ? "LIMIT ?" : ""}`;

        // console.log(query);

        const params = [
            1,
            accountId,
            ...childCategoryIds,
            ...provinceIds,
            accountId,
            ...(threshold ? [threshold] : []),
            ...(provinceIds.length > 1 ? provinceIds : []),
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
