const fetchData = ({
  Joi,
  makeRequestWithAxios,
  makeRequestWithNodeFetch,
  httpResponseType
}) => async (context, useAxios = true, api, method = 'get', bodyRequest = {}, headers = {}) => {
  try {    
    const params = { context, useAxios, api, method, bodyRequest, headers };

    const schema = Joi.object({
      context: Joi.any().required(),
      useAxios: Joi.bool().required(),
      api: Joi.string().uri().allow('').required(),
      method: Joi.string().valid('get', 'post', 'put', 'delete'),
      bodyRequest: Joi.object(),
      headers: Joi.object()
    });
    
    const validation = schema.validate(params);

    if (validation.error) {
      const errorResponse = httpResponseType().badRequest(validation.error.message);
      return context.succeed(errorResponse);
    };

    const options = {
      url: api,
      method,
      data: bodyRequest,
      headers,
    };

    const response =  (useAxios ? await makeRequestWithAxios(context, options) : await makeRequestWithNodeFetch(context, options));
    return response;
  }  catch (error) {
    const errorResponse = httpResponseType().internalServerError(error.message);
    return context.succeed(errorResponse);
  }
};

module.exports = fetchData;


