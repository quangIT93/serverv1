import deleteAccountControllerById from "./controller.account.deleteAccountById";
import readAccountsController from "./controller.account.readAccounts";
import readTodayAccountsController from "./controller.account.readTodayAccounts";

const accountController = {
    readAccounts: readAccountsController,
    readTodayAccounts: readTodayAccountsController,
    deleteAccount: deleteAccountControllerById,
};

export default accountController;
