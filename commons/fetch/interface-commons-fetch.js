const axios = require('axios');
const fetch = true //require("node-fetch"); Librarie not installed
const Joi = require('joi');
const { httpResponseType } = require('../http-response/interface-commons-http-response');
const axiosRequest = require('./axios-fetch');
const fetchData = require('./fetching-data');
const nodeFetchRequest = require('./node-fetch');

const makeRequestWithAxios = axiosRequest({
  axios,
  httpResponseType
});

const makeRequestWithNodeFetch = nodeFetchRequest({
  fetch,
  httpResponseType
});

const downloadData = fetchData({
  Joi,
  makeRequestWithAxios,
  makeRequestWithNodeFetch,
  httpResponseType
});

const interfaceCommonsFetch = Object.freeze({
  downloadData,
});

module.exports = interfaceCommonsFetch;
