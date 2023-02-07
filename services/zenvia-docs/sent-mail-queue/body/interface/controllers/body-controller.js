const bodyConvertedParsed = ({
    httpResponseType,
    parseBody,
    validateBody
})  => async (context, rawBody) => {
    try {
      let bodyConvertedToObject;
      try {
        bodyConvertedToObject = await parseBody(context, rawBody);        
      } catch (error) {
        const errorResponse = httpResponseType().badRequest(error.message);
        return context.succeed(errorResponse);           
      };
      if (!bodyConvertedToObject) {
        const errorResponse = httpResponseType().badRequest('Request body is missing');
        return context.succeed(errorResponse);
      };
      const bodyIsValid =  await validateBody(context, bodyConvertedToObject);
      if(bodyIsValid){
        return bodyConvertedToObject
      };
      const bodyNotValidated = httpResponseType().badRequest('Body not validated');
      return context.succeed(bodyNotValidated);        
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);   
    }
  };

module.exports = bodyConvertedParsed;
