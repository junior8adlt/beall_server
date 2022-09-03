const { activateAccount, recoverPassword } = require('../constants/emailsThemplates');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const sendEmailCode = async (code, to) => {
  const template = activateAccount(code);
  return await sendEmail(template, { subject: 'Código de activación', to });
};

const sendEmailRecoverPasswordCode = async (code, to) => {
  const template = recoverPassword(code);
  return await sendEmail(template, { subject: 'Código de recuperación', to });
};

const sendEmail = async (template, emailData) => {
  try {
    const { subject = 'Código de activación', to } = emailData;

    const oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground',
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const accessToken = new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) return console.log(err);
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        type: 'OAuth2',
        user: 'palomadltorre90@gmail.com', // generated ethereal user
        clientId: process.env.GOOGLE_CLIENT_ID,
        accessToken,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Be all  👻" <palomadltorre90@gmail.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      html: template, // html body
    });
    console.log(info, '-----------------------------------------------');
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return Boolean(info.accepted.length);
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = { sendEmailCode, sendEmailRecoverPasswordCode };
