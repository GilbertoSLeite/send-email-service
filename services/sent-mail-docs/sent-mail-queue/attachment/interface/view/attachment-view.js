const attachmentView =({
    analyzesValidatesData,
    httpResponseType
}) => async (context, attachment) => {
  try {
    if (!attachment) {
        const errorResponse = httpResponseType().badRequest('Attachment not found')
        return errorResponse;
    };

    const attachmentData = await analyzesValidatesData(context, attachment);
    return attachmentData;
  } catch (error) {
    const errorResponse = httpResponseType().internalServerError(error.message);
    return context.succeed(errorResponse);    
  }
};

module.exports = attachmentView;
