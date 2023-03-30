const { httpResponseType } = require("../../../../../commons/http-response/interface-commons-http-response");
const attachmentView = require("./view/attachment-view");
const attachmentController = require('./controllers/attachment-controller');
const { validateAttachmentIsValid } = require("../infrastructure/interface-infrastructure");
const { axiosDownloadAttachment, stringToBuffer, handlingAttachment, sendToClouds } = require("../application/interface-application");

const analyzesValidatesData = attachmentController({
    axiosDownloadAttachment,
    handlingAttachment,
    httpResponseType,
    sendToClouds,
    stringToBuffer,    
    validateAttachmentIsValid
});
const emailAttachmentS3data = attachmentView({
    analyzesValidatesData,
    httpResponseType
});

const interfaceAttachment = Object.freeze({
    emailAttachmentS3data
});

module.exports = interfaceAttachment;