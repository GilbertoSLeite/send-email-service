const {
  httpResponseType,
} = require('../../../../../../../commons/http-response/interface-commons-http-response');
const validateMethod = require('./validate-method');

const validarMetodosHTTP = validateMethod({ httpResponseType });

const interfaceValidateMethod = Object.freeze({
  validarMetodosHTTP,
});

module.exports = interfaceValidateMethod;
