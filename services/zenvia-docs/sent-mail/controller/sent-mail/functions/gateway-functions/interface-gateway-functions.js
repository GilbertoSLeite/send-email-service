const {
  baixarDadosS3,
  enviarS3,
} = require('../../../../../../../commons/aws/interface-aws');
const {
  httpResponseType,
} = require('../../../../../../../commons/http-response/interface-commons-http-response');
const { enviarEmail } = require('../send-mail/interface-send-mail');
const { gatewayFunctions } = require('./gateway-functions');
const { formatToday } = require('../../../../../../../commons/date/today-date');

const inicioProjeto = gatewayFunctions({
  baixarDadosS3,
  enviarEmail,
  enviarS3,
  formatToday,
  httpResponseType,
});

const interfaceGatewayFunction = Object.freeze({
  inicioProjeto,
});

module.exports = interfaceGatewayFunction;
