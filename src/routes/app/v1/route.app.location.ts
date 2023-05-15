import express from "express";
import locationController from "../../../controllers/location/_controller.location";

const router = express.Router();

router.get("/p", locationController.readAllProvinces);
router.get("/d", locationController.readDistrictsByProvince);
router.get("/", locationController.readAllLocations);

export default router;
