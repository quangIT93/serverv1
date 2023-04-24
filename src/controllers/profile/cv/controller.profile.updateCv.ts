import { NextFunction, Request, Response } from "express";
import { multerUploadPdf } from "../../../configs/multer";
import createHttpError from "http-errors";
import uploadCVToS3Service from "../../../services/aws/service.aws.uploadCv";
import ProfilesBucket from "../../../enum/profileBucket.enum";
import updateCV from "../../../services/profile/service.profile.updateCv";
import logging from "../../../utils/logging";
import readProfileByIdService from "../../../services/profile/service.profile.readById";
import deleteCv from "../../../services/aws/service.aws.deleteCv";


const updateCVProfileController = async (req: Request, res: Response, next: NextFunction) => {
    logging.info("Update CV profile controller start ...");
    multerUploadPdf(req, res, async (err) => {
        if (err) {
            console.log(err);
            return next(createHttpError(400, err.message));
        }

        const { file } = req;
        const { id: userId } = req.user;

        if (!file) {
            return next(createHttpError(400, "CV is required"));
        }

        // const cvUrl = file.path;

        try {
            const isCVExist = await readProfileByIdService("vi", userId);

            if (!isCVExist.cv_url) {
                return next(createHttpError(400, "CV does not exist. Please create CV first"));
            }

            // upload cv to aws s3
            const isUploadCVSuccess = await uploadCVToS3Service(file, ProfilesBucket.CV_BUCKET, userId);
            if (!isUploadCVSuccess || isUploadCVSuccess.length === 0) {
                return next(createHttpError(500, "Upload CV to AWS S3 failed"));
            }

            // if success, update cv url to db
            const url = isUploadCVSuccess;
            const updatedCV = await updateCV(
                userId,
                url
            );

            // delete old cv in aws s3
            deleteCv(userId, isCVExist.cv_url)

            if (!updatedCV) {
                return next(createHttpError(500, "Update CV failed"));
            }

            return res.status(200).json(
                {
                    message: "Updated CV successfully",
                    data: {
                        cv: `${process.env.AWS_BUCKET_PREFIX_URL}/${ProfilesBucket.CV_BUCKET}/${userId}/${url}`,
                    },
                    status: 200,
                    success: true,
                }

            );
        }
        catch (err) {
            return next(err);
        }

    });
}

export default updateCVProfileController;