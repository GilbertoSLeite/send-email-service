const validateBodyUseCase = ({
    bodyEntity,
    httpResponseType,
    validatedBody
}) => async (context, body) => {
    try {
        const bodyDomain = bodyEntity(body);
        const validatingBody = await validatedBody(bodyDomain)
        return validatingBody;
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);  
    }
};

module.exports = validateBodyUseCase;