import signOutController from "./controller.site.signOut";
import adminSignOutController from "./controller.site.adminSignOut";
import adminSignUpController from "./controller.site.adminSignUp";
import resetAccessTokenController from "./controller.site.resetAccessToken";
import readAllSalaryTypesController from "./controller.site.readAllSalaryTypes";

const siteController = {
    signOut: signOutController,
    adminSignOut: adminSignOutController,
    adminSignUp: adminSignUpController,
    resetAccessToken: resetAccessTokenController,
    readAllSalaryTypes: readAllSalaryTypesController,
};

export default siteController;
