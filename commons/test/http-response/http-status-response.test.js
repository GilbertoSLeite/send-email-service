/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines */
/* eslint-disable sort-keys */
/* eslint-disable max-len */
const { expect } = require('chai');
const httpResponseType  = require('../../http-response/http-status-response');

describe('Testing HTTP Status Response Function', async () => {
  describe('When not sent status code and body of response http.',() => {
    it('Should Return status code 501 and in body property No body was sent for the HTTP Response', () => {
      const response = httpResponseType();
      expect(response).to.deep.equal({
        'statusCode': 501,
        'headers': {
          'content-Type': 'application/json',
        },
        'body': 'No body was sent for the HTTP Response',
      });
    });
  });
  describe('When not sent status code but sent data in body of response http.',() => {
    it('Should Return status code 501 and in body the data included', () => {
      const response = httpResponseType(null, 'Dados Enviados');
      expect(response).to.deep.equal({
        'statusCode': 501,
        'headers': {
          'content-Type': 'application/json',
        },
        'body': 'Dados Enviados',
      });
    });
  });
  describe('When sent only one parameter and is a number.',() => {
    it('Should Return status code the number sented and in body No body was sent for the HTTP Response', () => {
      const response = httpResponseType(200);
      expect(response).to.deep.equal({
        'statusCode': 200,
        'headers': {
          'content-Type': 'application/json',
        },
        'body': 'No body was sent for the HTTP Response',
      });
    });
  });
  describe('When sent only one parameter and is a number.',() => {
    it('4st: When sent only one parameter and is a string. Should Return status code 501 and in body No body was sent for the HTTP Response', () => {
      const response = httpResponseType('200');
      expect(response).to.deep.equal({
        'statusCode': 501,
        'headers': {
          'content-Type': 'application/json',
        },
        'body': 'No body was sent for the HTTP Response',
      });
    });
  });
  describe('When sent only one parameter and is a number.',() => {
    it('5st: When sent status code and body of response http. Should Return status code sent and in body the data included', () => {
      const response = httpResponseType(200, 'Dados Enviado');
      expect(response).to.deep.equal({
        'statusCode': 200,
        'headers': {
          'content-Type': 'application/json',
        },
        'body': 'Dados Enviado',
      });
    });
  });
});
