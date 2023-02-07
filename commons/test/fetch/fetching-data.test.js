const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const fetchData = require('../../fetch/fetching-data');
const Joi = require('joi');

describe('Testing the function that will be the centralizer of requests using Axios or node-fetch.', function() {
  let makeRequestWithAxios, makeRequestWithNodeFetch, httpResponseType;
  let context, useAxios, api, method, bodyRequest, headers;

  beforeEach(function() {
    makeRequestWithAxios = sinon.stub().returns(Promise.resolve({ data: 'Response from makeRequestWithAxios' }));
    makeRequestWithNodeFetch = sinon.stub().returns(Promise.resolve({ data: 'Response from makeRequestWithNodeFetch' }));    
    httpResponseType = sinon.stub();
    context = {
        succeed: (response) => response
    };
    useAxios = true;
    api = 'https://jsonplaceholder.typicode.com/todos/1';
    method = 'get';
    bodyRequest = {};
    headers = {};
  });

  describe('Testing when the choice is by axios', () =>{
    it('should return the response from makeRequestWithAxios when useAxios is true', async () => {
      const response = await fetchData({
        Joi,
        makeRequestWithAxios,
        makeRequestWithNodeFetch,
        httpResponseType
      })(context, useAxios, api, method, bodyRequest, headers);
      expect(response).to.deep.equal({ data: 'Response from makeRequestWithAxios' });
    });
  });
  describe('Testing when the choice is by node-fetch', () => {
    it('should return the response from makeRequestWithNodeFetch when useAxios is false', async () => {
      useAxios = false;
      const response = await fetchData({
        Joi,
        makeRequestWithAxios,
        makeRequestWithNodeFetch,
        httpResponseType
      })(context, useAxios, api, method, bodyRequest, headers);
      expect(response).to.deep.equal({ data: 'Response from makeRequestWithNodeFetch' });
    });
  });
  describe(`Testing when there's a request error`, () => {
    it('should return the error from httpResponseType.internalServerError when an error occurs', async () => {
      makeRequestWithAxios.throws(new Error('Test error'));
      httpResponseType.returns({ internalServerError: sinon.stub().returns({ message: 'Test error' }) });
      const response = await fetchData({
        Joi,
        makeRequestWithAxios,
        makeRequestWithNodeFetch,
        httpResponseType
      })(context, useAxios, api, method, bodyRequest, headers);
      expect(response).to.deep.equal({ message: 'Test error' });
    });
  });  
  describe('Testing when request parameters api are a boolean value', () => {
    it('should return error response when api are a boolena value', async () => {
      useAxios = true;
      api = false;
      method = 'GET'
      httpResponseType.returns({ badRequest: sinon.stub().returns({ message: 'Bad Request Error: Api require a url valid' }) });
      const response = await fetchData({
        Joi,
        makeRequestWithAxios,
        makeRequestWithNodeFetch,
        httpResponseType
      })(context, useAxios, api, method, bodyRequest, bodyRequest);
      expect(response).to.deep.equal({ message: 'Bad Request Error: Api require a url valid' });
    });
  });
  describe('Testing when request parameters useAxios not are a boolean value', () => {
    it('should return error response when parameters useAxios require a boolean value', async () => {
      useAxios = 'teste';
      api = 'https://jsonplaceholder.typicode.com/todos/1';
      method = 'GET'
      httpResponseType.returns({ badRequest: sinon.stub().returns({ message: 'Bad Request Error: useAxios require a boolena value' }) });
      const response = await fetchData({
        Joi,
        makeRequestWithAxios,
        makeRequestWithNodeFetch,
        httpResponseType
      })(context, useAxios, api, method, bodyRequest, bodyRequest);
      expect(response).to.deep.equal({ message: 'Bad Request Error: useAxios require a boolena value' });
    });
  });
  describe('Testing when request parameters method are a invalid method[put, get, delete, post, update]', () => {
    it('should return error response when parameters method are a invalid method', async () => {
      useAxios = 'teste';
      api = 'https://jsonplaceholder.typicode.com/todos/1';
      method = 'CAR'
      httpResponseType.returns({ badRequest: sinon.stub().returns({ message: 'Bad Request Error: method require method valid' }) });
      const response = await fetchData({
        Joi,
        makeRequestWithAxios,
        makeRequestWithNodeFetch,
        httpResponseType
      })(context, useAxios, api, method, bodyRequest, bodyRequest);
      expect(response).to.deep.equal({ message: 'Bad Request Error: method require method valid' });
    });
  });
});
