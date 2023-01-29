const secretIdName = {
  'SecretId': 'serverless-zenvia-docs',
};

const awsSecrets = ({
  awsFeature,
  httpResponseType,
}) => async (context) => {
  try {
    const awsClient = awsFeature();
    const { SecretString } = await awsClient.Secret().getSecretValue(secretIdName).promise();
    return SecretString;
  }
  catch (error) {
    const errorResponse = httpResponseType().internalServerError(error.message);
    context.succeed(errorResponse);
  }
};

module.exports = awsSecrets;
