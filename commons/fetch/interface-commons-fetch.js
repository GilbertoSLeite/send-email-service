const { httpResponseType } = require('../http-response/interface-commons-http-response');
const fetchGet = require('./fetching-get-data');

const downloadData = fetchGet({
  httpResponseType,
});

const interfaceCommonsFetch = Object.freeze({
  downloadData,
});

module.exports = interfaceCommonsFetch;
