import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import logging from '../../utils/logging';
import * as searchService from '../../services/search/_service.search';
// import * as postServices from "../../services/post/_service.post";
import * as bookmarkServices from "../../services/bookmark/_service.bookmark";
// import * as categoryServices from "../../services/category/_service.category";
import MoneyType from '../../enum/money_type.enum';
import readDefaultPostImageByPostId from '../../services/category/service.category.readDefaultPostImageByPostId';
interface Payload {
    id: string;
    role: number;
}


const searchByQueryController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        logging.info('Search controller start ...');

        // GET SEARCH KEYWORD
        let { q, page } = req.query;

        // VALIDATION
        if (!q) {
            logging.warning('Invalid search keyword');
            return next(createError(400));
        }

        const { district_ids } = req.query;
        const { category_ids } = req.query;
        const { salary_min } = req.query;
        const { salary_max } = req.query;
        const { salary_type } = req.query;
        const { money_type  } = req.query;
        const { is_working_weekend } = req.query;
        const { is_remotely } = req.query;
        const { start_date } = req.query;
        const { end_date } = req.query;
        // const { sort_by } = req.query;


        // VALIDATION
        // DISTRICT IDS
        const districtIds: string[] = []
        if (district_ids) {
            if (Array.isArray(district_ids)) {
                for (let i = 0; i < district_ids.length; i++) {
                    if (Number.isInteger(parseInt(district_ids[i] as string))) {
                        districtIds.push(district_ids[i] as string);
                    } else {
                        logging.warning('Invalid district_ids');
                        return next(createError(400, 'Invalid district_ids'));
                    }
                }
            } else {
                const temp = district_ids.toString().split(',');
                for (let i = 0; i < temp.length; i++) {
                    if (Number.isInteger(parseInt(temp[i]))) {
                        districtIds.push(temp[i]);
                    } else {
                        logging.warning('Invalid district_ids');
                        return next(createError(400, 'Invalid district_ids'));
                    }
                }
            }
        }

        // CATEGORY IDS
        const categoryIds: number[] = []
        if (category_ids) {
            if (Array.isArray(category_ids)) {
                for (let i = 0; i < category_ids.length; i++) {
                    if (Number.isInteger(parseInt(category_ids[i] as string))) {
                        categoryIds.push(parseInt(category_ids[i] as string));
                    } else {
                        logging.warning('Invalid category_ids');
                        return next(createError(400, 'Invalid category_ids'));
                    }
                }
            } else {
                const temp = category_ids.toString().split(',');
                for (let i = 0; i < temp.length; i++) {
                    if (Number.isInteger(parseInt(temp[i]))) {
                        categoryIds.push(parseInt(temp[i]));
                    } else {
                        logging.warning('Invalid category_ids');
                        return next(createError(400, 'Invalid category_ids'));
                    }
                }
            }
        }

        // SALARY MIN
        let salaryMin: number | null = null;
        if (salary_min && !Number.isInteger(parseInt(salary_min as string))) {
            logging.warning('Invalid salary_min');
            return next(createError(400));
        } else {
            salaryMin = salary_min ? parseInt(salary_min as string) : null;
        }

        // SALARY MAX
        let salaryMax: number | null = null;
        if (salary_max && !Number.isInteger(parseInt(salary_max as string))) {
            logging.warning('Invalid salary_max');
            return next(createError(400));
        } else {
            salaryMax = salary_max ? parseInt(salary_max as string) : null;
        }

        // INVALID SALARY MIN AND SALARY MAX
        if (salaryMax && salaryMin && salaryMin > salaryMax) {
            logging.warning('Invalid salary_min and salary_max');
            return next(createError(400));
        }

        let salaryType: number[] = [];
        if (salary_type) {
            if (Array.isArray(salary_type)) {
                for (let i = 0; i < salary_type.length; i++) {
                    if (Number.isInteger(parseInt(salary_type[i] as string))) {
                        salaryType.push(parseInt(salary_type[i] as string));
                    } else {
                        logging.warning('Invalid salary_type');
                        return next(createError(400, 'Invalid salary_type'));
                    }
                }
            } else {
                const temp = salary_type.toString().split(',');
                for (let i = 0; i < temp.length; i++) {
                    if (Number.isInteger(parseInt(temp[i]))) {
                        salaryType.push(parseInt(temp[i]));
                    } else {
                        logging.warning('Invalid salary_type');
                        return next(createError(400, 'Invalid salary_type'));
                    }
                }
            }
        }
        // IS WORKING WEEKEND
        let isWorkingWeekend: number | null = null;
        if (is_working_weekend && !Number.isInteger(parseInt(is_working_weekend as string))) {
            logging.warning('Invalid is_working_weekend');
            return next(createError(400));
        } else {
            isWorkingWeekend = is_working_weekend ? parseInt(is_working_weekend as string) : null;
        }

        // IS REMOTELY
        let isRemotely: number | null = null;
        if (isRemotely && !Number.isInteger(parseInt(is_remotely as string)) && +is_remotely !== 0 && +is_remotely !== 1) {
            logging.warning('Invalid is_remotely');
            return next(createError(400));
        } else {
            isRemotely = is_remotely ? parseInt(is_remotely as string) : null;
        }

        // START DATE
        let startDate: number | null = null;
        if (start_date && !Number.isInteger(parseInt(start_date as string))) {
            logging.warning('Invalid start_date');
            return next(createError(400));
        } else {
            startDate = start_date ? parseInt(start_date as string) : null;
        }

        // END DATE
        let endDate: number | null = null;
        if (end_date && !Number.isInteger(parseInt(end_date as string))) {
            logging.warning('Invalid end_date');
            return next(createError(400));
        } else {
            endDate = end_date ? parseInt(end_date as string) : null;
        }

        // INVALID START TIME AND END TIME
        if (startDate && endDate && startDate > endDate) {
            logging.warning('Invalid start_date and end_date');
            return next(createError(400));
        }

        if (money_type && (money_type !== '1' && money_type !== '2')) {
            logging.warning('Invalid money_type');
            return next(createError(400, "Money type must be 1 (VND) or 2 (USD)"));
        }

        // FORMAT query to string
        if (typeof q !== 'string') {
            logging.warning('Invalid search keyword');
            return next(createError(400));
        }

        q = q.trim();
        q = q.toLocaleLowerCase();
        q = q.replace(/[^a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂ ưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/g, ' ');

        if (page && !Number.isInteger(parseInt(page as string))) {
            logging.warning('Invalid page');
            return next(createError(400));
        }

        // GET BOOKMARKS
        // CHECK AUTHORIZE OR NOT?
        let posts;
        if (req.headers.authorization) {
            const headerAuthorization = req.headers.authorization;
            if (!headerAuthorization) {
                logging.warning("search: Invalid header authorization");
                return next(createError(401));
            }
            // GET ACCESS TOKEN
            const accessToken = headerAuthorization.split("Bearer")[1]
                ? headerAuthorization.split("Bearer")[1].toString().trim()
                : null;

            if (!accessToken) {
                logging.warning("Invalid access token");
                return next(createError(401));
            }

            // VERIFY ACCESS TOKEN
            jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET,
                async function (err, payload: Payload) {
                    if (err) {
                        // EXPIRED ERROR
                        if (err.name === "TokenExpiredError") {
                            logging.error("Token expired");
                            return next(createError(403));
                        }

                        // OTHER ERROR
                        logging.error(err.message);
                        return next(createError(401));
                    }

                    // VERIFY SUCCESS
                    const accountId = payload.id;

                    // GET BOOKMARKS OF ACCOUNT
                    //GET DATA
                    posts =
                        await searchService.searchByQuery(
                            q as string,
                            parseInt(page as string) || 1,
                            districtIds,
                            categoryIds,
                            salaryMin,
                            salaryMax,
                            salaryType,
                            isWorkingWeekend,
                            isRemotely,
                            startDate,
                            endDate,
                            money_type ? +money_type : null,
                            accountId,
                        );
                    if (!posts || posts.length === 0) {
                        return res.status(200).json({
                            success: true,
                            data: {
                                posts: [],
                                total: 0,
                                is_over: true,
                            },
                        });
                    }

                    posts.total = parseInt(posts[0]?.total) || 0;

                    posts.map((item: any) => {
                        delete item.total;
                        item.start_date = +item.start_date || null;
                        item.end_date = +item.end_date || null;
                        item.start_time = +item.start_time || null;
                        item.end_time = +item.end_time || null;
                        item.created_at = new Date(item.created_at).getTime();
                        item.bookmarked = item.bookmark_post_id ? true : false;
                        item.money_type_text = MoneyType[item.money_type];
                        item.money_type = +item.money_type;
                    })

                    await Promise.all(posts.map(async (element) => {
                        if (element.image === null) {
                            const firstParentCategoryImage =
                                await readDefaultPostImageByPostId(
                                    element.id
                                );
                            if (!firstParentCategoryImage) {
                                element.image = null;
                            } else {
                                element.image = firstParentCategoryImage.image;
                            }
                        } else {
                            element.image = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/` + element.image;
                        }
                    }));

                    let isOver = false;
                    if (posts.length < 20) {
                        isOver = true;
                    }

                    // SUCCESS
                    return res.status(200).json({
                        success: true,
                        message: "Search successfully",
                        data: {
                            total: posts.total,
                            posts,
                            is_over: isOver,
                        },
                    });
                }
            );
        } else {
            // SUCCESS
            //GET DATA

            posts = await searchService.searchByQuery(
                q as string,
                parseInt(page as string) || 1,
                districtIds,
                categoryIds,
                salaryMin,
                salaryMax,
                salaryType,
                isWorkingWeekend,
                isRemotely,
                startDate,
                endDate,
                money_type ? +money_type : null,
                null,
            );
            // console.log(posts);
            if (!posts || posts.length === 0) {
                return res.status(200).json({
                    success: true,
                    data: {
                        posts: [],
                        total: 0,
                        is_over: true,
                    },
                });
            }
            posts.total = parseInt(posts[0]?.total) || 0;

            // for (let i = 0; i < posts.length; i++) {
            //     delete posts[i].total;
            // }

            posts.map((item: any) => {
                delete item.total;
                item.start_date = +item.start_date || null;
                item.end_date = +item.end_date || null;
                item.start_time = +item.start_time || null;
                item.end_time = +item.end_time || null;
                item.created_at = new Date(item.created_at).getTime();
                item.money_type_text = MoneyType[item.money_type];
                item.money_type = +item.money_type;
            })

            await Promise.all(posts.map(async (element) => {
                if (element.image === null) {
                    const firstParentCategoryImage =
                        await readDefaultPostImageByPostId(
                            element.id
                        );
                    if (!firstParentCategoryImage) {
                        element.image = null;
                    } else {
                        element.image = firstParentCategoryImage.image;
                    }
                } else {
                    element.image = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/` + element.image;
                }
            }));

            let isOver = false;
            if (posts.length < 20) {
                isOver = true;
            }

            // SUCCESS
            return res.status(200).json({
                success: true,
                message: "Search successfully",
                data: {
                    total: posts.total,
                    posts,
                    is_over: isOver,
                },
            });
        }

    } catch (error) {
        logging.error('Search controller has error: ', error);
        return next(createError(500));
    }

    // Path: src/controllers/search/controller.search.ts
};

export default searchByQueryController;