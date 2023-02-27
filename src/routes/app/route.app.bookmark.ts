import express from "express";
import bookmarkController from "../../controllers/bookmark/_controller.bookmark";
import verifyAccessToken from "../../middlewares/middleware.verifyAccessToken";

const router = express.Router();

router.post("/", verifyAccessToken, bookmarkController.create);
router.delete("/", verifyAccessToken, bookmarkController.delete);

export default router;
