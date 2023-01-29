const AWS = require('aws-sdk-mock');
const { expect } = require('chai');
const getFileParse = require('../../aws/download-s3');
const { httpResponseType } = require('../../http-response/interface-commons-http-response');
const awsFeature = require('../../aws/aws-feature');

const context = {
  succeed: (response) => response
};

describe('Testing the function that downloads data stored in S3 buckets', () => {
  describe('when the S3 request is successful', () => {
    beforeEach(() => {
      AWS.mock('S3', 'getObject', (params, callback) => {
        callback(null, { Body: 'file content' });
      });
    });

    afterEach(() => {
      AWS.restore('S3');
    });

    it('should return the file content and status true', async () => {
      const awsParameter = { Bucket: 'test-bucket', Key: 'test-file.txt' };
      const expectedResponse = { data: 'file content', status: true };

      const response = await getFileParse({awsFeature, httpResponseType })(context, awsParameter);

      expect(response).to.deep.equal(expectedResponse);
    });
  });

  describe('when the S3 request fails', () => {
    beforeEach(() => {
      AWS.restore('S3');
      AWS.mock('S3', 'getObject', (params, callback) => {
        callback(new Error('Request failed'));
      });
    });

    it('should throw an error with message "Request failed" and statusCode 500', async () => {
      const awsParameter = { Bucket: 'test-bucket', Key: 'test-file.txt' };

      try {
        await getFileParse({awsFeature, httpResponseType })(context, awsParameter);
      } catch (error) {
        expect(error.message).to.deep.equal({ message: 'Request failed', statusCode: 500 });
      }
    });
  });
});
