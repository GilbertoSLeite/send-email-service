const { httpResponseType } = require('../http-response/interface-commons-http-response');
const sentMailQueue = require('./sent-sqs');
const uploadFileS3 = require('./upload-s3');
const getFileParse = require('./download-s3');
const kmsDecrypt = require('./kms-decrypt');
const awsSecrets = require('./aws-secrets');
const awsFeature = require('./aws-feature');

const descriptografarDadosS3 = kmsDecrypt({ awsFeature, httpResponseType });
const enviarS3 = uploadFileS3({ awsFeature, httpResponseType });
const enviarParaFilaSQS = sentMailQueue({ awsFeature,  httpResponseType });
const baixarDadosS3 = getFileParse({ awsFeature, httpResponseType });
const gettingSecretsOnAws = awsSecrets({ awsFeature, httpResponseType });

const interfaceAWS = Object.freeze({
  baixarDadosS3,
  gettingSecretsOnAws,
  descriptografarDadosS3,
  enviarParaFilaSQS,
  enviarS3,
});

module.exports = interfaceAWS;
