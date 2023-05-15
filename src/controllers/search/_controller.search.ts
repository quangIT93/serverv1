import searchByQueryController from "./controller.search.byQuery";
import filterController from "./controller.search.filter";
import searchByQueryV2Controller from "./v2/controller.search.byQuery";

const searchController = {
    search: searchByQueryController,
    filter: filterController,
    
};

export default searchController;