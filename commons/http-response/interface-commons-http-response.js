const httpStatusResponse = require('./http-status-response');
const httpResponse = require('./http-response');

const httpResponseType = httpResponse({
  httpStatusResponse
});

const interfaceCommonsHTTPResponse = Object.freeze({
  httpResponseType,
});

module.exports = interfaceCommonsHTTPResponse;
