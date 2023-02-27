import readAccountsController from "./controller.account.readAccounts";
import readTodayAccountsController from "./controller.account.readTodayAccounts";

const accountController = {
    readAccounts: readAccountsController,
    readTodayAccounts: readTodayAccountsController,
};

export default accountController;
