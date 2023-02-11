const attachmentValidate = ({
  httpResponseType,
  Joi,
}) => (context, attachment) =>  {
  const attachmentSchema = Joi.object({
    blob: Joi.string().uri().required(),
  });

  const { error } = attachmentSchema.validate(attachment);

  if (error) {
    const errorResponse = httpResponseType().badRequest('Attachment is invalid');
    return context.succeed(errorResponse);  
  }

  return true;
}

module.exports = attachmentValidate;
