const chai = require('chai');
const sinon = require('sinon');
const bodyValidator = require('../../../infrastructure/validations/body-validator');

const expect = chai.expect;

describe('Testing the function responsible for starting the body validation process', () => {
    let context, parsedBody;
    let bodySchemaRepositoryStub;
    let httpResponseType;

    beforeEach(() => {
        context = {
            succeed: (response) => response
        };
        httpResponseType = sinon.stub();
        parsedBody = {};
        bodySchemaRepositoryStub = sinon.stub().resolves({});
    });

    afterEach(() => {
        sinon.reset();
        bodySchemaRepositoryStub.resetHistory();
    });

    describe('When the body is not an object', () => {
        it('Should return a response with a bad request status and message "Invalid body format! Body has to be Object"', async () => {
            parsedBody = 'string';
            httpResponseType.returns({ badRequest: sinon.stub().returns({ error: 'Invalid body format! Body has to be Object' }) });

            const response = await bodyValidator({
                httpResponseType,
                bodySchemaRepository: bodySchemaRepositoryStub
            })(context, parsedBody);

            expect(response).to.deep.equal({error: 'Invalid body format! Body has to be Object'});
        });
    });

    describe('When an error occurs during function execution', () => {
        it('Should return a response with an internal server error status and message "Error message"', async () => {
            const error = new Error('Error message');
            bodySchemaRepositoryStub.throws(error);
            httpResponseType.returns({ internalServerError: sinon.stub().returns({ error: 'Error message' }) });


            const response = await bodyValidator({
                httpResponseType,
                bodySchemaRepository: bodySchemaRepositoryStub
            })(context, parsedBody);

            expect(response).to.deep.equal({ error: 'Error message' });
        });
    });

    describe('When no error occurs during function execution', () => {
        it('Should return the result of the bodySchemaRepository function execution', async () => {
            const response = await bodyValidator({
                httpResponseType,
                bodySchemaRepository: bodySchemaRepositoryStub
            })(context, parsedBody);

            expect(response).to.deep.equal({});
        });
    });
});
