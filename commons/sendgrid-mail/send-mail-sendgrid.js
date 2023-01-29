const sgMail = require('@sendgrid/mail');

const sendMailSendgrid = ({
  gettingSecretsOnAws,
  httpResponseType,
}) => async (mail) => {
  try {
    const secret = await gettingSecretsOnAws();
    const secretParse = JSON.parse(secret);
    const sendgridKey = secretParse.SENDGRID_API_KEY;
    sgMail.setApiKey(sendgridKey);
    const sendingMail = await sgMail.send(mail);
    return sendingMail;
  }
  catch (error) {
    const INTERNAL_SERVER_ERROR = 500;
    const messageError = `Ocorreu Error: 
    ${JSON.stringify(error.response.body, null, 2)} em send-mail-sendgrid.js`;
    const responseError = httpResponseType(INTERNAL_SERVER_ERROR, messageError);
    return responseError;
  }
};

module.exports = sendMailSendgrid;
