const {
  httpResponseType,
} = require('../../../../../commons/http-response/interface-commons-http-response');
const {
  inicioProjeto,
} = require('./functions/gateway-functions/interface-gateway-functions');

module.exports.handler = async (event) => {
  try {
    const response = await inicioProjeto(event);
    return response;
  }
  catch (error) {
    const INTERNAL_SERVER_ERROR = 501;
    const messageError = `${error.name}: ${error.message} em index.js`;
    const responseError = httpResponseType(INTERNAL_SERVER_ERROR, messageError);
    return responseError;
  }
};
