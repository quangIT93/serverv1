import logging from "../utils/logging";
const nodemailer = require("nodemailer");

const nodeMailerTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD
    }
});

const sendEmailToUser = (options: any, callback: Function = () => { }) => {
    logging.info("Send OTP start ...")

    const mailOptions = {
        from: process.env.NODE_MAILER_EMAIL,
        ...options
    };

    nodeMailerTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logging.error("OTP sent to email failed");
            console.log(error)
            callback(false);
        } else {
            logging.info("OTP sent to email");
            callback(true);
        }
    });
};



export { sendEmailToUser, nodeMailerTransporter};