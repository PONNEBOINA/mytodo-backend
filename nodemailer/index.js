
const nodeMailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  try {
    const transporter = await nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response); // <--- Add this
  } catch (err) {
    console.error("❌ Email sending failed:", err); // <--- Add this
  }
};

module.exports = sendMail;
