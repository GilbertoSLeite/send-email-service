const { httpResponseType } = require('../http-response/interface-commons-http-response');
const sentMailQueue = require('./sent-sqs');
const uploadFileS3 = require('./upload-s3');
const getFileParse = require('./download-s3');
const kmsDecrypt = require('./kms-decrypt');
const awsSecrets = require('./aws-secrets');
const awsFeature = require('./aws-feature');
const logRequest = require('../logger/logger-center');

const decryptDataS3 = kmsDecrypt({ awsFeature, logRequest,  httpResponseType });
const downloadDataS3 = getFileParse({ awsFeature, httpResponseType, logRequest });
const gettingSecretsOnAws = awsSecrets({ awsFeature, httpResponseType });
const sendS3 = uploadFileS3({ awsFeature, httpResponseType, logRequest });
const sendToSQSQueue = sentMailQueue({ awsFeature, httpResponseType, gettingSecretsOnAws, logRequest });

const interfaceAWS = Object.freeze({downloadDataS3,
  decryptDataS3,
  downloadDataS3,
  gettingSecretsOnAws,
  sendS3,
  sendToSQSQueue,
});

module.exports = interfaceAWS;
