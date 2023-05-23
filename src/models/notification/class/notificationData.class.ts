import { INotificationData } from "../interface/notification.interface";

export class NotificationData implements INotificationData {
    [key: string]: any;

    constructor(data: INotificationData) {
        for (const key in data) {
            this[key] = data[key];
        }
    }

    // to key: string value
    /*
    {a: 1, b: 2, c: 3} => {"a": "1", "b": "2", "c": "3"}
    */
    public static toKeyValue(data: NotificationData) {
        const result: any = {};
        for (const key in data) {
            result[key] = data[key].toString();
        }
        return result;
    }

    // to json
    // static fromJson(data: INotificationData): NotificationData {
    //     return new NotificationData(data);
    // }

    // to json
}
