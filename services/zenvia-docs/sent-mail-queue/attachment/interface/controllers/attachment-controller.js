const attachmentController = ({
    axiosDownloadAttachment,
    handlingAttachment,
    httpResponseType,
    sendToClouds,
    stringToBuffer,    
    validateAttachmentIsValid
}) => async (context, { 
    attachment, 
    environment, 
    hashid
}) => {
        if (!attachment || !attachment.blob) {
            const noAttachment = {};
            return noAttachment;    
        };
    
    try {     
        const isValidAttachment = validateAttachmentIsValid(context, attachment);
            
        const downloadAttachment = (isValidAttachment && await axiosDownloadAttachment(context, attachment.blob));
        const bufferAttachment = (downloadAttachment && await stringToBuffer(context, downloadAttachment));
        const finalHandlingAttachment = await handlingAttachment(context, bufferAttachment, attachment.blob);
        const sentToTheClouds = await sendToClouds(context, finalHandlingAttachment, environment, hashid);
        const finalResponse = {
            sentToTheClouds,
            finalHandlingAttachment
        };
        return finalResponse;
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);        
    };    
};

module.exports = attachmentController;