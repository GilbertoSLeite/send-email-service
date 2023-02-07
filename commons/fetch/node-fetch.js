const fetchRequest = ({ 
  fetch,
  httpResponseType
}) => async (context, options) => {
  try {
    options.body = data && JSON.stringify(data);    

    const response = await fetch(url, options);
    if (!response.ok) {
      const handler = httpResponseType[response.status] || httpResponseType.internalServerError;
      return context.succeed(handler(await response.json()));
    }

    return response.json();
  } catch (error) {
    return context.succeed(httpResponseType.internalServerError(error.message));
  }
};

module.exports = fetchRequest;
