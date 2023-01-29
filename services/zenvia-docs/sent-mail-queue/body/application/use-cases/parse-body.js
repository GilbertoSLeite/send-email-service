const parseBodyUseCase = ({
    httpResponseType,
    parsedBody
}) => async (context, body) => {
    try {
        const parsingBody = parsedBody(context, body);
        return parsingBody;
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);   
    }
}

module.exports = parseBodyUseCase;