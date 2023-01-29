const axios = require('axios');

const fetchGet = ({
  httpResponseType,
}) => async (context, api) => {
  try {
    const config = {
      'headers': { },
      'method': 'get',
      'url': api,
    };
    const response = await axios(config);
    const dataReturn = response.data;
    return dataReturn;
  }
  catch (error) {
    if (!error.response) {
      const errorResponse = httpResponseType().internalServerError(error.message);
      context.succeed(errorResponse);
    }
    const { status, data } = error.response;
    const responseByStatus = {
      400: httpResponseType().badRequest(data),
      403: httpResponseType().forbidden(data),
      404: httpResponseType().notFound(data),
      500: httpResponseType().internalServerError(data),
    }
    const errorResponse = (responseByStatus[status] || httpResponseType().internalServerError(data));
    context.succeed(errorResponse);
  }
};

module.exports = fetchGet;


