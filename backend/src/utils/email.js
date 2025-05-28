async function sendResetEmail(email, resetLink) {
  // In production, use nodemailer or a transactional email service
  console.log(`Send password reset link to ${email}: ${resetLink}`);
}

module.exports = { sendResetEmail };
