import logging from "../utils/logging";
import client from "twilio";

class Transport {
  // ...
  sendOTPToPhoneNumber(phoneNumber: string, message: string, callback: Function = () => {}) {
    // ...
    logging.info("OTP sent to phone number");

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    client(accountSid, authToken).messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
        }).then((message) => {
            logging.info(message.sid);
        }).catch((error) => {
            logging.error(error);
        }).finally(() => {
            callback();
        });
    
  }

  mailSender() {
    // ...
  }
}

export default Transport;