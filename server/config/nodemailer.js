import nodemailer from "nodemailer";

// ==============================
// TRANSPORTER CONFIG
// ==============================

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // important for port 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// ==============================
// SEND EMAIL FUNCTION
// ==============================

const sendEmail = async (to, subject, body) => {
    try {
        if (!to || !subject || !body) {
            throw new Error("Missing email parameters");
        }

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to,
            subject,
            html: body,
        };

        await transporter.sendMail(mailOptions);

        console.log("✅ Email sent successfully to:", to);
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
    }
};

export default sendEmail;