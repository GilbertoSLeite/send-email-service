const AWS = require('aws-sdk-mock');
const assert = require('assert');
const uploadFileS3 = require('../../aws/upload-s3');
const { httpResponseType } = require('../../http-response/interface-commons-http-response');
const awsFeature = require('../../aws/aws-feature');

const context = {
  succeed: (response) => response
};

describe('Testing the function that sends data to AWS S3 buckets', () => {
  beforeEach(() => {
    AWS.mock('S3', 'putObject', (params, callback) => {
      callback(null, { ETag: 'test-etag' });
    });
  });

  afterEach(() => {
    AWS.restore('S3');
  });
  describe('when uploading a file to S3', () => {
    it('should upload a file to S3 and return the ETag', async () => {
      const awsParameter = { Bucket: 'test-bucket', Key: 'test-key', Body: 'test-file' };
      const dataUploaded = await uploadFileS3({awsFeature,  httpResponseType })(context, awsParameter);
      assert.deepStrictEqual(dataUploaded, { ETag: 'test-etag' });
    });
  });
  describe('when fail uploading a file to S3', () => {
    it('should upload a file to S3 and return the ETag', async () => {
      AWS.restore('S3');
      AWS.mock('S3', 'putObject', (params, callback) => {
        callback(new Error('Uploading file failed'));
      });
      try {
        const awsParameter = { Bucket: 'test-bucket', Key: 'test-key', Body: 'test-file' };
        await uploadFileS3({awsFeature,  httpResponseType })(context, awsParameter);        
      } catch (error) {
        assert.strictEqual(error.message, 'Uploading file failed');        
      }
    });
  });
});
