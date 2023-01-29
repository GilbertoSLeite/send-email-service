const bodyConvertedParsed = ({
    httpResponseType,
    parseBody,
    validateBody
})  => async (context, rawBody) => {
    try {
      const bodyConvertedToObject = await parseBody(context, rawBody);
      const bodyIsValid =  await validateBody(context, bodyConvertedToObject);
      return bodyIsValid;
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);   
    }
  };

module.exports = bodyConvertedParsed;
