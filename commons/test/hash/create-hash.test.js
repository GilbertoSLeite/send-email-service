const sinon = require('sinon');
const assert = require('assert');
const crypto = require('crypto');
const createNameDataFileBucket = require('../../hash/create-hash');

describe('Testing the function that creates the encrypted aws bucket name', () => {
    let httpResponseTypeMock, contextMock;
    let secretHash = "mysecret";
    beforeEach(() => {
        crypto.createHash = sinon.stub().returns({
            update: sinon.stub().returns({
                digest: sinon.stub().returns("hash")
            })
        });
        httpResponseTypeMock = () => ({
            badRequest: sinon.stub().returns("badRequest"),
            internalServerError: sinon.stub().returns("internalServerError")
        });    
        contextMock = {
            succeed: sinon.stub()
        };
    });
    describe('When success', () => {
        it('should return the hash', () => {
            // Arrange
            const createNameDataFileBucketMock = createNameDataFileBucket({
                httpResponseType: httpResponseTypeMock
            });
            // Act
            const result = createNameDataFileBucketMock(contextMock, secretHash);
            // Assert
            assert.equal(result, "hash");
        });
    });
    describe('When input is invalid', () => {
        it('should return an error message', () => {
            // Arrange
            const createNameDataFileBucketMock = createNameDataFileBucket({
                httpResponseType: httpResponseTypeMock
            });
            // Act
            createNameDataFileBucketMock(contextMock, undefined);
            // Assert
            sinon.assert.calledWith(contextMock.succeed, "badRequest");
        });
    });
    describe('When crypto throws error', () => {
        it('should return an error message', () => {
            // Arrange
            crypto.createHash = sinon.stub().throws("Error: crypto failure");
            const createNameDataFileBucketMock = createNameDataFileBucket({
                httpResponseType: httpResponseTypeMock
            });
            // Act
            createNameDataFileBucketMock(contextMock, secretHash);
            // Assert
            sinon.assert.calledWith(contextMock.succeed, "internalServerError");
        });
    });
});
