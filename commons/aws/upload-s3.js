const uploadFileS3 = ({ 
  awsFeature, 
  httpResponseType,
}) => async (context, awsParameter) => {
  try {
    const awsClient = awsFeature();
    const dataDownloaded = (await awsClient.S3().putObject(awsParameter).promise());
    return dataDownloaded;
  }
  catch (error) {
    const errorResponse = httpResponseType().internalServerError(error.message);
    context.succeed(errorResponse);
  }
};

module.exports = uploadFileS3;
