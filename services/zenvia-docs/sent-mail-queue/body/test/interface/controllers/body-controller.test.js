const sinon = require('sinon');
const bodyConvertedParsed = require('../../../interface/controllers/body-controller');
const assert = require('chai').assert;

describe('Testing the function that will receive the body of the request will send it to be converted into an object and then to validate the fields.', () => {
    let httpResponseTypeMock, parseBodyMock, validateBodyMock, contextMock;
    beforeEach(() =>{
        httpResponseTypeMock = () => ({
            internalServerError: sinon.stub().returns("internalServerError")
        });
        parseBodyMock = sinon.stub().returns("bodyConvertedToObject");
        validateBodyMock = sinon.stub().returns(true);
        contextMock = {
            succeed: sinon.stub()
        };
    });

    const bodyData = { data: 'teste'};

    describe('When the body was converted and body is valid', () => {
        it('Should return boolean true', async() => {
            //Arrange
            const bodyConvertedParsedMock = bodyConvertedParsed({
                httpResponseType: httpResponseTypeMock,
                parseBody: parseBodyMock,
                validateBody: validateBodyMock
            });

            //Act
            const result = await bodyConvertedParsedMock(contextMock, bodyData);

            //Assert
            assert.isTrue(result)
        })
    })
})