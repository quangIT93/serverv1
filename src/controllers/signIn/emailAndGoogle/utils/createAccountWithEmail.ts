import { v4 as uuidv4 } from "uuid";
import readAccountByEmailService from "../../../../services/account/service.account.readByEmail";
import createAccountWithEmailService from "../../../../services/account/service.account.createWithEmail";

import generateWelcomeMail from "../../../../html/mail/generateWelcomeMail";
import { sendEmailToUser } from "../../../../configs/transport/transport";

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
    try {

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
    
            sendEmailToUser({
                to: email,
                subject: "Chào mừng bạn đến với HiJob",
                html: generateWelcomeMail(email),
            })
        }
        else {
            accountId = account.id;
            role = account.role;
        }
    
        return {
            // user newly
            // isCandidate: account?.account_id ? true : false,
            // // isNew : account ? false : true,
            accountId: accountId,
            role: role,
        };
    } catch (error) {
        console.log("Create account with email has error: ", error);
        throw error;
    }
}

export default createAccountWithEmail;