const AWS = require('aws-sdk-mock');
const assert = require('assert');
const sentMailQueue = require('../../aws/sent-sqs');
const { httpResponseType } = require('../../http-response/interface-commons-http-response');
const awsFeature = require('../../aws/aws-feature');

const context = {
  succeed: (response) => response
};

describe('Testing the function that validates that messages are sent to AWS SQS Queue', () => {
  beforeEach(() => {
    AWS.mock('SQS', 'sendMessage', (params, callback) => {
      callback(null, { MessageId: 'test-message-id' });
    });
  });

  afterEach(() => {
    AWS.restore('SQS');
  });
  describe('when sending a message to the SQS queue', () => {

    it('should return the message id', async () => {
      const body = { test: 'test' };
      const dataSentQueue = await sentMailQueue({ awsFeature, httpResponseType })(context, body);
      assert.deepStrictEqual(dataSentQueue, { MessageId: 'test-message-id' });
    });
  });
  describe('whan fail sending a message to the SQS queue', () => {
    it('should throw an error if sending a message to the SQS queue fails', async () => {
      AWS.restore('SQS');
      AWS.mock('SQS', 'sendMessage', (params, callback) => {
        callback(new Error('Sending message to SQS queue failed'));
      });
      try {
        await sentMailQueue({ awsFeature, httpResponseType })(context, { test: 'test' });
      } catch (error) {
        assert.strictEqual(error.message, 'Sending message to SQS queue failed');
      }
    });
  })
});
