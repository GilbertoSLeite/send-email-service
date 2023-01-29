const axios = require('axios');
const fetchGet = require('../../fetch/fetching-get-data');
const sinon = require('sinon');
const expect = require('chai').expect;

describe('Testing the function that downloads information with the axios lib.', () => {
  let httpResponseTypeMock,  contextMock, axiosStub, api;

  beforeEach(() => {
    api = 'https://jsonplaceholder.typicode.com/todos/1'
    httpResponseTypeMock = () => ({
      badRequest: sinon.stub().returns({ status: 400, data: 'Bad Request' }),
      forbidden: sinon.stub().returns({ status: 403, data: 'Forbidden' }),
      notFound: sinon.stub().returns({ status: 404, data: 'Not Found' }),
      internalServerError: sinon.stub().returns({ status: 500, data: 'Internal Server Error' }),
    });
    axiosStub = sinon.stub(axios, 'get');
    contextMock = {
        succeed: sinon.stub()
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('When making a successful GET request', () => {    
    it('Should return the data from the API', async () => {
      // Arrange           
      const downloadData = fetchGet({ httpResponseType: httpResponseTypeMock });
      
      // Act
      await downloadData(contextMock, api);
      
      // Assert
      expect(axiosStub.calledOnceWith({
        headers: {},
        method: 'get',
        url: api,
      })).to.be.true;
      expect(contextMock.succeed.notCalled).to.be.true;
    });
  });

  describe('When making an unsuccessful GET request', () => {
    it('Should return a 400 Bad Request response', async () => {
      // Arrange           
      const downloadData = fetchGet({ httpResponseType: httpResponseTypeMock });
      
      // Act
      await downloadData(contextMock, api);
      axiosStub.rejects({
        response: {
          status: 400,
          data: 'Bad Request',
        },
      });

      // Assert 
      expect(contextMock.succeed.calledOnceWith({ status: 400, data: 'Bad Request' })).to.be.true;
    });

    it('Should return a 403 Forbidden response', async () => {
      // Arrange           
      const downloadData = fetchGet({ httpResponseType: httpResponseTypeMock });
      
      // Act
      await downloadData(contextMock, api);
      axiosStub.rejects({
        response: {
          status: 403,
          data: 'Forbidden',
        },
      });

      // Assert
      expect(contextMock.succeed.calledOnceWith({ status: 403, data: 'Forbidden' })).to.be.true;
    });

    it('Should return a 404 Not Found response', async () => {
      // Arrange           
      const downloadData = fetchGet({ httpResponseType: httpResponseTypeMock });
      
      // Act
      await downloadData(contextMock, api);
      axiosStub.rejects({
        response: {
          status: 404,
          data: 'Not Found',
        },
      });
      
      // Assert
      expect(contextMock.succeed.calledOnceWith({ status: 404, data: 'Not Found' })).to.be.true;
    });

    it('Should return a 500 Internal Server Error response', async () => {
      // Arrange           
      const downloadData = fetchGet({ httpResponseType: httpResponseTypeMock });
      
      // Act
      await downloadData(contextMock, api);
      axiosStub.rejects({
        response: {
          status: 500,
          data: 'Internal Server Error',
        },
      });
      
      // Assert
      expect(contextMock.succeed.calledOnceWith({ status: 500, data: 'Internal Server Error' })).to.be.true;
    });
  });
  describe('When the fetch does not happen and there is no error response', () =>{
    it('Should return a 500 Internal Server Error of Error Message', async () =>{
      // Arrange           
      const downloadData = fetchGet({ httpResponseType: httpResponseTypeMock });
      
      // Act
      await downloadData(contextMock, api);
      
      // Assert
      expect(contextMock.succeed.calledOnceWith({ status: 500, data: 'Internal Server Error' })).to.be.true;
    });
  });
});
