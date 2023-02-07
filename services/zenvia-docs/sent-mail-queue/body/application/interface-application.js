const { httpResponseType } = require("../../../../../commons/http-response/interface-commons-http-response");
const bodyEntity  = require("../domain/models/body-entity");
const { parsedBodyInfrastructure, validatedBodyRepository } = require("../infrastructure/interface-infrastructure");
const parseBodyUseCase = require("./use-cases/parse-body");
const validateBodyUseCase = require("./use-cases/validate-body");

const parseBody = parseBodyUseCase({
    httpResponseType,
    parsedBodyInfrastructure
});

const validateBody = validateBodyUseCase({
    bodyEntity,
    httpResponseType,
    validatedBodyRepository
});

const interfaceApplication = Object.freeze({
    parseBody,
    validateBody
});

module.exports = interfaceApplication;