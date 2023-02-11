const sentMailQueue = ({
  awsFeature,
  httpResponseType,
  gettingSecretsOnAws,
  logRequest,
}) => async (context, body) => {
  try {
    const secretsAWS = await gettingSecretsOnAws(context);
    const awsClient = awsFeature();
    const params = {
      'MessageAttributes': {
        'Title': {
          'DataType': 'String',
          'StringValue': 'Attachment E-Mail',
        },
        'Author': {
          'DataType': 'String',
          'StringValue': 'Zenvia Docs',
        },
      },
      'QueueUrl': secretsAWS.SQS_URL_ZDOCS,
      'MessageBody': JSON.stringify(body),
    };
    const request = {
      name: 'sentMailQueue',
      params
    };
    logRequest('info', request, {});
    const dataSentQueue = await awsClient.SQS().sendMessage(params).promise();
    return dataSentQueue;
  }
  catch (error) {
    const errorResponse = httpResponseType().internalServerError(error.message);
    context.succeed(errorResponse);
  }
};

module.exports = sentMailQueue;
