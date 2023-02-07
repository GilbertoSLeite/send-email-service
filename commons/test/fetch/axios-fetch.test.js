const axios = require('axios');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const axiosRequest = require('../../fetch/axios-fetch')

describe('Testing scenario of requests using the axios library.', () => {
  let httpResponseType, context;

  beforeEach(() => {
    httpResponseType = {
      badRequest: () => sinon.stub(),
      notFound: () => sinon.stub(),
      internalServerError: () => sinon.stub(),
    } 
    context = {
        succeed: (response) => response
    };
  });

  const expectResult = {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  }; 
  
  describe('when making a request with axios', () => {
    it('should return the response from axios', async () => {
      const options = {
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        method: 'GET', 
        data: {}, 
        headers: {}
      };

      const response = await axiosRequest({
        axios,
        httpResponseType,
      })(context, options);

      expect(response).to.deep.equals(expectResult)
    });
  });

  describe('when making a request with axios results in a Not Found', () => {
    it('should return the Not Found error response from httpResponseType', async () => {
      const options = {
        url: 'https://jsonplaceholder.typicode.com/todas/1',
        method: 'GET', 
        data: {}, 
        headers: {}
      };
      httpResponseType = { notFound: sinon.stub().returns({ response: 'Not Found' }) };
      const response = await axiosRequest({
        axios,
        httpResponseType,
      })(context, options);
      expect(response).to.deep.equal({ response: 'Not Found' });
    });
  });

  describe('when making a request with axios results in a Bad Request', () => {
    it('should return the Bad Request error response from httpResponseType', async () => {
      const options = {
        url: 'https://api.github.com/users/GilbertoSLeite/repos?access_token=123456789',
        method: 'GET', 
        data: {}, 
        headers: {}
      };
      httpResponseType = { badRequest: sinon.stub().returns({ response: 'Bad Request' }) };
      const response = await axiosRequest({
        axios,
        httpResponseType,
      })(context, options);
      expect(response).to.deep.equal({ response: 'Bad Request' });
    });
  });

  describe('when making a request with axios results in a non-handled error', () => {
    it('should return the internal server error response from httpResponseType', async () => {
      const options = {
        url: '',
        method: 'GET', 
        data: {}, 
        headers: {}
      };
      httpResponseType = { internalServerError: sinon.stub().returns({ message: 'Internal Server Error' }) };
      const response = await axiosRequest({
        axios,
        httpResponseType,
      })(context, options);
      expect(response).to.deep.equal({ message: 'Internal Server Error' });
    });
  });
  describe('when making a request with axios results it is an unmapped code', () => {
    it('should return the internal server error response from httpResponseType', async () => {
      const options = {
        url: 'https://jsonplaceholder.typicode.com/todas/1',
        method: 'GET', 
        data: {}, 
        headers: {}
      };
      httpResponseType = { internalServerError: sinon.stub().returns({ message: 'Internal Server Error' }) };
      const response = await axiosRequest({
        axios,
        httpResponseType,
      })(context, options);
      expect(response).to.deep.equal({ message: 'Internal Server Error' });
    });
  });
});
