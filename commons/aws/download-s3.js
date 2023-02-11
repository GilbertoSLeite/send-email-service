const getFileParse = ({
  awsFeature,
  httpResponseType,
  logRequest
}) => async (context, awsParameter) => {
  try {
    const awsClient = awsFeature();
    const request = {
      name: 'getFileParse',
      awsParameter
    };
    logRequest('info', request, {});
    const { Body } = await awsClient.S3().getObject(awsParameter).promise();
    const dataDownloaded = Body.toString('utf-8');
    const responseDownload = { data: dataDownloaded, status: true };
    return responseDownload;
  }
  catch (error) {
    const errorResponse = httpResponseType().internalServerError(error.message);
    context.succeed(errorResponse);
  }
};

module.exports = getFileParse;
