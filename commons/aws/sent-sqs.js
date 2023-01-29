const sentMailQueue = ({
  awsFeature,
  httpResponseType,
}) => async (context, body) => {
  try {
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
      'QueueUrl': 'https://sqs.sa-east-1.amazonaws.com/663434194045/zdocs-notification-attachments',
      'MessageBody': JSON.stringify(body),
    };
    const dataSentQueue = await awsClient.SQS().sendMessage(params).promise();
    return dataSentQueue;
  }
  catch (error) {
    const errorResponse = httpResponseType().internalServerError(error.message);
    context.succeed(errorResponse);
  }
};

module.exports = sentMailQueue;
