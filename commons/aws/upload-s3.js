const uploadFileS3 = ({ 
  awsFeature, 
  httpResponseType,
  logRequest
}) => async (context, awsParameter) => {
  try {
    const request = {
      name: 'uploadFileS3',
      awsParameter
    }
    logRequest('info', request, {});
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
