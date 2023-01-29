const { httpResponseType } = require('../http-response/interface-commons-http-response');
const createNameDataFileBucket = require('./create-hash');

const createEncryptedBucketName = createNameDataFileBucket({
  httpResponseType
});

const interfaceCommonsHash = Object.freeze({
  createEncryptedBucketName,
});

module.exports = interfaceCommonsHash;
