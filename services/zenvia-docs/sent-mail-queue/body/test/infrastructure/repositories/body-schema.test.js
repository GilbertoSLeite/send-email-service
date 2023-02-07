const Joi = require('joi');
const assert = require('assert');
const schema = require('../../../infrastructure//repositories/body-schema').schema;

describe('Testing structure of validation in lib Joi.', () => {
    describe('Testing when the datas is correct', () => {
        it('Should validate a valid payload', () => {
            const payload = {
                hashid: '123e4567-e89b-12d3-a456-426655440000',
                sendDate: '2022-01-01T00:00:00.000Z',
                from: {
                    email: 'from@example.com',
                    name: 'From',
                    subject: 'Subject',
                },
                to: [
                    {
                        email: 'to@example.com',
                        name: 'To',
                    }
                ],
                cc: [
                    {
                        email: 'cc@example.com',
                        name: 'CC',
                    }
                ],
                contents: [
                    {
                        type: 'text/plain',
                        value: 'Hello, world!',
                    }
                ],
                attachment: {
                    blob: 'https://example.com/attachment.pdf'
                },
                environment: {
                    type: 'AWS',
                },
            };
    
            const result = schema.validate(payload, { allowUnknown: true });
            assert.strictEqual(result.error, undefined);
        });
    });
    describe('Testing when the response is erred', () => {
        it('Should not validate an invalid payload', () => {
            const payload = {
                hashid: '123e4567-e89b-12d3-a456-426655440000',
                sendDate: 'invalid date',
                from: {
                    email: 'invalid email',
                    name: 'From',
                    subject: 'Subject',
                },
                to: [
                    {
                        email: 'to@example.com',
                        name: 'To',
                    }
                ],
                cc: [
                    {
                        email: 'cc@example.com',
                        name: 'CC',
                    }
                ],
                contents: [
                    {
                        type: 'text/plain',
                        value: 'Hello, world!',
                    }
                ],
                attachment: {
                    blob: 'invalid url'
                },
                environment: {
                    type: 'Invalid type',
                },
            };
    
            const result = schema.validate(payload, { allowUnknown: true });
            assert.notStrictEqual(result.error, null);
        });
    });
});
