const uploadToCloud = ({
    S3Adapter,
    httpResponseType
}) => async (context, finalHandlingAttachment, { 
    type 
}, hashid) => {
    try {
        const cloudAdapters = {
            AWS: async (context, finalHandlingAttachment,hashid) => await S3Adapter(context, finalHandlingAttachment,hashid),
            GCP: {},//Implement in the future
            AZURE: {} //Implement in the future
          };
        const adapter = cloudAdapters[type](context, finalHandlingAttachment, hashid);
        if (!adapter) {
            const errorResponse = httpResponseType().badRequest(`No adapter found for cloud environment: ${type}`);
            return context.succeed(errorResponse);  
        };
        return adapter;
        
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);
    };
};

module.exports = uploadToCloud;