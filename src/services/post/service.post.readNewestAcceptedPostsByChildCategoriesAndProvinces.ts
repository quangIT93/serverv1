import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";
import { expiredDateCondition, initQueryReadPost } from "./_service.post.initQuery";

const readNewestAcceptedPostsByChildCategoriesAndProvinces = async (
    lang: string,
    accountId: string,
    childCategoryIds: number[],
    provinceIds: string[],
    limit: number | null,
    threshold: number | null
) => {
    try {
        logging.info(
            "Read newest accepted posts by child categories and provinces service start ... ???"
        );

        let query =
            initQueryReadPost(lang) +
            "WHERE posts.status = ? AND wards.district_id = districts.id " +
            "AND district_id NOT IN (SELECT location_id FROM profiles_locations WHERE account_id = ?) " +
            "AND posts.id IN " +
            "(SELECT post_id FROM posts_categories WHERE category_id IN " +
            `(${childCategoryIds.map(() => "?").join(", ")})) ` +
            "AND provinces.id IN " +
            `(${provinceIds.map(() => "?").join(", ")}) ` +
            `${threshold ? "AND posts.id < ? " : " "} ` +
            expiredDateCondition() + 
            "GROUP BY posts.id " +
            `${provinceIds.length > 1 ? "ORDER BY FIELD(provinces.id, " + 
            provinceIds.map((_) => "?").join(", ") + "), posts.id DESC " : "  ORDER BY posts.id DESC "}` +
            `${limit ? "LIMIT ?" : ""}`;

        const params = [
            1,
            accountId,
            ...childCategoryIds,
            ...provinceIds,
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
