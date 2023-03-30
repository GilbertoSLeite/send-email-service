const validateBodyUseCase = ({
    bodyEntity,
    httpResponseType,
    validatedBodyRepository
}) => async (context, body) => {
    try {
        const bodyDomain = new bodyEntity(body.hashid, body.sendDate, body.from, body.to, body.contents, body.attachment, body.environment);
        const validatingBody = await validatedBodyRepository(context, bodyDomain)
        return validatingBody;
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);  
    }
};

module.exports = validateBodyUseCase;