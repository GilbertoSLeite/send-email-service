const sinon = require('sinon');
const assert = require('assert');
const awsSecrets = require('../../aws/aws-secrets');
const awsMock = require('aws-sdk-mock');
const awsFeature = require('../../aws/aws-feature');

describe('Testing the function that returns secrets stored in AWS Secrets', () => {
  let httpResponseTypeMock, awsFeatureMock;
  beforeEach(() => {
    awsMock.mock('SecretsManager', 'getSecretValue', (params, callback) => {
      callback(null, { SecretString: 'mysecret' });
    });
    httpResponseTypeMock = () => ({
        internalServerError: sinon.stub().returns("internalServerError")
    });
    awsFeatureMock = sinon.stub().returns("validBody");
    contextMock = {
        succeed: sinon.stub()
    };
  });

  afterEach(() => {
    awsMock.restore('SecretsManager');
  });
  
  describe('When success', () => {
    it('should return the secret', async () => {
      // Arrange
    const awsSecretsMock = awsSecrets({awsFeature, httpResponseType: httpResponseTypeMock })
  
      // Act
      const result = await awsSecretsMock(contextMock);
  
      // Assert
      assert.equal(result, 'mysecret');
    });
  });
  describe('When an error occurs while returning secrets', () => {
    it('should return Internal server error', async () => {
      // Arrange
      awsFeatureMock.throws(new Error("Internal server error"));
      const awsSecretsMock = awsSecrets({awsFeature: awsFeatureMock, httpResponseType: httpResponseTypeMock })
  
      // Act
      await awsSecretsMock(contextMock);
  
      // Assert
      sinon.assert.calledWith(contextMock.succeed, "internalServerError");
    });
  });
});
