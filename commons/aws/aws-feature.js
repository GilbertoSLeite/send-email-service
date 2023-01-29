const aws = require('aws-sdk');
const configAws = require('./config-aws');

const createAWSClient = (service, region, options = {}) => {
  return new aws[service](Object.assign({ region }, options));
}

const createSQSClient = () => createAWSClient('SQS', configAws.region, configAws.sqs);
const createS3Client = () => createAWSClient('S3', configAws.region);
const createSecretsManagerClient = () => createAWSClient('SecretsManager', configAws.region);
const createKMSClient = () => createAWSClient('KMS', configAws.region, configAws.kms);

const awsFeature = () => {
    return {
        SQS: createSQSClient,
        S3: createS3Client,
        Secret: createSecretsManagerClient,
        Kms: createKMSClient
    }
};

module.exports = awsFeature;
