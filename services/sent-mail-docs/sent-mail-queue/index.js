const {
  httpResponseType,
} = require('../../../commons/http-response/interface-commons-http-response');
const logRequest = require('../../../commons/logger/logger-center');
const { emailAttachmentS3data } = require('./attachment/interface/interface');
const { bodyView } = require('./body/interface/interface-body');

module.exports.handler = async (event, context) => {
  try {    
    const request = {    
      requestContext: event.requestContext,
      headers: event.headers,
      params: event.queryStringParameters
    };
    logRequest('info', request, {});
    const returnValidatedBody = await bodyView(context, event.body);
    const dataToValidateAttachment = {
      attachment: returnValidatedBody.attachment,
      environment: returnValidatedBody.environment,
      hashid: returnValidatedBody.hashid,
    }
    logRequest('info', dataToValidateAttachment, {});
    const  attachmentData = await emailAttachmentS3data(context, dataToValidateAttachment);
    const responseQueue = httpResponseType().ok(attachmentData);
    return context.succeed(responseQueue);    
  }
  catch (error) {
    const errorResponse = httpResponseType().internalServerError(error.message);
    return context.succeed(errorResponse);      
  }
};
