import express from "express";
import profileController from "../../controllers/profile/_controller.profile";
import verifyAccessTokenMiddleware from "../../middlewares/middleware.verifyAccessToken";
import { multerUploadImages } from "../../configs/multer";

const router = express.Router();
// READ
router.get("/s", verifyAccessTokenMiddleware, profileController.readById);

// UPDATE
router.put(
    "/per",
    verifyAccessTokenMiddleware,
    profileController.updatePersonalInformation
);
router.put(
    "/con",
    verifyAccessTokenMiddleware,
    profileController.updateContactInformation
);
router.put(
    "/cat",
    verifyAccessTokenMiddleware,
    profileController.updateCategories
);
router.put(
    "/loc",
    verifyAccessTokenMiddleware,
    profileController.updateLocations
);

router.put(
    "/edu/c",
    verifyAccessTokenMiddleware,
    profileController.createEducation
);
router.put(
    "/edu/u",
    verifyAccessTokenMiddleware,
    profileController.updateEducation
);
router.put(
    "/edu/d",
    verifyAccessTokenMiddleware,
    profileController.deleteEducation
);

router.put(
    "/exp/c",
    verifyAccessTokenMiddleware,
    profileController.createExperience
);
router.put(
    "/exp/u",
    verifyAccessTokenMiddleware,
    profileController.updateExperience
);
router.put(
    "/exp/d",
    verifyAccessTokenMiddleware,
    profileController.deleteExperience
);

router.put(
    "/cv/c",
    verifyAccessTokenMiddleware,
    // profileController.createCV
);

router.put(
    "/cv/u",
    verifyAccessTokenMiddleware,
    // profileController.updateCV
);

router.put(
    "/cv/d",
    verifyAccessTokenMiddleware,
    // profileController.deleteCV
);

router.put(
    "/avt",
    verifyAccessTokenMiddleware,
    multerUploadImages,
    profileController.updateAvatar
);

export default router;
