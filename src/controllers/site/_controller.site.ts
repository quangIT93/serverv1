import signOutController from "./controller.site.signOut";
import adminSignOutController from "./controller.site.adminSignOut";
import adminSignUpController from "./controller.site.adminSignUp";
import resetAccessTokenController from "./controller.site.resetAccessToken";
import readAllSalaryTypesController from "./controller.site.readAllSalaryTypes";
import readAllJobTypesController from "./controller.site.readAllJobTypes";
import readAllCompanyResourceController from "./controller.site.readAllCompanyResource";

const siteController = {
    signOut: signOutController,
    adminSignOut: adminSignOutController,
    adminSignUp: adminSignUpController,
    resetAccessToken: resetAccessTokenController,
    readAllSalaryTypes: readAllSalaryTypesController,
    readAllJobTypes: readAllJobTypesController,
    readAllCompanyResource: readAllCompanyResourceController,
};

export default siteController;
