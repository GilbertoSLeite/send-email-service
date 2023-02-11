const httpStatusResponse = require('./http-status-response');
const httpResponse = require('./http-response');
const logRequest = require('../logger/logger-center');

const httpResponseType = httpResponse({
  httpStatusResponse,
  logRequest
});

const interfaceCommonsHTTPResponse = Object.freeze({
  httpResponseType,
});

module.exports = interfaceCommonsHTTPResponse;
