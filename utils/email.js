const nodemailer = require('nodemailer');
const pug = require('pug');

// new Email(user, url).sendWelcome();
module.exports = class Email {
    constructor(user, url){
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url
        this.from = `Asiuloka Nancy<${process.env.EMAIL_FROM}>`;
    }

    createTransport(){
        if(process.env.NODE_ENV === 'production'){
            // sendgrid
            return 1;
        }
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    // send the actual email
    send(template, subject){
        // 1) Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`)

        // 2) Define the email options
        const mailOptions = {
            from: 'Asiuloka Nancy<mama@gmail.com>',
            to: options.email,
            subject: options.subject,
            text: options.message,
        }

        // 3) Create a transport and send email



    }

    sendWelcome(){
        this.send('welcome', 'Welcome to the Natours Family!')
    }
}

const sendEmail = async options => {

    // 2) Define the email options

    // 3) Send the email
    // console.log('Email Options:', options);
    await transporter.sendMail(mailOptions)
    .then(info => console.log('Email sent:', info))
    .catch(error => console.error('Error sending email:', error));
}

module.exports = sendEmail;
