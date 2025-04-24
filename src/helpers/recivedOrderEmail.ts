import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  date: Date | string;
  type: string;
}

//Function to send an email to the client when the admin has recived the order
const recivedOrderEmail = async (data: EmailData): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  } as nodemailer.TransportOptions);

  const { name, email, date, type } = data;

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"AngRod Designs" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `${type} Recived Request Notification`,
    text: `${type} request has been recived.`,
    html: `<p>Hello, ${name}</p>
        <p>A new ${type} request has been recived by ${name} (${email}) at ${date}.</p>
        <p>We will be contacting with you as soon as possible</p>
        `,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => console.log('Message sent:', info.messageId))
    .catch((error) => console.error('Error sending email:', error));
};

export default recivedOrderEmail;
