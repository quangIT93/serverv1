import { NotificationTransporter } from "../../models/notification/class/notification.transporter.class";
import { INotification } from "../../models/notification/interface/notification.interface";

const pushNotification = async (account_id: string, body: INotification) => {
    try {
        const pusher = new NotificationTransporter();
        await pusher.initialize();
        await pusher.getFcmTokens(account_id);
        await pusher.send(body, account_id);
    }
    catch (error) {
        console.log(error, " NotificationTransporter");
        return;
    }
    
}

export default pushNotification;

