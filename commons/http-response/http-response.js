const httpResponse = ({
    httpStatusResponse,
    logRequest
}) => () => ({
    forbidden: (message, request) =>  {
        const statusCode = 403;
        const stringifyMessage = JSON.stringify(message, null, 2);
        const response = httpStatusResponse(statusCode, stringifyMessage);
        const finalResponse = {
            statusCode: response.statusCode,
            headers: response.headers,
            body: message            
        };
        logRequest('warn', request, finalResponse);
        return response; 
    },

    notFound: (message, request) =>  {
        const statusCode = 404;
        const stringifyMessage = JSON.stringify(message, null, 2);
        const response = httpStatusResponse(statusCode, stringifyMessage);
        const finalResponse = {
            statusCode: response.statusCode,
            headers: response.headers,
            body: message            
        };
        logRequest('error', request, finalResponse);
        return response; 
    },

    unprocessableEntity: (message, request) =>  {
        const statusCode = 422;
        const stringifyMessage = JSON.stringify(message, null, 2);
        const response = httpStatusResponse(statusCode, stringifyMessage);
        const finalResponse = {
            statusCode: response.statusCode,
            headers: response.headers,
            body: message            
        };
        logRequest('warn', request, finalResponse);
        return response; 
    },

    badRequest: (message, request) =>  {
        const statusCode = 400;
        const stringifyMessage = JSON.stringify(message, null, 2);
        const response = httpStatusResponse(statusCode, stringifyMessage);
        const finalResponse = {
            statusCode: response.statusCode,
            headers: response.headers,
            body: message            
        };
        logRequest('error', request, finalResponse);
        return response; 
    },

    ok: (message, request) =>  {
        const statusCode = 200;
        const stringifyMessage = JSON.stringify(message, null, 2);
        const response = httpStatusResponse(statusCode, stringifyMessage);
        const finalResponse = {
            statusCode: response.statusCode,
            headers: response.headers,
            body: message            
        };
        logRequest('info', request, finalResponse);
        return response; 
    },

    internalServerError: (message, request) =>  {
        const statusCode = 500;
        const stringifyMessage = JSON.stringify(message, null, 2);
        const response = httpStatusResponse(statusCode, stringifyMessage);
        const finalResponse = {
            statusCode: response.statusCode,
            headers: response.headers,
            body: message            
        };
        logRequest('error', request, finalResponse);
        return response; 
    },

});

module.exports = httpResponse;