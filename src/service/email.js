import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const sendEmail = async (to, name) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to,
      subject: "Welcome to app",
      html: `<h2>Hi, welcome ${name}! Thank you for registering.</h2>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return info; // Just return info, don't send HTTP response here
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
