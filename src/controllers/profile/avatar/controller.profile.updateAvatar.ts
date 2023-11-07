import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../../utils/logging";
import * as awsServices from "../../../services/aws/_service.aws";
import * as profileServices from "../../../services/profile/_service.profile";
import ImageBucket from "../../../models/enum/imageBucket.enum";
import axios from "axios";

const updateAvatar = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logging.info("Update avatar of profile controller start ...");

        // GET PROFILE ID
        const { id } = req.user;
        if (!id) {
            logging.warning("Invalid profile id");
            return next(createError(401));
        }

        return res.redirect(307, process.env.SERVER_VERSION_3 + `/profiles/me/avatar`);

        // UPLOAD IMAGES TO AWS
        // if (req.files && req.files.length as number > 0) {
        //     // const urlsUploaded = await awsServices.uploadImages(req.files, ImageBucket.AVATAR_IMAGES);
        //     // if (!urlsUploaded || urlsUploaded.length === 0) {
        //     //     return next(createError(500));
        //     // }

        //     // // UPDATE AVATAR OF PROFILE
        //     // const avatarUrl = urlsUploaded[0];
        //     // const isUpdateAvatarSuccess = await profileServices.updateAvatar(
        //     //     id,
        //     //     avatarUrl
        //     // );
        //     // if (!isUpdateAvatarSuccess) {
        //     //     return next(createError(500));
        //     // }

        //     // // SUCCESS
        //     // return res.status(200).json({
        //     //     code: 200,
        //     //     success: true,
        //     //     message: "Successfully",
        //     // });
        //     console.log("Redirect to update avatar v3");
        //     console.log("req.files", req.files);
        //     const formData = {
        //         "image": req.files
        //     }
        //     return await axios.put(process.env.SERVER_VERSION_3 + `/profiles/me/avatar`, formData, {
        //         headers: {
        //             "Content-Type": "multipart/form-data"
        //         }
        //     }).then((response) => {
        //         console.log("Response from server v3", response.data);
        //         return res.status(200).json({
        //             code: 200,
        //             success: true,
        //             message: "Successfully",
        //         });
        //     }
        //     ).catch((error) => {
        //         console.log("Error from server v3", error);
        //         return next(createError(500));      
        //     })
        // }
        // return next(createError(500));
    } catch (error) {
        logging.error("Update avatar of profile controller has error: ", error);
        return next(createError(500));
    }
};

export default updateAvatar;
