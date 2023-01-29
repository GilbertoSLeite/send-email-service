const AWS = require('aws-sdk-mock');
const { expect } = require('chai');
const { httpResponseType } = require('../../http-response/interface-commons-http-response');
const kmsDecrypt = require('../../aws/kms-decrypt');
const awsFeature = require('../../aws/aws-feature');

const context = {
  succeed: (response) => response
};

describe('Testing function that encrypt or decrypt with KMS AWS, the information in AWS structure.', () => {
  beforeEach(() => {
    AWS.mock('KMS', 'decrypt', (params, callback) => {
      callback(null, { Plaintext: 'plaintext' });
    });
  });

  afterEach(() => {
    AWS.restore('KMS');
  });

  describe('when the decryption is successful', () => {
    it('should return the decrypted plaintext', async () => {
      const dataToDecrypt = 'encrypted_text';
      const expectedResponse = 'plaintext';

      const response = await kmsDecrypt({awsFeature, httpResponseType })(context, dataToDecrypt);

      expect(response).to.deep.equal(expectedResponse);
    });
  });

  describe('when the decryption fails', () => {
    beforeEach(() => {
      AWS.restore('KMS');
      AWS.mock('KMS', 'decrypt', (params, callback) => {
        callback(new Error('Decryption failed'));
      });
    });

    it('should throw an error with the message from the KMS decryption error', async () => {
      try {
        await kmsDecrypt({awsFeature, httpResponseType })(context, 'encrypted_text');
      } catch (error) {
        expect(error.message).to.deep.equal({ message: 'Decryption failed', statusCode: 500 });
      }
    });
  });
});
