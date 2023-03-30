const {
  enviarEmailSendgrid,
} = require('../../../../../../../commons/sendgrid-mail/interface-sendgrid-mail');
const {
  httpResponseType,
} = require('../../../../../../../commons/http-response/interface-commons-http-response');
const { sendEmail } = require('./send-mail');

const enviarEmail = sendEmail({
  enviarEmailSendgrid,
  httpResponseType,
});

const interfaceSendMail = Object.freeze({
  enviarEmail,
});

module.exports = interfaceSendMail;
