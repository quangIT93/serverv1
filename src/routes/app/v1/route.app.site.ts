import express from "express";
import siteController from "../../../controllers/site/_controller.site";

const router = express.Router();

router.get("/salary-types", siteController.readAllSalaryTypes);
router.get("/job-types", siteController.readAllJobTypes);
router.get("/companies", siteController.readAllCompanyResource);
router.post("/sign-out", siteController.signOut); // Admin role
router.post("/admin/sign-out", siteController.adminSignOut); // Admin role
router.post("/reset-access-token", siteController.resetAccessToken);
router.post("/admin/signup", siteController.adminSignUp);
router.get("/welcome-images", siteController.readAllWelcomeImages);
export default router;
