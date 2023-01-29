const httpResponse = ({
    httpStatusResponse
}) => () => ({
    forbidden: (message) =>  {
        const statusCode = 403;
        const stringifyMessage = JSON.stringify(message, null, 2);
        const response = httpStatusResponse(statusCode, stringifyMessage);
        return response; 
    },

    notFound: (message) =>  {
        const statusCode = 404;
        const stringifyMessage = JSON.stringify(message, null, 2);
        const response = httpStatusResponse(statusCode, stringifyMessage);
        return response; 
    },

    unprocessableEntity: (message) =>  {
        const statusCode = 422;
        const stringifyMessage = JSON.stringify(message, null, 2);
        const response = httpStatusResponse(statusCode, stringifyMessage);
        return response; 
    },

    badRequest: (message) =>  {
        const statusCode = 400;
        const stringifyMessage = JSON.stringify(message, null, 2);
        const response = httpStatusResponse(statusCode, stringifyMessage);
        return response; 
    },

    ok: (message) =>  {
        const statusCode = 200;
        const stringifyMessage = JSON.stringify(message, null, 2);
        const response = httpStatusResponse(statusCode, stringifyMessage);
        return response; 
    },

    internalServerError: (message) =>  {
        const statusCode = 500;
        const stringifyMessage = JSON.stringify(message, null, 2);
        const response = httpStatusResponse(statusCode, stringifyMessage);
        return response; 
    },

});

module.exports = httpResponse;