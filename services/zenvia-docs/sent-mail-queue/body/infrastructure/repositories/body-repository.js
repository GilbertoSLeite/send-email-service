const BodyRepository = ({
    httpResponseType, 
    schema
}) => async (context, body) => {
    try {
        const { error } = await schema.validateAsync(body);
        if (error) {
          const detailsError = error.details.map(detail => detail.message).join(', ');
          const errorResponse = httpResponseType().unprocessableEntity(detailsError);
          return context.succeed(errorResponse);
        };
        const finalResponse = (!error); // Converting null to boolean true
        return finalResponse;        
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);           
    };
};

module.exports = BodyRepository;
