import readProfileByIdController from "./controller.profile.readById";
import updatePersonalInformationController from "./controller.profile.updatePersonalInformation";
import updateContactInformationController from "./controller.profile.updateContactInformation";
import updateCategoriesController from "./controller.profile.updateCategories";
import updateLocationsOfProfileController from "./controller.profile.updateLocations";
import createEducationController from "./controller.profile.createEducation";
import updateEducationController from "./controller.profile.updateEducation";
import deleteEducationController from "./controller.profile.deleteEducation";
import createExperienceController from "./controller.profile.createExperience";
import updateExperienceController from "./controller.profile.updateExperience";
import deleteExperienceController from "./controller.profile.deleteExperience";
import updateAvatarController from "./controller.profile.updateAvatar";

const profileController = {
    readById: readProfileByIdController,
    updatePersonalInformation: updatePersonalInformationController,
    updateContactInformation: updateContactInformationController,
    updateCategories: updateCategoriesController,
    updateLocations: updateLocationsOfProfileController,
    createEducation: createEducationController,
    updateEducation: updateEducationController,
    deleteEducation: deleteEducationController,
    createExperience: createExperienceController,
    updateExperience: updateExperienceController,
    deleteExperience: deleteExperienceController,
    updateAvatar: updateAvatarController,
};

export default profileController;
