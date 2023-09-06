import nodemailer from "nodemailer";

export async function sendMail(
  subject: string,
  toEmail: string,
  otpText: string
) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: otpText,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error.message);
    } else {
      return true;
    }
  });
}
