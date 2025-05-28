const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g. "smtp.gmail.com"
  port: process.env.SMTP_PORT, // e.g. 465 for SSL, 587 for TLS
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your SMTP username
    pass: process.env.SMTP_PASS, // your SMTP password
  },
});

async function sendResetEmail(email, resetLink) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM, // e.g. '"ZenVault" <no-reply@zenvault.com>'
    to: email,
    subject: "Password Reset for ZenVault",
    text: `Click the following link to reset your password: ${resetLink}`,
    html: `<p>Click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  });
}

async function sendVerificationEmail(email, verificationLink) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your email for ZenVault",
    text: `Click the following link to verify your email: ${verificationLink}`,
    html: `<p>Click the following link to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`,
  });
}

module.exports = { sendResetEmail, sendVerificationEmail };
