const {
  httpResponseType,
} = require('../../../commons/http-response/interface-commons-http-response');
const { bodyView } = require('./body/interface/interface-body');

module.exports.handler = async (event, context) => {
  try {    
    const returnValidatedBody = await bodyView(context, event.body);
    const responseQueue = httpResponseType().ok(sentQueue);
    return context.succeed(responseQueue);    
  }
  catch (error) {
    const errorResponse = httpResponseType().internalServerError(error.message);
    return context.succeed(errorResponse);      
  }
};
