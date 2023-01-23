const { activateAccount, recoverPassword, buyCourse } = require('../constants/emailsThemplates');
const nodemailer = require('nodemailer');

const sendEmailCode = async (code, to) => {
  const template = activateAccount(code);
  return await sendEmail(template, { subject: 'Código de activación', to });
};

const sendEmailRecoverPasswordCode = async (code, to) => {
  const template = recoverPassword(code);
  return await sendEmail(template, { subject: 'Código de recuperación', to });
};

const sendEmailWhenUserBuyCourse = async (course, to) => {
  const template = buyCourse(course);
  return await sendEmail(template, { subject: 'Compraron un curso', to });
};

const sendEmail = async (template, emailData) => {
  try {
    const { subject = 'Código de activación', to } = emailData;

    const transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      secure: true,
      tls: {
        ciphers: 'SSLv3',
      },
      requireTLS: true,
      port: 465,
      debug: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Be All Familiologos No Reply" <no-reply@beallfam.com>', // sender address
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

module.exports = { sendEmailCode, sendEmailRecoverPasswordCode, sendEmailWhenUserBuyCourse };
