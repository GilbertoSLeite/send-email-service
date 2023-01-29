const kmsDecrypt = ({ 
  awsFeature,
  httpResponseType 
}) => async (context, dataToDecrypt) => {
  try {
    const awsClient = awsFeature();    
    const encryptedString = Buffer.from(dataToDecrypt).toString('base64');
    const params = { CiphertextBlob: Buffer.from(encryptedString, 'base64') };
    const { Plaintext } = await awsClient.Kms().decrypt(params).promise();
    return Plaintext;
  } catch (error) {
    const errorResponse = httpResponseType().internalServerError(error.message);
    context.succeed(errorResponse);
  }
};

module.exports = kmsDecrypt;
