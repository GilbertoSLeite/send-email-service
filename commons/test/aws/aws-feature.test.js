const chai = require('chai');
const sinon = require('sinon');
const awsFeature = require('../../aws/aws-feature');
const AWS = require('aws-sdk');

describe('Testing the function that creates the aws framework instances', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Checking the returned object', () => {
        it('should return an object with SQS, S3 and Secret properties', () => {
            // Arrange
            const expected = {
                SQS: sinon.match.func,
                S3: sinon.match.func,
                Secret: sinon.match.func
            };

            // Act
            const result = awsFeature();

            // Assert
            chai.expect(typeof result.SQS).to.be.equal('function');
            chai.expect(typeof result.S3).to.be.equal('function');
            chai.expect(typeof result.Secret).to.be.equal('function');
        });
    });

    describe('Checking the SQS property', () => {
        it('should create an instance of SQS when SQS property is called', () => {
            // Arrange
            const spy = sandbox.spy(AWS, 'SQS');

            // Act
            const result = awsFeature();
            result.SQS();

            // Assert
            chai.expect(spy.calledOnce).to.be.true;
        });
    });

    describe('Checking the S3 property', () => {
        it('should create an instance of S3 when S3 property is called', () => {
            // Arrange
            const spy = sandbox.spy(AWS, 'S3');

            // Act
            const result = awsFeature();
            result.S3();

            // Assert
            chai.expect(spy.calledOnce).to.be.true;
        });
    });

    describe('Checking the Secret property', () => {
        it('should create an instance of SecretsManager when Secret property is called', () => {
            // Arrange
            const spy = sandbox.spy(AWS, 'SecretsManager');

            // Act
            const result = awsFeature();
            result.Secret();

            // Assert
            chai.expect(spy.calledOnce).to.be.true;
        });
    });
});
