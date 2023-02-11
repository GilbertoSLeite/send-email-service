const convertToBuffer = ({
    httpResponseType
}) => (context, attachment) => {
    try {
        if (!attachment) {
            const errorResponse = httpResponseType().badRequest('Invalid attachment for Base64 conversion');
            return context.succeed(errorResponse);  
        };
      
        const itsBase64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        const validatingRegex = itsBase64Regex.test(attachment);
        
        if (validatingRegex) {
          return attachment;
        };

        const convertToBufferBase64 = Buffer.from(attachment).toString('base64');
      
        return convertToBufferBase64;
        
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);       
    };
  };
  
  module.exports = convertToBuffer;
  