import createError from 'http-errors';
import { Response, Request, NextFunction } from 'express';
import logging from '../../utils/logging';
import applicationService from '../../services/application/_service.application';
import * as notificationService from '../../services/notification/_service.notification';

const updateApplicationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: applicationId, status } = req.body;
        const { id: ownerId } = req.user;

        if (!status) {
            return next(createError(400, 'Missing status'));
        }

        if (status !== 2 && status !== 3 && status !== 4) {
            return next(createError(400, 'Invalid status, status must be 2, 3, 4 or 5'));
        }

        
        // CHECK IF APPLICATION EXISTS
        const postInformation = await applicationService.read.readPostInformationByApplicationById(+applicationId);
        
        if (!postInformation) {
            return next(createError(404, "Application not found"));
        }

        //CHECK VALID STATUS VALUE
        if (status == 4 && postInformation.status !== 2) {
            return next(createError(400, "Invalid status, this application was not approved"));
        }

        // CHECK IF USER IS OWNER OF JOB
        if (postInformation.ownerId !== ownerId && req.user.role !== 1) {
            return next(createError(406, "You are not allowed to access this resource"));
        }

        if (postInformation.status === status) {
            return res.status(200).json({
                code: 200,
                success: true,
                message: "Nothing to update",
            });
        }

        // UPDATE APPLICATION
        const isSuccessful = await applicationService.update.updateById(+applicationId, +status);

        if (!isSuccessful) {
            return next(createError(500, "Internal server error"));
        }

        //CREATE NOTIFICATION FOR APPLICANT
        notificationService.createNotificationService(
            postInformation.account_id,
            +applicationId,
            +status,
            0
        )

        // RETURN DATA
        return res.status(200).json({
            code: 200,
            success: true,
            message: "Update application successfully",
        });
    }
    catch (error) {
        logging.error(error);
        next(createError(500, "Internal server error"));
    }
};

export default updateApplicationController;