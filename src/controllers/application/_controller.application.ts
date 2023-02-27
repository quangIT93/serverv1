import createApplicationController from "./controller.application.create";
import deleteApplicationController from "./controller.application.delete";
import updateLikeStatusApplicationController from "./controller.application.like";
import updateApplicationController from "./controller.application.update";

const applicationController = {
    createApplication: createApplicationController,
    updateApplication: updateApplicationController,
    deleteApplication: deleteApplicationController,
    updateLikeStatus: updateLikeStatusApplicationController,
}

export default applicationController;