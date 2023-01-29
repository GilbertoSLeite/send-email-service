// const { gettingSecretsOnAws } = require('../aws/interface-aws');
const { gettingSecretsOnAws } = require('../aws/interface-aws');
const { httpResponseType } = require('../http-response/interface-commons-http-response');
const sendMailSendgrid = require('./send-mail-sendgrid');

const enviarEmailSendgrid = sendMailSendgrid({ gettingSecretsOnAws, httpResponseType });

const interfaceSendgridMail = Object.freeze({
  enviarEmailSendgrid,
});

module.exports = interfaceSendgridMail;
