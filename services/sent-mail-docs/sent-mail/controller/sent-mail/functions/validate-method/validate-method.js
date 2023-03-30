const validateMethod = ({
  httpResponseType,
}) => (method) => {
  try {
    const methods = {
      'GET': false,
      'PATCH': false,
      'POST': true,
      'PUT': false,
    };
    const receivedMethod = methods[method];
    const codeNotAllowMethod = 405;
    const statusCode405 = (!receivedMethod && codeNotAllowMethod);
    // eslint-disable-next-line max-len
    const bodyResponse = `O método ${method} é conhecido pelo servidor, mas foi desativado e não pode ser usado.`;
    // eslint-disable-next-line max-len
    const responseHTTP = (!receivedMethod && httpResponseType(statusCode405, bodyResponse));
    return responseHTTP;
  }
  catch (error) {
    const internalServerError = 501;
    // eslint-disable-next-line max-len
    const errorMensage = `${error.name}: ${error.message} na função validate-method.js`;
    const responseError = httpResponseType(internalServerError, errorMensage);
    return responseError;
  }
};

module.exports = validateMethod;
