import express from "express";
import profileController from "../../../controllers/profile/_controller.profile";
import verifyAccessTokenMiddleware from "../../../middlewares/middleware.verifyAccessToken";
import { multerUploadImages, multerUploadPdf } from "../../../configs/multer";
import { createProxyMiddleware } from "http-proxy-middleware";

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
    // verifyAccessTokenMiddleware,
    // multerUploadImages,
    createProxyMiddleware({
        target: "http://localhost:8000",
        changeOrigin: false,
        pathRewrite: {
            [`^/api/v1/profiles/avt`]: `/api/v3/profiles/me/avatar`,
        },
        logProvider: () => {
            return {
                log: (message: string) => {
                    console.log(`[Proxy] ${message}`);
                },
                debug: (message: string) => {
                    console.debug(`[Proxy] ${message}`);
                },
                info: (message: string) => {
                    console.info(`[Proxy] ${message}`);
                },
                warn: (message: string) => {
                    console.warn(`[Proxy] ${message}`);
                },
                error: (message: string) => {
                    console.error(`[Proxy] ${message}`);
                },
            };
        },
        logLevel: "info",
    })
);

// CV upload
router.post(
    "/cv",
    verifyAccessTokenMiddleware,
    // multerUploadPdf,
    profileController.createCv
)

router.put(
    "/cv",
    verifyAccessTokenMiddleware,
    // multerUploadPdf,
    profileController.updateCv
)

router.delete(
    "/cv",
    verifyAccessTokenMiddleware,
    // multerUploadPdf,
    profileController.deleteCv
)

export default router;
