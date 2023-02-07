const axiosRequest = ({
    axios,
    httpResponseType
}) => async(context, options) => {
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    const errorResponse = {
        '400': httpResponseType.badRequest,
        '404': httpResponseType.notFound,
        '500': httpResponseType.internalServerError,
      };
      const status = (error.response ? error.response.status : 500);
      const handler = (errorResponse[status] || httpResponseType.internalServerError);
      return context.succeed(handler(error.response ? error.response.data : error.message));
  }
};

module.exports = axiosRequest;
