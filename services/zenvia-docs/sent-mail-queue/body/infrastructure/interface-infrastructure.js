const { httpResponseType } = require("../../../../../commons/http-response/interface-commons-http-response");
const jsonParser = require("./parsers/json-parser");
const BodyRepository = require("./repositories/body-repository");
const { schema } = require("./repositories/body-schema");
const bodyValidator = require("./validations/body-validator");

const parsedBodyInfrastructure = jsonParser({
    httpResponseType
});

const bodySchemaRepository = BodyRepository({
    httpResponseType, 
    schema
});

const validatedBodyRepository = bodyValidator({
    httpResponseType,
    bodySchemaRepository
});

const interfaceInfrastructure = Object.freeze({
    parsedBodyInfrastructure,
    validatedBodyRepository
});

module.exports = interfaceInfrastructure;