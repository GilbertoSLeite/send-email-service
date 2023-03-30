const chai = require('chai');
const sinon = require('sinon');
const parseBodyUseCase = require('../../../application/use-cases/parse-body');

describe('Testing function is the use case responsible for changing string to parsed object', () => {
  let context;
  let httpResponseTypeStub;
  let parsedBodyInfrastructureStub;

  beforeEach(() => {
    context = {
        succeed: (response) => response
    };
    httpResponseTypeStub = sinon.stub();
    parsedBodyInfrastructureStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('When the body is missing', () => {
    it('Should return a 400 Bad Request response', async () => {
        httpResponseTypeStub.returns({ badRequest: sinon.stub().returns({ error: 'field body is required' }) });
        parsedBodyInfrastructureStub.returns({});

      const response = await parseBodyUseCase({
        httpResponseType: httpResponseTypeStub,
        parsedBodyInfrastructure: parsedBodyInfrastructureStub
      })(context, null);

      chai.expect(response).to.deep.equal({error: 'field body is required'});
    });
  });

  describe('When the body is not a string', () => {
    it('Should return a 400 Bad Request response', async () => {
        httpResponseTypeStub.returns({ badRequest: sinon.stub().returns({ error: 'The body field must be a string' }) });

        const response = await parseBodyUseCase({
        httpResponseType: httpResponseTypeStub,
        parsedBodyInfrastructure: parsedBodyInfrastructureStub({
            httpResponseTypeStub
        })
      })(context, 123);

      chai.expect(response).to.deep.equal({error: 'The body field must be a string'});
    });
  });

  describe('When the body is a string', () => {
    it('Should call parsedBodyInfrastructure with the context and body', async () => {
        parsedBodyInfrastructureStub.returns({ key: 'value' });

        const response = await parseBodyUseCase({
        httpResponseType: httpResponseTypeStub,
        parsedBodyInfrastructure: parsedBodyInfrastructureStub
      })(context, '{"key": "value"}');
      
      chai.expect(response).to.deep.equal({ key: 'value' });
    });
  });

  describe('When an error occurs during function execution', () => {
    it('Should return a response with an internal server error status and message "Error message"', async () => {
        const error = new Error('Error message');
        parsedBodyInfrastructureStub.throws(error);
        httpResponseTypeStub.returns({ internalServerError: sinon.stub().returns({ error: 'Error message' }) });


        const response = await parseBodyUseCase({
        httpResponseType: httpResponseTypeStub,
        parsedBodyInfrastructure: parsedBodyInfrastructureStub
      })(context, []);

      chai.expect(response).to.deep.equal({ error: 'Error message' });
    });
  });
});
