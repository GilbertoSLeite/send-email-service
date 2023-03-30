const bodyValidator = ({
    httpResponseType,
    bodySchemaRepository
}) => async (context, parsedBody) => {
    try {
        if (!parsedBody || typeof parsedBody !== "object") {
            const errorResponse = httpResponseType().badRequest("Invalid body format! Body has to be Object");
            return context.succeed(errorResponse); 
        };
        const bodyRepository = await bodySchemaRepository(context, parsedBody)
        return bodyRepository;
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);          
    }
  };
  
  module.exports = bodyValidator;
  