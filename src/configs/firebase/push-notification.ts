import * as admin from "firebase-admin";
import readFcmTokenService from "../../services/fcm-token/service.fcm-token.readByAccountId";
import serviceAccount from "../../keys/serviceAccountKey.json";
import logging from "../../utils/logging";

interface TokenResult {
    token: string;
    account_id: string;
    created_at: string;
}
const initializeApp = () => {
    return admin.initializeApp({
        credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount
            ),
        }) as admin.app.App | null;
    };
let app = initializeApp();
    
    
    const pushNotification = async (
        accountId: string,
    title: string,
    body: string,
    imageUrl: string,
    data: any,
) => {

    const res = await readFcmTokenService(accountId);


    if (!app) {
        app = initializeApp();
    }

    if (!(res[0] !== undefined) || !(res[0] !== null) || !res[0]) {
        return;
    }

    const tokens = res.map((item: TokenResult) => item.token);

    await app.messaging().sendMulticast({
        tokens: tokens,
        notification: {
            title: title || "",
            body: body || "",
        },
        data: {
            ...data,
        },
    }).then(() => {
        console.log("Firebase-notification: Successfully sent message.",);
    }).catch((error) => {
        console.log("Firebase-notification: Error sending message.", error);
    });
    return;

}

export default pushNotification;