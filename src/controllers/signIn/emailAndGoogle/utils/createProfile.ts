import createProfileWithAccountIdService from "../../../../services/profile/service.profile.createWithAccountId";
import readProfileByIdService from "../../../../services/profile/service.profile.readById";

const createProfile = async (
    {
        accountId,
        email,
        name,
    }: 
    {
        accountId: string,
        email: string,
        name?: string,
    }
) => {
    // start create profile
    
    let profileId: string;

    // check profile was existed by accountId
    const profile = await readProfileByIdService("vi", accountId);

    if (!profile) {
        // create new profile
        const isCreateProfileSuccess = await createProfileWithAccountIdService(accountId, email, name);

        if (!isCreateProfileSuccess) {
            return null;
        }
    }
    else {
        profileId = profile.id;
    }

    return accountId;
}

export default createProfile;