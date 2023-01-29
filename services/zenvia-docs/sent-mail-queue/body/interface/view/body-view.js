const parseAndValidateBody = ({
    httpResponseType,
    BodyController
}) => async (context, rawBody) => {
    try {
        if (!rawBody) {
            const errorResponse = httpResponseType().badRequest("Invalid body provided.");
            return context.succeed(errorResponse);
        }
        const body = await BodyController(context, rawBody);  
        return body;
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);     
    }
};

module.exports = parseAndValidateBody;
