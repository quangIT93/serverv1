import express from "express";
import locationController from "../../../controllers/location/_controller.location";
import compression from "compression";

const router = express.Router();
router.use(compression());
router.get("/p", locationController.readAllProvinces);
router.get("/d", locationController.readDistrictsByProvince);
router.get("/", locationController.readAllLocations);
router.get("/w", compression(), locationController.readWardsByDistrict);

export default router;
