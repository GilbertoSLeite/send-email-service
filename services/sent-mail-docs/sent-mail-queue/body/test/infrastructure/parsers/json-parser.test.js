const chai = require('chai');
const sinon = require('sinon');
const jsonParser = require('../../../infrastructure/parsers/json-parser');

describe('Testing function responsible for converting body into a JSON object', () => {
    let context;
    let httpResponseTypeStub;

    beforeEach(() => {
        context = {
            succeed: (response) => response
        };
        httpResponseTypeStub = sinon.stub();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('When the body is missing', () => {
        it('Should return an internal server error response', async () => {
            httpResponseTypeStub.returns({ internalServerError: sinon.stub().returns({ error: 'Body is missing' }) });
            const response = await jsonParser({
                httpResponseType: httpResponseTypeStub
            })(context, undefined);
            chai.expect(response).to.deep.equal({ error: 'Body is missing' });
        });
    });

    describe('When the body is not a valid JSON string', () => {
        it('Should return an internal server error response', async () => {
            httpResponseTypeStub.returns({ internalServerError: sinon.stub().returns({ error: 'Invalid JSON string' }) });
            const response = await jsonParser({
                httpResponseType: httpResponseTypeStub
            })(context, '{"key": value}');
            chai.expect(response).to.deep.equal({ error: 'Invalid JSON string' });
        });
    });

    describe('When the body is a valid JSON string', () => {
        it('Should return the parsed body object', async () => {
            const response = await jsonParser({
                httpResponseType: httpResponseTypeStub
            })(context, '{"key": "value"}');
            chai.expect(response).to.deep.equal({ key: 'value' });
        });
    });
});
