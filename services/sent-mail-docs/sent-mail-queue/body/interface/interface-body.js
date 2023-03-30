const { httpResponseType } = require("../../../../../commons/http-response/interface-commons-http-response");
const { parseBody, validateBody } = require("../application/interface-application");
const bodyConvertedParsed = require("./controllers/body-controller");
const parseAndValidateBody = require("./view/body-view");

const BodyController = bodyConvertedParsed({
    httpResponseType,
    parseBody,
    validateBody
});

const bodyView = parseAndValidateBody({
    httpResponseType,
    BodyController
});

const intefaceProject = Object.freeze({
    bodyView
});

module.exports = intefaceProject;