const { expect } = require("chai");
const { httpResponseType } = require("../../http-response/interface-commons-http-response")

describe('Testing response by type of status http' ,() => {
  describe('The HTTP 403 Forbidden response status code indicates that the server understands the request but refuses to authorize it.', () =>{
    it(`Should return: Forbidden`, () => {
        const responseForbidden = httpResponseType().forbidden('Forbidden');
        expect(responseForbidden).to.deep.equal({
            'statusCode': 403,
            'headers': {
              'content-Type': 'application/json',
            },
            'body': '\"Forbidden\"',
          })
    });
  });  
  describe('The HTTP 404 Not Found response status code indicates that the server cannot find the requested resource.', () =>{
    it(`Should return: Not Found`, () => {
        const responseNotFound = httpResponseType().notFound('Not Found');
        expect(responseNotFound).to.deep.equal({
            'statusCode': 404,
            'headers': {
              'content-Type': 'application/json',
            },
            'body': '\"Not Found\"',
          })
    });
  });
  describe('Response status code indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.', () =>{
    it(`Should return: Unprocessable Entity`, () => {
        const responseUnprocessableEntity = httpResponseType().unprocessableEntity('Unprocessable Entity');
        expect(responseUnprocessableEntity).to.deep.equal({
            'statusCode': 422,
            'headers': {
              'content-Type': 'application/json',
            },
            'body': '\"Unprocessable Entity\"',
          })
    });
  }); 
  describe('Response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error.', () =>{
    it(`Should return: Bad Request`, () => {
        const responseUnprocessableEntity = httpResponseType().badRequest('Bad Request');
        expect(responseUnprocessableEntity).to.deep.equal({
            'statusCode': 400,
            'headers': {
              'content-Type': 'application/json',
            },
            'body': '\"Bad Request\"',
          })
    });
  })
    describe('Success status response code indicates that the request has succeeded. A 200 response is cacheable by default.', () =>{
      it(`Should return: Success`, () => {
          const responseUnprocessableEntity = httpResponseType().ok('Success');
          expect(responseUnprocessableEntity).to.deep.equal({
              'statusCode': 200,
              'headers': {
                'content-Type': 'application/json',
              },
              'body': '\"Success\"',
            })
      });
    });
    describe('Server error response code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.', () =>{
      it(`Should return: Internal Server Error`, () => {
          const responseUnprocessableEntity = httpResponseType().internalServerError('Internal Server Error');
          expect(responseUnprocessableEntity).to.deep.equal({
              'statusCode': 500,
              'headers': {
                'content-Type': 'application/json',
              },
              'body': '\"Internal Server Error\"',
            })
      });
    });
});