import searchByQueryController from "./controller.search.byQuery";
import filterController from "./controller.search.filter";

const searchController = {
    search: searchByQueryController,
    filter: filterController
};

export default searchController;