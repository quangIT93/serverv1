import * as admin from "firebase-admin";

const pushNotification = async (
    accountId: string,
    title: string,
    body: string,
    imageUrl: string
) => {

    const token = [];

    // Get all tokens of account_id from the database
    

    await admin.messaging().sendMulticast({
        tokens: token,
        notification: {
            title: "Weather Warning!",
            body: "A new weather warning has been issued for your location.",
            imageUrl: "https://my-cdn.com/extreme-weather.png",
        },
    });
}

export default pushNotification;