const downloadAttachment = ({
    downloadData,
    httpResponseType
}) => async (context, blob) => {
    try{
        const useAxios = true;
        const attachment = await downloadData(context, useAxios, blob);
        return attachment;

    } catch(error){
        const errorResponse = httpResponseType().internalServerError(error.message);
        return context.succeed(errorResponse); 
    };
};

module.exports = downloadAttachment;