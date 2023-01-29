const httpStatusResponse = (code, body) => {
  return {
      statusCode: (typeof (code) !== 'number' ? 501 : code),
      headers: {
          'content-Type': 'application/json',
      },
      body: (body || 'No body was sent for the HTTP Response'),
  }
}

module.exports = httpStatusResponse;
