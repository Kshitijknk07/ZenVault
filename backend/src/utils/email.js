const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === "465",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendVerificationEmail = async (email, token, username) => {
  try {
    const transporter = createTransporter();

    const verificationUrl = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/verify/${token}`;

    const mailOptions = {
      from: `"ZenVault" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to ZenVault - Verify Your Email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to ZenVault!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Secure Cloud Storage</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${username},</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Thank you for creating your ZenVault account! To get started and access your secure cloud storage, 
              please verify your email address by clicking the button below.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        display: inline-block; 
                        font-weight: bold;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            
            <p style="background: #e9ecef; padding: 15px; border-radius: 5px; word-break: break-all; color: #495057;">
              ${verificationUrl}
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              This verification link will expire in 24 hours. If you didn't create a ZenVault account, 
              you can safely ignore this email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
            
            <p style="color: #999; font-size: 14px; text-align: center;">
              © 2024 ZenVault. All rights reserved.
            </p>
          </div>
        </div>
      `,
      text: `
        Welcome to ZenVault!
        
        Hi ${username},
        
        Thank you for creating your ZenVault account! To get started and access your secure cloud storage, 
        please verify your email address by visiting the following link:
        
        ${verificationUrl}
        
        This verification link will expire in 24 hours. If you didn't create a ZenVault account, 
        you can safely ignore this email.
        
        Best regards,
        The ZenVault Team
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

const sendPasswordResetEmail = async (email, token, username) => {
  try {
    const transporter = createTransporter();

    const resetUrl = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/reset-password/${token}`;

    const mailOptions = {
      from: `"ZenVault" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "ZenVault - Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Password Reset</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">ZenVault Security</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${username},</h2>
            
            <p style="color: #666; line-height: 1.6;">
              We received a request to reset your ZenVault account password. If you made this request, 
              click the button below to create a new password.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        display: inline-block; 
                        font-weight: bold;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                Reset Password
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            
            <p style="background: #e9ecef; padding: 15px; border-radius: 5px; word-break: break-all; color: #495057;">
              ${resetUrl}
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              <strong>Important:</strong> This password reset link will expire in 1 hour for security reasons. 
              If you didn't request a password reset, you can safely ignore this email and your password will remain unchanged.
            </p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                <strong>Security Tip:</strong> Never share this link with anyone. ZenVault will never ask for your password via email.
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
            
            <p style="color: #999; font-size: 14px; text-align: center;">
              © 2024 ZenVault. All rights reserved.
            </p>
          </div>
        </div>
      `,
      text: `
        ZenVault Password Reset
        
        Hi ${username},
        
        We received a request to reset your ZenVault account password. If you made this request, 
        visit the following link to create a new password:
        
        ${resetUrl}
        
        Important: This password reset link will expire in 1 hour for security reasons. 
        If you didn't request a password reset, you can safely ignore this email and your password will remain unchanged.
        
        Security Tip: Never share this link with anyone. ZenVault will never ask for your password via email.
        
        Best regards,
        The ZenVault Team
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

const sendWelcomeEmail = async (email, username) => {
  try {
    const transporter = createTransporter();

    const dashboardUrl = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/dashboard`;

    const mailOptions = {
      from: `"ZenVault" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to ZenVault - Your Account is Verified!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🎉 Welcome to ZenVault!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your account is now verified</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${username},</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Great news! Your ZenVault account has been successfully verified. You now have full access to all features:
            </p>
            
            <ul style="color: #666; line-height: 1.8;">
              <li>🔒 Secure file storage with end-to-end encryption</li>
              <li>📁 Organize files in folders and subfolders</li>
              <li>🔄 Sync files across all your devices</li>
              <li>👥 Share files with team members</li>
              <li>⚡ Lightning-fast upload and download speeds</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${dashboardUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        display: inline-block; 
                        font-weight: bold;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                Go to Dashboard
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              If you have any questions or need help getting started, feel free to reach out to our support team.
            </p>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
            
            <p style="color: #999; font-size: 14px; text-align: center;">
              © 2024 ZenVault. All rights reserved.
            </p>
          </div>
        </div>
      `,
      text: `
        Welcome to ZenVault!
        
        Hi ${username},
        
        Great news! Your ZenVault account has been successfully verified. You now have full access to all features:
        
        • Secure file storage with end-to-end encryption
        • Organize files in folders and subfolders
        • Sync files across all your devices
        • Share files with team members
        • Lightning-fast upload and download speeds
        
        Get started by visiting your dashboard: ${dashboardUrl}
        
        If you have any questions or need help getting started, feel free to reach out to our support team.
        
        Best regards,
        The ZenVault Team
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};

const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ Email configuration is valid");
    return true;
  } catch (error) {
    console.error("❌ Email configuration is invalid:", error.message);
    return false;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
  testEmailConfig,
};
