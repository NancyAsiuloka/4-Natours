const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // 1) Create a Transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
        // tls: {
        //     ciphers:'SSLv3'
        // }
    });

    // 2) Define the email options
    const mailOptions = {
        from: 'Asiuloka Nancy<mama@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    // 3) Send the email
    // console.log('Email Options:', options);
    await transporter.sendMail(mailOptions)
    .then(info => console.log('Email sent:', info))
    .catch(error => console.error('Error sending email:', error));
}

module.exports = sendEmail;
