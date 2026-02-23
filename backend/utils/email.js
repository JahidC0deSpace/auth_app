import nodemailer from "nodemailer";

// Use the credentials you already have
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use false for port 587
  auth: {
    user: "amely.konopelski80@ethereal.email",
    pass: "k64C8nadcM5KB83Mwb",
  },
});

/**
 * Function to send the OTP email
 * @param {string} email - Recipient email
 * @param {string} otp - The 6-digit code
 */
export const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: '"Dev Team" <amely.konopelski80@ethereal.email>',
    to: email,
    subject: "Your Verification Code",
    text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
    html: `<b>Your OTP is: ${otp}</b><p>It expires in 10 minutes.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    // IMPORTANT: Ethereal doesn't send to real inboxes.
    // You MUST click this link in your terminal to see the email.
    console.log("--------------------------");
    console.log("OTP Sent Successfully!");
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("--------------------------");

    return info;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};
