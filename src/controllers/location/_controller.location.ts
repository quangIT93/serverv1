import readAllProvinces from "./controller.location.readAllProvinces";
import readDistrictByProvince from "./controller.location.readDistrictsByProvince";
import readAllLocationsController from "./controller.location.readAll";

const locationController = {
    readAllProvinces: readAllProvinces,
    readDistrictsByProvince: readDistrictByProvince,
    readAllLocations: readAllLocationsController,
};

export default locationController;
