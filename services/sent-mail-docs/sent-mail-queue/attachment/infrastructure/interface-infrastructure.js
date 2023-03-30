const Joi = require('joi');
const { sendS3 , gettingSecretsOnAws} = require('../../../../../commons/aws/interface-aws');
const { httpResponseType } = require('../../../../../commons/http-response/interface-commons-http-response');
const awsS3Adapter = require('./adapter/aws/s3-adapter');
const attachmentValidate = require('./validations/attachment-validate');

const S3Adapter = awsS3Adapter({
    gettingSecretsOnAws,
    httpResponseType,
    sendS3
})
const validateAttachmentIsValid = attachmentValidate({
    httpResponseType,
    Joi,
});

const interfaceInfrastructure = Object.freeze({
    S3Adapter,
    validateAttachmentIsValid
});

module.exports = interfaceInfrastructure;