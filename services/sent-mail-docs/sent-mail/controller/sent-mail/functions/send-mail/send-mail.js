/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable sort-keys */
module.exports.sendEmail = ({
  enviarEmailSendgrid,
  httpResponseType,
}) => async (params) => {
  try {
    const { body, blob } = params;
    const dataMessageMail = {
      'personalizations': [
        {
          'to': body.to,
          'cc': body.cc,
        },
      ],
      'from': body.from,
      'subject': body.from.subject,
      'content': [{
        'type': body.contents[0].type,
        'value': Buffer.from(body.contents[0].value, 'base64').toString('binary'),
      }],
      'attachments': ((body.attachment.type === 'No Extension File') ? [] : [
        {
          'content': blob.split('"').join(''),
          'filename': body.attachment.filename,
          'type': body.attachment.type,
          'disposition': 'attachment',
        },
      ]),
    };
    const responseSendGrid = await enviarEmailSendgrid(dataMessageMail);
    return responseSendGrid;
  }
  catch (error) {
    const INTERNAL_SERVER_ERROR = 500;
    const messageError = `${error.name}: ${error.message} em send-mail.js`;
    const responseError = httpResponseType(INTERNAL_SERVER_ERROR, messageError);
    return responseError;
  }
};
