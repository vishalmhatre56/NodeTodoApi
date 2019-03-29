const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email) => {
    sgMail.send({
        to: email,
        from: 'v.mhatre56@gmail.com',
        subject: 'Thanks for joining in!',
        text: 'Welcome to the Todo app. let me known how you get along with the app.'
    })
}

const sendCancellationEmail = (email) => {
    sgMail.send({
        to: email,
        from: 'v.mhatre56@gmail.com',
        subject: 'Sorry to see you go!',
        text: 'Goodbye, I hope to see you back sometime again.'
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}