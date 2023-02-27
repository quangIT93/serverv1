import express from "express";
import accountController from "../../controllers/account/_controller.account";
import verifyAccessToken from "../../middlewares/middleware.verifyAccessToken";

const router = express.Router();

router.get("/today", verifyAccessToken, accountController.readTodayAccounts);
router.get("/", accountController.readAccounts);

export default router;
