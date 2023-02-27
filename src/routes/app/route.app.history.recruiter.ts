import { Router } from "express";
import historyRecruiterController from "../../controllers/history/recruiter/_controller.history.recruiter";
import verifyAccessToken from "../../middlewares/middleware.verifyAccessToken";

const router = Router();

// recruiter
router.get(
    "/applications",
    verifyAccessToken,
    historyRecruiterController.readQuantityApplicationsOfAllPosts
); // read all post and quantity of applications

router.get(
    "/posts",
    verifyAccessToken,
    historyRecruiterController.readAllPostedJobs
); // read all posted jobs

// router.get(
//     "/applications/accepted",
//     verifyAccessToken,
//     historyRecruiterController.readAcceptedApplicationsByRecruiterId
// ); // read all accepted applications

router.get(
    "/:post_id/applications",
    verifyAccessToken,
    historyRecruiterController.readApplicationByPostId
); // read all applications by post id

router.get(
    "/:post_id/applications/:application_id",
    verifyAccessToken,
    historyRecruiterController.readApplicationsByApplicationId
); // read application by application id


// router.post(
//     "/applications/rate",
//     verifyAccessToken,
//     historyRecruiterController.createRateForApplicator
// ); // create rate for applicator
export default router;