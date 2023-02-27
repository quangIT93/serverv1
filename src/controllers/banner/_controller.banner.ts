import createBannerController from "./controller.banner.create";
import updateBannerController from "./controller.banner.update";
import updateBannersStatusController from "./controller.banner.updateBannersStatus";
import readEnabledBannersController from "./controller.banner.readEnabledBanners";
import readAllBannersController from "./controller.banner.readAllBanners";

const bannerController = {
    create: createBannerController,
    update: updateBannerController,
    updateBannersStatus: updateBannersStatusController,
    readAllBanners: readAllBannersController,
    readEnabledBanners: readEnabledBannersController,
};

export default bannerController;
