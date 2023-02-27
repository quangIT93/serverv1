import express from "express";
import homeAdminController from "../../controllers/homeAdmin/_controller.homeAdmin";
import verifyAccessToken from "../../middlewares/middleware.verifyAccessToken";

const router = express.Router();

router.get("/count", verifyAccessToken, homeAdminController.counter);

export default router;
