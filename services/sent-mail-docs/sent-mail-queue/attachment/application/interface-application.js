const { downloadData } = require("../../../../../commons/fetch/interface-commons-fetch");
const { httpResponseType } = require("../../../../../commons/http-response/interface-commons-http-response");
const attachmentDomain = require("../domain/model/attachment-model");
const handlingAttachmentUseCase = require("./use-cases/handling-attachment-use-case");
const convertToBuffer = require("./use-cases/convert-attachment-to-buffer");
const downloadAttachment = require("./use-cases/download-attachment");
const uploadToCloud = require("./use-cases/upload-attachment-to-clouds");
const { S3Adapter } = require("../infrastructure/interface-infrastructure");

const axiosDownloadAttachment = downloadAttachment({
    downloadData,
    httpResponseType
});

const handlingAttachment = handlingAttachmentUseCase({
    attachmentDomain,
    httpResponseType
});

const stringToBuffer = convertToBuffer({
    httpResponseType
});

const sendToClouds = uploadToCloud({
    S3Adapter,
    httpResponseType
});

const intefaceApplication = Object.freeze({
    axiosDownloadAttachment,
    handlingAttachment,
    stringToBuffer,
    sendToClouds
});

module.exports = intefaceApplication