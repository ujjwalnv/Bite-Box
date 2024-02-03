import nodemailer from "nodemailer";
import {
  EMAIL_PASSWORD,
  EMAIL_SERVICE,
  EMAIL_USERNAME,
  SENDER_EMAIL_ADDRESS,
  WEBSITE_URL,
} from "../constants/env_constants.js";

const sendVerificationEmail = async (email, subject, jwt_token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      secure: true,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: SENDER_EMAIL_ADDRESS,
      to: email,
      subject: subject,
      text:`Hello! You recently signed up for an account with Bite Box. Please follow the link below to verify your email\n\n${WEBSITE_URL}/verify/${jwt_token}`,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

export { sendVerificationEmail };
