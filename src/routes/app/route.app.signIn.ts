import express from "express";
import signInController from "../../controllers/signIn/_controller.signIn";
import signInMiddleware from "../../middlewares/signIn/_middleware.signIn";

const router = express.Router();

router.post(
    "/email",
    signInMiddleware.checkSignInWithEmailRequest,
    signInController.signInWithEmail
);
router.post("/email/verify", signInController.verifyEmailOtp);
router.post("/email/resend", signInController.resendEmail);

router.post(
    "/phone",
    signInMiddleware.checkSignInWithPhoneRequest,
    signInController.signInWithPhone
);
router.post("/phone/verify", signInController.verifyPhoneOtp);
router.post(
    "/phone/resend",
    signInMiddleware.checkSignInWithPhoneRequest,
    signInController.resendPhoneOTP
);
router.post("/google", signInController.signInWithGoogle);

router.post("/facebook", signInController.signInWithFacebook);

router.post("/apple", signInController.signInWithAppleId);

router.post("/admin", signInController.adminSignIn);

export default router;
