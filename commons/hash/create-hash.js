const crypto = require('crypto');

const createNameDataFileBucket = ({
  httpResponseType
}) => (context, secretHash) => {
  try {
    if(!secretHash) {
      const errorResponse = httpResponseType().badRequest("Error: Invalid input");

      return context.succeed(errorResponse); 
    };
    // Chamando o metódo para criar a hash
    const hash = crypto.createHash('sha256', secretHash)
    // Atualizando os dados
      .update(secretHash)
      // codificando a hash em hexadecimal
      .digest('hex');
  
    // Returna Hash para uso
    return hash;    
  } catch (error) {
    const errorResponse = httpResponseType().internalServerError(error.message);
    return context.succeed(errorResponse);
  }
};

module.exports = createNameDataFileBucket;
