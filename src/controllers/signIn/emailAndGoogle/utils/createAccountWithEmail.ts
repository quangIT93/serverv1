import { v4 as uuidv4 } from "uuid";
import readAccountByEmailService from "../../../../services/account/service.account.readByEmail";
import createAccountWithEmailService from "../../../../services/account/service.account.createWithEmail";

const createAccountWithEmail = async (
    { 
        email,
        ggId = "",
        role = 0,
    } : {
        email: string,
        ggId?: string,
        role?: number,
    }
) => {

    // start create account

    let accountId: string;

    // check account was existed by email
    const account = await readAccountByEmailService(email);

    if (!account) {
        // create new account
        accountId = uuidv4(); // generate new accountId`        

        const isCreateAccountSuccess = await createAccountWithEmailService(accountId, email, ggId, role);

        if (!isCreateAccountSuccess) {
            return null;
        }
    }
    else {
        accountId = account.id;
    }

    return {
        accountId: accountId,
        role: role,
    };
}

export default createAccountWithEmail;