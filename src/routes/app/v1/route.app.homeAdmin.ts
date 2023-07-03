import express from "express";
import getImageFromS3 from "../../../controllers/homeAdmin/handleImage/controller.getImageFromS3";
import homeAdminController from "../../../controllers/homeAdmin/_controller.homeAdmin";
import verifyAccessToken from "../../../middlewares/middleware.verifyAccessToken";

const router = express.Router();



export default router;
