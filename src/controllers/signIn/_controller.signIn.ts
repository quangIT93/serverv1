import verifyPhoneNumberOtpController from "./controller.signIn.verifyPhoneNumber";
import signInWithEmailController from "./controller.signIn.email";
import verifyEmailOtpController from "./controller.signIn.verifyEmailOtp";
import resendEmailController from "./controller.signIn.resendEmail";
import signInWithPhoneController from "./controller.signIn.phone";
import signInWithGoogleController from "./controller.signIn.google";
import resendPhoneOTPController from "./controller.signIn.resendPhone";
import signInWithFacebook from "./controller.signIn.facebook";
import adminSignInController from "./controller.signIn.admin";
import signInWithAppleIdController from "./controller.signIn.apple";

const signInController = {
    signInWithEmail: signInWithEmailController,
    signInWithFacebook: signInWithFacebook,
    signInWithGoogle: signInWithGoogleController,
    signInWithPhone: signInWithPhoneController,
    signInWithAppleId: signInWithAppleIdController,
    resendEmail: resendEmailController,
    resendPhoneOTP: resendPhoneOTPController,
    verifyPhoneOtp: verifyPhoneNumberOtpController,
    verifyEmailOtp: verifyEmailOtpController,
    adminSignIn: adminSignInController,
};

export default signInController;
