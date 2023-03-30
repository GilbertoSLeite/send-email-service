const sinon = require('sinon');
const assert = require('chai').assert;
const parseAndValidateBody = require('../../../interface/view/body-view');

describe("Testing the validation of the request body submission, send it to the controller, and return the body as an object.", () => {
    let httpResponseTypeMock, BodyControllerMock, contextMock;
    beforeEach(() => {
        httpResponseTypeMock = () => ({
            badRequest: sinon.stub().returns("badRequest"),
            internalServerError: sinon.stub().returns("internalServerError")
        });
        BodyControllerMock = sinon.stub().returns("validBody");
        contextMock = {
            succeed: sinon.stub()
        };
    });

    describe("when Body is not provided", () => {
        it("should return badRequest response", async () => {
            // Arrange
            const parseAndValidate = parseAndValidateBody({httpResponseType: httpResponseTypeMock, BodyController: BodyControllerMock});
            
            // Act
            await parseAndValidate(contextMock);

            // Assert
            sinon.assert.calledWith(contextMock.succeed, "badRequest");
        });
    });

    describe("when BodyController throws an error", () => {
        it("should return internalServerError response", async () => {
            // Arrange
            BodyControllerMock.throws(new Error("Error from BodyController"));
            const parseAndValidate = parseAndValidateBody({httpResponseType: httpResponseTypeMock, BodyController: BodyControllerMock});

            // Act
            await parseAndValidate(contextMock, "validRawBody");

            // Assert
            sinon.assert.calledWith(contextMock.succeed, "internalServerError");
        });
    });

    describe("when everything is valid", () => {
        it("should return the body from BodyController", async () => {
            // Arrange
            const parseAndValidate = parseAndValidateBody({httpResponseType: httpResponseTypeMock, BodyController: BodyControllerMock});
           
            // Act
            const result = await parseAndValidate(contextMock, "validRawBody");

            // Assert
            assert.equal(result, "validBody");
        });
    });
});
