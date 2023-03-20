import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import { readProfileByIdService } from "../../services/profile/_service.profile";
import * as profileCategoryServices from "../../services/profileCategory/_service.profileCategory";
import * as profileLocationServices from "../../services/profileLocation/_service.profileLocation";
import * as profileEducationServices from "../../services/profileEducation/_service.profileEducation";
import * as profileExperienceServices from "../../services/profileExperience/_service.profileExperience";
import * as profileSocialServices from "../../services/profileSocial/_service.profileSocial";

const readProfileByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Read profile by id controller start ...");

        // GET PROFILE ID
        const id = req.query.id
            ? req.query.id.toString().trim()
            : req.user.id.toString().trim();

        logging.info("Profile id: ", id);
        if (!id) {
            logging.warning("Invalid profile id");
            return next(createError(400));
        }

        // GET PROFILE BY ID
        const profileData = await readProfileByIdService(id);
        if (!profileData) {
            logging.warning("Incorrect profile id");
            return next(createError(404));
        }

        profileData.address = {
            id: profileData.province_id,
            name: profileData.address,
        };

        profileData.birthday = +profileData.birthday;

        profileData.avatar = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/` + profileData.avatar;

        delete profileData.province_id;

        // GET CATEGORIES OF PROFILE
        const categories = await profileCategoryServices.readAllByProfileId(id);

        // GET LOCATIONS OF PROFILE
        const locations = await profileLocationServices.readAllByProfileId(id);

        // GET EDUCATIONS OF PROFILE
        const educations = await profileEducationServices.readAllByProfileId(
            id
        );
        const educationsModified = educations.map((education) => ({
            ...education,
            start_date: +education.start_date,
            end_date: +education.end_date,
        }));

        // GET EXPERIENCES OF PROFILE
        const experiences = await profileExperienceServices.readAllByProfileId(
            id
        );
        const experiencesModified = experiences.map((experience) => ({
            ...experience,
            start_date: +experience.start_date,
            end_date: +experience.end_date,
        }));

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: {
                ...profileData,
                categories,
                locations,
                educations: educationsModified,
                experiences: experiencesModified,
                // socialLinks,
            },
            message: "Successfully",
        });
    } catch (error) {
        logging.error("Read profile by id controller has error: ", error);
        return next(createError(500));
    }
};

export default readProfileByIdController;
