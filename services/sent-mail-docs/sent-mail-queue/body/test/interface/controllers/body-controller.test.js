const chai = require('chai');
const sinon = require('sinon');
const bodyConvertedParsed = require('../../../interface/controllers/body-controller');

describe('Testing the controller function before sending it to the application layer and its use cases', () => {
    let parseBodyStub, validateBodyStub, contextMock, rawBody, httpResponseType;
  
    beforeEach(() => {
      parseBodyStub = sinon.stub();
      validateBodyStub = sinon.stub();
      httpResponseType = sinon.stub();
      contextMock = {
          succeed: (response) => response
      };
      rawBody = {
        teste: 'teste'
      };
    });
  
    afterEach(() => {
      parseBodyStub.resetHistory();
      validateBodyStub.resetHistory();
    });

    describe('When return a valid result', () => {
        it('should return the result of validateBody', async () => {
            const expectedResult = {
              teste: 'teste'
            };
            validateBodyStub.returns(true);
            parseBodyStub.returns(expectedResult);
            const result = await bodyConvertedParsed({
              httpResponseType,
              parseBody: parseBodyStub,
              validateBody: validateBodyStub,
            })(contextMock, rawBody);
        
            chai.assert.strictEqual(result, expectedResult);
          });
      });
  
    describe('When the function parseBody throws an error', () => {
      it('should return a bad request Parse error', async () => {
          parseBodyStub.throws(new Error('Parse error'));
          httpResponseType.returns({ badRequest: sinon.stub().returns({ error: 'Parse error' }) });
          const response = await bodyConvertedParsed({
            httpResponseType,
            parseBody: parseBodyStub,
            validateBody: validateBodyStub,
          })(contextMock, rawBody);
      
          chai.expect(response).to.deep.equal({error: 'Parse error'});
        });
    });   
  
    describe('When the function parseBody returns a falsy value', () => {
      it('should return a bad request response when parseBody returns a falsy value', async () => {
          parseBodyStub.returns(null);
          httpResponseType.returns({ badRequest: sinon.stub().returns({ error: 'Request body is missing' }) });
          const response = await bodyConvertedParsed({
            httpResponseType,
            parseBody: parseBodyStub,
            validateBody: validateBodyStub,
          })(contextMock, rawBody);
      
          chai.expect(response).to.deep.equal({error: 'Request body is missing'});
        });
    });
    
    describe('When the function validateBody return an boolean false', () => {
      it('should return a bad request Body not validated', async () => {
          validateBodyStub.returns(false);
          parseBodyStub.returns({ teste: 'teste' });
          httpResponseType.returns({ badRequest: sinon.stub().returns({ error: 'Body not validated' }) });
          const response = await bodyConvertedParsed({
            httpResponseType,
            parseBody: parseBodyStub,
            validateBody: validateBodyStub,
          })(contextMock, rawBody);
      
          chai.expect(response).to.deep.equal({error: 'Body not validated'});
        });
    });
  
    describe('When occurs an internal server error in function', () => {
      it('should return an internal server error response when an unexpected error occurs', async () => {
          validateBodyStub.throws(new Error('Unexpected error'));
          parseBodyStub.returns({});
          httpResponseType.returns({ internalServerError: sinon.stub().returns({ error: 'Unexpected error' }) });
          const response = await bodyConvertedParsed({
            httpResponseType,
            parseBody: parseBodyStub,
            validateBody: validateBodyStub,
          })(contextMock, rawBody);
      
          chai.expect(response).to.deep.equal({error: 'Unexpected error'});
        });
    });  
});
