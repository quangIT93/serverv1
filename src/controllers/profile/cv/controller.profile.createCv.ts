import { NextFunction, Request, Response } from "express";
import { multerUploadPdf } from "../../../configs/multer";
import createHttpError from "http-errors";
import uploadCVToS3Service from "../../../services/aws/service.aws.uploadCv";
import ProfilesBucket from "../../../enum/profileBucket.enum";
import updateCV from "../../../services/profile/service.profile.updateCv";
import logging from "../../../utils/logging";
import readProfileByIdService from "../../../services/profile/service.profile.readById";


const createCVProfileController = async (req: Request, res: Response, next: NextFunction) => {
    logging.info("Create CV profile controller start ...");
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

            if (isCVExist.cv_url) {
                return next(createHttpError(400, "CV already exists"));
            }

            // upload cv to aws s3
            const isUploadCVSuccess = await uploadCVToS3Service(file, file.originalname, ProfilesBucket.CV_BUCKET, userId);
            if (!isUploadCVSuccess || isUploadCVSuccess.length === 0) {
                return next(createHttpError(500, "Upload CV to AWS S3 failed"));
            }

            // if success, update cv url to db
            const url = isUploadCVSuccess;
            const createdCV = await updateCV(
                userId,
                url
            );

            if (!createdCV) {
                return next(createHttpError(500, "Create CV failed"));
            }

            return res.status(201).json(
                {
                    message: "Created CV successfully",
                    data: {
                        cv: `${process.env.AWS_BUCKET_PREFIX_URL}/${ProfilesBucket.CV_BUCKET}/${userId}/${url}`,
                    },
                    status: 201,
                    success: true,
                }

            );
        }
        catch (err) {
            return next(err);
        }

    });
}

export default createCVProfileController;