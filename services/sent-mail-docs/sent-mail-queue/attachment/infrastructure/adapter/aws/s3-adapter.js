const awsS3Adapter =  ({
    gettingSecretsOnAws,
    httpResponseType,
    sendS3
}) => async(context, finalHandlingAttachment, hashid) => {
    try {
        const secretsAWS = await gettingSecretsOnAws(context);
        const secretsAWSObject = JSON.parse(secretsAWS);
        const awsParameter = {
            Bucket: secretsAWSObject.BUCKET_AWS_ZDOCS,
            Key: hashid,
            Body: JSON.stringify(finalHandlingAttachment)
        };
        const sendFileS3 = await sendS3(context, awsParameter);
        return sendFileS3;
        
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);  
        
    }
};

module.exports = awsS3Adapter;