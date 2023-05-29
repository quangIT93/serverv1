import createError from 'http-errors';
import { Request, Response, NextFunction } from "express";
import logging from '../../utils/logging';
import readStatusAndAccountIdById from '../../services/post/service.post.readStatusAndAccountIdById';
import readProfileByIdService from '../../services/profile/service.profile.readById';
import applicationService from '../../services/application/_service.application'; 
import * as notificationService from '../../services/notification/_service.notification';
import copyFileService from '../../services/aws/service.aws.copyFile';
import ProfilesBucket from '../../models/enum/profileBucket.enum';
import ImageBucket from '../../models/enum/imageBucket.enum';
import createNewNotificationForApplication from '../notification/createNotificationContent/application/createForApplication.test';
import pushNotificationV2 from '../../services/pushNotification/push';
import { NotificationContent, createNotificationContent } from '../notification/createNotificationContent/application/createForApplication';
import pushNotification from '../../configs/transport/notification/push-notification';
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
        
        // STARTING COPY FILE FROM CV FOLDER TO APPLICATION FOLDER
        // COPY CV FILE
        if (userProfile.cv_url) {
            const copySource = `${process.env.AWS_BUCKET_PREFIX_URL}/${ProfilesBucket.CV_BUCKET}/${accountId}/${userProfile.cv_url}`;
            const key = `${ProfilesBucket.APPLICATION_BUCKET}/${applicationIdNumber}/${userProfile.cv_url}`;
            const isSuccessful = copyFileService(
                copySource,
                key,
            )
            if (!isSuccessful) {
                return next(createError(500, "Copy cv file failed"));
            }
        }

        // COPY AVATAR FILE
        if (userProfile.avatar) {
            const copySource = `${process.env.AWS_BUCKET_PREFIX_URL}/${ImageBucket.AVATAR_IMAGES}/${userProfile.avatar}`;
            const key = `${ProfilesBucket.APPLICATION_BUCKET}/${accountId}/${applicationIdNumber}/${userProfile.avatar}`;
            const isSuccessful = copyFileService(
                copySource,
                key,
            )
            if (!isSuccessful) {
                return next(createError(500, "Copy avatar file failed"));
            }
        }
        // CREATE APPLICATION EXPERIENCES
        const applicationExperiences = await applicationService.create.createApplicationExperiences(applicationIdNumber, accountId);

        if (!applicationExperiences) {
            applicationService.delete.deleteById(applicationIdNumber);
            return next(createError(500, "Create application experiences failed"));
        }

        // CREATE APPLICATION EDUCATIONS
        const applicationEducations = await applicationService.create.createApplicationEducations(applicationIdNumber, accountId);

        if (!applicationEducations) {
            applicationService.delete.deleteById(applicationIdNumber);
            return next(createError(500, "Create application educations failed"));
        }

        // CREATE APPLICATION CATEGORY
        const applicationCategory = await applicationService.create.createApplicationCategories(applicationIdNumber, accountId);

        if (!applicationCategory) {
            applicationService.delete.deleteById(applicationIdNumber);
            return next(createError(500, "Create application category failed"));
        }

        // CREATE APPLICATION LOCATIONS
        const applicationLocations = await applicationService.create.createApplicationLocations(applicationIdNumber, accountId);

        if (!applicationLocations) {    
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

        //for push notification

        const body = createNewNotificationForApplication(
            {
                applicationId: applicationIdNumber,
                postId: +postId,
                type: 1,
                applicationStatus: 0,
                postTitle: postStatusAndAccountId.title,
                companyName: postStatusAndAccountId.company_name,
                name: userProfile.name,
                notificationId: insertId,
                lang: req.query.lang.toString(),
                isRead: false
            }
        )

        pushNotificationV2(
            postStatusAndAccountId.account_id,
            body
        );

        // const content: NotificationContent = {
        //     application_id: applicationIdNumber,
        //     post_id: +postId,
        //     type: 1,
        //     applicationStatus: 0,
        //     postTitle: postStatusAndAccountId.title,
        //     companyName: postStatusAndAccountId.company_name,
        //     name: userProfile.name,
        //     notificationId: insertId
        // }

        // const notificationContent = createNotificationContent(
        //     req.query.lang.toString(),
        //     content
        // );

        // pushNotification(
        //     postStatusAndAccountId.account_id,
        //     notificationContent.title,
        //     notificationContent.body_push,
        //     // "",
        //     notificationContent.data
        // );

        return;
    } catch (error) {
        logging.error(error);
        
        next(createError(500, 'Internal server error'));
    }
    
}

export default createApplicationController;