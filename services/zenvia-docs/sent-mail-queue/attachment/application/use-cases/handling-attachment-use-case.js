const handlingAttachmentUseCase = ({
  attachmentDomain,
  httpResponseType,
}) => async (context, buffer, attachmentLink) => {
  try {
    //looking for the last occurrence of a slash / at the end of the string and grabs everything between it and the end of the string
    const [, filenameWithExtension] = attachmentLink.match(/\/([^\/]+?)$/); 
    const [fileName, fileExtension] = filenameWithExtension.split('.');
  
    const attachment = new attachmentDomain({
      downloadedFile: buffer,
      fileExtension,
      fileName,
    });
  
    return attachment;
    
  } catch (error) {
    const errorResponse = httpResponseType().internalServerError(error.message);
    return context.succeed(errorResponse);       
  }
};

module.exports = handlingAttachmentUseCase;
