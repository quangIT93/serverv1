import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import logging from '../../utils/logging';
import * as searchService from '../../services/search/_service.search';

const filterController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { district_ids } = req.query;
        const { category_ids } = req.query;
        const { salary_min } = req.query;
        const { salary_max } = req.query;
        const { salary_type } = req.query;
        const { is_working_weekend } = req.query;
        // 
        const { start_time } = req.query;
        const { end_time } = req.query;
        const { start_date } = req.query;
        const { end_date } = req.query;
        const { page } = req.query;


        // VALIDATION
        // DISTRICT IDS
        const districtIds: number[] = []
        if (district_ids) {
            if (Array.isArray(district_ids)) {
                for (let i = 0; i < district_ids.length; i++) {
                    if (Number.isInteger(parseInt(district_ids[i] as string))) {
                        districtIds.push(parseInt(district_ids[i] as string));
                    } else {
                        logging.warning('Invalid district_ids');
                        return next(createError(400, 'Invalid district_ids'));
                    }
                }
            } else {

                const temp = district_ids.toString().trim().split(',');
                for (let i = 0; i < temp.length; i++) {
                    if (Number.isInteger(parseInt(temp[i]))) {
                        districtIds.push(parseInt(temp[i]));
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
                const temp = category_ids.toString().trim().split(',');
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

        // SALARY TYPE
        if (salary_min && !salary_type) {
            logging.warning('Invalid salary_type');
            return next(createError(400, 'salary_type is required when salary_min or salary_max is provided'));
        }

        if (salary_max && !salary_type) {
            logging.warning('Invalid salary_type');
            return next(createError(400, 'salary_type is required when salary_min or salary_max is provided'));
        }
        
        let salaryType: number | null = null;
        if (salary_type && !Number.isInteger(parseInt(salary_type as string))) {
            logging.warning('Invalid salary_type');
            return next(createError(400));
        } else {
            salaryType = salary_type ? parseInt(salary_type as string) : null;
        }

        // IS WORKING WEEKEND
        let isWorkingWeekend: number | null = null;
        if (is_working_weekend && !Number.isInteger(parseInt(is_working_weekend as string))) {
            logging.warning('Invalid is_working_weekend');
            return next(createError(400));
        } else {
            isWorkingWeekend = is_working_weekend ? parseInt(is_working_weekend as string) : null;
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
        // START TIME
        let startTime: number | null = null;
        if (start_time && !Number.isInteger(parseInt(start_time as string))) {
            logging.warning('Invalid start_time');
            return next(createError(400));
        } else {
            startTime = start_time ? parseInt(start_time as string) : null;
        }

        // END TIME
        let endTime: number | null = null;
        if (end_time && !Number.isInteger(parseInt(end_time as string))) {
            logging.warning('Invalid end_time');
            return next(createError(400));
        } else {
            endTime = end_time ? parseInt(end_time as string) : null;
        }

        //PAGE
        let pageNumber: number | null = null;
        if (page && !Number.isInteger(parseInt(page as string))) {
            logging.warning('Invalid page');
            return next(createError(400));
        } else {
            pageNumber = page ? parseInt(page as string) : null;
        }

        // FILTER
        const filterResult = await searchService.filterService(
            districtIds,
            categoryIds,
            salaryMin,
            salaryMax,
            salaryType,
            isWorkingWeekend,
            startDate,
            endDate,
            startTime,
            endTime,
            pageNumber,
        );
        // console.log('filterResult: ', filterResult);
        
        filterResult.total = parseInt(filterResult[0]?.total) || 0;

        for (let i = 0; i < filterResult.length; i++) {
            delete filterResult[i].total;
        }

        let isOver = false;
        if (filterResult.length < 20) {
            isOver = true;
        }

        res.status(200).json({
            code: 200,
            message: 'Filter successfully',
            success: true,
            data: {
                is_over: isOver,
                total: filterResult.total,
                posts: filterResult
            }
        });

    } catch (error) {
        logging.error('Filter controller has error: ', error);
        return next(createError(500));
    }
};

export default filterController;