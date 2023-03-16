import * as admin from "firebase-admin";
import readFcmTokenService from "../../services/fcm-token/service.fcm-token.readByAccountId";
import serviceAccount from "../../keys/serviceAccountKey.json";
import logging from "../../utils/logging";

interface TokenResult {
    token: string;
    account_id: string;
    created_at: string;
}

interface NotificationData {
    type: number;
    type_text: string;
    id: number;
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
    data: NotificationData,
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
            "type": data.type.toString(),
            "type_text": data.type_text,
            "id": data.id.toString(),
        }
    }).then(() => {
        console.log("Firebase-notification: Successfully sent message.",);
    }).catch((error) => {
        console.log("Firebase-notification: Error sending message.", error);
    });
    return;

}

export default pushNotification;