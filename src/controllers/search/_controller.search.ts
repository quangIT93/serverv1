import searchByQueryController from "./controller.search.byQuery";
import filterController from "./controller.search.filter";
import readHistorySearchByAccountIdController from "./controller.search.readHistorySearch";
import readSuggestedListSearchController from "./controller.search.readSuggestList";

const searchController = {
    search: searchByQueryController,
    filter: filterController,
    readHistorySearch: readHistorySearchByAccountIdController,
    readSuggestedListSearch: readSuggestedListSearchController
};

export default searchController;