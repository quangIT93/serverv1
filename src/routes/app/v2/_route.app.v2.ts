import { Router } from "express";
import searchByQueryV2Controller from "../../../controllers/search/v2/controller.search.byQuery";
import checkAccessToken from "../../../middlewares/middleware.checkAccessToken";

const routeV2 = Router();

routeV2.use(
    "/search",
    checkAccessToken,
    searchByQueryV2Controller
);

export default routeV2;