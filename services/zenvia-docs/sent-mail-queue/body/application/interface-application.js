const { httpResponseType } = require("../../../../../commons/http-response/interface-commons-http-response");
const { bodyEntity } = require("../domain/interface-domain");
const { parsedBody, validatedBody } = require("../infrastructure/interface-infrastructure");
const parseBodyUseCase = require("./use-cases/parse-body");
const validateBodyUseCase = require("./use-cases/validate-body");

const parseBody = parseBodyUseCase({
    httpResponseType,
    parsedBody
});

const validateBody = validateBodyUseCase({
    bodyEntity,
    httpResponseType,
    validatedBody
});

const interfaceApplication = Object.freeze({
    parseBody,
    validateBody
});

module.exports = interfaceApplication;