import express from "express";
import chatController from "../../controllers/chat/_controller.chat";
import verifyAccessToken from "../../middlewares/middleware.verifyAccessToken";

const router = express.Router();

router.get("/users", verifyAccessToken, chatController.getUsersChated);
router.get("/messages", verifyAccessToken, chatController.getPostChats);
router.put("/status", verifyAccessToken, chatController.updateStatus);

export default router;
