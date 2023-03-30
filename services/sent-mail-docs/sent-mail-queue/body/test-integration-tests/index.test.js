const assert = require("assert");
const AWS = require("aws-sdk");
const { bodyStringifyDataWithAttachment, bodyDataWithAttachment } = require("../../../../../commons/mock/validate-body");
const { bodyView } = require("../interface/interface-body");

describe("Lambda function test", () => {
  it("Parses string and returns object", async () => {
    // Define a string to parse
    const stringToParse = bodyStringifyDataWithAttachment;
    
    // Define a sample AWS Lambda function that parses the string
    const lambda = new AWS.Lambda({ region: "sa-east-1" });
    const params = {
      FunctionName: "altu-zenvia-docs-dev-sent-mail-queue",
      InvocationType: "RequestResponse",
      LogType: "None",
      Payload: stringToParse,
    };

    // Invoke the Lambda function
    const result = await lambda.invoke(params).promise();
    const parsedObject = bodyView(result.Payload);

    // Assert that the result is as expected
    assert.deepEqual(parsedObject, bodyDataWithAttachment);
  });
});
