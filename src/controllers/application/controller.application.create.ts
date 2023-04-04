import createError from 'http-errors';
import { Request, Response, NextFunction } from "express";
import logging from '../../utils/logging';
import readStatusAndAccountIdById from '../../services/post/service.post.readStatusAndAccountIdById';
import readProfileByIdService from '../../services/profile/service.profile.readById';
import applicationService from '../../services/application/_service.application'; 
import * as notificationService from '../../services/notification/_service.notification';
import { createNotificationContent, NotificationContent } from '../notification/createNotificationContent/createForApplication';
import pushNotification from '../../configs/firebase/push-notification';
const createApplicationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // GET DATA
        const { postId } = req.body;
        
        const { id: accountId } = req.user;

        // REQUIRE DATA
        // BASIC INFORMATION 
        // BASIC CONTACT INFORMATION (PHONE NUMBER OR EMAIL)

        // CHECK POST STATUS
        const postStatusAndAccountId = await readStatusAndAccountIdById(+postId);

        if (!postStatusAndAccountId) {
            return next(createError(404, "Post not found"));
        }

        if (postStatusAndAccountId.status !== 1) {
            return next(createError(400, "Post is not available"));
        }

        if (postStatusAndAccountId.account_id === accountId) {
            return next(createError(400, "You can not apply for your own job"));
        }

        // CHECK INFORMATION OF USER BEFORE APPLY
        const userProfile = await readProfileByIdService("vi", accountId);


        if (!userProfile) {
            return next(createError(404, "User not found"));
        }


        if (!userProfile.phone_number && !userProfile.email) {
            return next(createError(400, "You must have phone number or email to apply"));
        }

        if (!userProfile.name || !userProfile.address || !userProfile.birthday || userProfile.gender === null || userProfile.gender === undefined || !userProfile.province_id) {
            return next(createError(400, `You must have full information to apply. Please update your profile`));
        }

        // CHECK IF ALREADY APPLIED 
        const application = await applicationService.read.readByPostIdAndAccountId(+postId, accountId);

        if (application) {
            return next(createError(400, "You have already applied for this job"));
        }

        // CREATE APPLICATION
        const applicationId = await applicationService.create.createApplication(accountId, +postId);

        if (!applicationId) {
            return next(createError(500, "Create application failed"));
        }

        // CONVERT FROM BIGINT TO NUMBER
        const applicationIdNumber = Number(applicationId.insertId);

        // CREATE APPLICATION EXPERIENCES
        const applicationExperiences = await applicationService.create.createApplicationExperiences(applicationIdNumber, accountId);

        if (!applicationExperiences) {
            applicationService.delete.deleteById(applicationIdNumber);
            return next(createError(500, "Create application experiences failed"));
        }

        // CREATE APPLICATION EDUCATIONS
        const applicationEducations = await applicationService.create.createApplicationEducations(applicationIdNumber, accountId);

        if (!applicationEducations) {
            await applicationService.delete.deleteExperiencesById(applicationIdNumber);
            applicationService.delete.deleteById(applicationIdNumber);
            return next(createError(500, "Create application educations failed"));
        }

        // CREATE APPLICATION CATEGORY
        const applicationCategory = await applicationService.create.createApplicationCategories(applicationIdNumber, accountId);

        if (!applicationCategory) {
            await applicationService.delete.deleteExperiencesById(applicationIdNumber);
            await applicationService.delete.deleteEducationsById(applicationIdNumber);
            applicationService.delete.deleteById(applicationIdNumber);
            return next(createError(500, "Create application category failed"));
        }

        // CREATE APPLICATION LOCATIONS
        const applicationLocations = await applicationService.create.createApplicationLocations(applicationIdNumber, accountId);

        if (!applicationLocations) {
            await applicationService.delete.deleteExperiencesById(applicationIdNumber);
            await applicationService.delete.deleteEducationsById(applicationIdNumber);
            await applicationService.delete.deleteCategoriesById(applicationIdNumber);
            applicationService.delete.deleteById(applicationIdNumber);
            return next(createError(500, "Create application locations failed"));
        }


        // CREATE NOTIFICATION FOR RECRUITER
        
        // RETURN DATA
        res.status(201).json({
            code: 201,
            success: true,
            message: "Create application successfully"
        });
        
        const insertId = await notificationService.createNotificationService(
            postStatusAndAccountId.account_id,
            applicationIdNumber,
            0,
            1
        );

        if (!insertId) {
            return;
        }

        const content: NotificationContent = {
            application_id: applicationIdNumber,
            post_id: +postId,
            type: 1,
            applicationStatus: 0,
            postTitle: postStatusAndAccountId.title,
            companyName: postStatusAndAccountId.company_name,
            name: userProfile.name,
            notificationId: insertId
        }

        const notificationContent = createNotificationContent(
            req.query.lang.toString(),
            content
        );

        pushNotification(
            postStatusAndAccountId.account_id,
            notificationContent.title,
            notificationContent.body,
            // "",
            notificationContent.data
        );

        return;
    } catch (error) {
        logging.error(error);
        
        next(createError(500, 'Internal server error'));
    }
    
}

export default createApplicationController;