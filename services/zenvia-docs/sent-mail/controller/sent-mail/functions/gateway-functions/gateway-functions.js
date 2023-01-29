/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
module.exports.gatewayFunctions = ({
  baixarDadosS3,
  enviarEmail,
  enviarS3,
  formatToday,
  httpResponseType,
}) => async (event) => {
  try {
    const { Records } = event;
    const bodyRecord = JSON.parse(Records[0].body);
    const encS3Object = await baixarDadosS3({
      'Bucket': bodyRecord.attachment.bucket,
      'Key': bodyRecord.attachment.key,
    });
    const dataSentMail = {
      'blob': encS3Object.data,
      'body': bodyRecord,
    };
    const dadosDoBody = (encS3Object.status && await enviarEmail(dataSentMail));
    const paramsS3 = {
      'from': bodyRecord.from,
      'time': formatToday,
      'to': bodyRecord.to,
    };
    const hashFileName = Buffer.from(JSON.stringify(paramsS3)).toString('base64');

    const awsParameter = {
      'Body': JSON.stringify(!dadosDoBody ? encS3Object.error : dadosDoBody),
      'Bucket': 'zdocs-notification-attachments',
      'ContentType': 'application/json',
      'Key': hashFileName,
    };

    const resUploadS3Obj = await enviarS3(awsParameter);

    const successResponse = 200;
    const body = JSON.stringify(!dadosDoBody ? encS3Object.error : dadosDoBody);
    const sentMailQueue = httpResponseType(successResponse, body);
    return sentMailQueue;
  }
  catch (error) {
    const INTERNAL_SERVER_ERROR = 500;
    const messageError = `${error.name}: ${error.message} em gateway-functions.js`;
    const responseError = httpResponseType(INTERNAL_SERVER_ERROR, messageError);
    return responseError;
  }
};
