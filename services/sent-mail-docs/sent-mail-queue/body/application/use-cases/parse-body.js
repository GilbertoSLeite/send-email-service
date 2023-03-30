const parseBodyUseCase = ({
    httpResponseType,
    parsedBodyInfrastructure
}) => async (context, body) => {
    try {
        if (!body) {
            const fieldBodyIsRequired = httpResponseType().badRequest('field body is required');
            return context.succeed(fieldBodyIsRequired);
          };
        const bodyIsString = (typeof body === 'string');
        if(!bodyIsString){
            const bodyFieldMustBeString = httpResponseType().badRequest('field body is required');
            return context.succeed(bodyFieldMustBeString);
        }
        const parsingBody = parsedBodyInfrastructure(context, body);
        return parsingBody;
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);   
    }
}

module.exports = parseBodyUseCase;