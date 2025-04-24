import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  phone?: string;
  type: string;
}

//Function to send an email to myself when an order has been submited
const emailRegister = async (data: EmailData): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  } as nodemailer.TransportOptions);

  const { name, email, phone, type } = data;

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"AngRod Designs" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `New ${type} Request Notification`,
    text: `A new ${type} request has been submitted.`,
    html: `<p>Hello,</p>
        <p>A new ${type} request has been submitted by ${name} (${email}) phone: ${phone ? phone : 'Undefined'}.</p>
        <p>You can review the request details on your dashboard: <a href="${process.env.DASHBOARD_URL}">Go to Dashboard</a></p>
        `,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => console.log('Message sent:', info.messageId))
    .catch((error) => console.error('Error sending email:', error));
};

export default emailRegister;
