const jsonParser = ({
    httpResponseType
}) => (context, body) => {
    try {
      const parsedBody = JSON.parse(body);
      return parsedBody;
    } catch (error) {
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse);  
    }
  };
  
  module.exports = jsonParser;
  