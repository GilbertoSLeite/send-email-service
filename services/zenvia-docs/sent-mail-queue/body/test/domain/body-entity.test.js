const chai = require('chai');
const sinon = require('sinon');
const bodyEntity = require('../../domain/models/body-entity');

describe('Testing the class responsible for creating domain entity', () => {
  describe('Create a new entity with all attributes', () => {
    it('Should create an entity with the correct attributes and values', () => {
      const entity = new bodyEntity(
        'abc123',
        new Date(),
        'sender@email.com',
        'recipient@email.com',
        'Hello World!',
        ['attachment1.pdf', 'attachment2.pdf'],
        'staging'
      );

      chai.expect(entity).to.be.an.instanceOf(bodyEntity);
      chai.expect(entity.hashid).to.equal('abc123');
      chai.expect(entity.sendDate).to.be.an.instanceOf(Date);
      chai.expect(entity.from).to.equal('sender@email.com');
      chai.expect(entity.to).to.equal('recipient@email.com');
      chai.expect(entity.contents).to.equal('Hello World!');
      chai.expect(entity.attachment).to.deep.equal(['attachment1.pdf', 'attachment2.pdf']);
      chai.expect(entity.environment).to.equal('staging');
    });
  });

  describe('Create a new entity without attachment attribute', () => {
    it('Should create an entity with the correct attributes and default value for attachment', () => {
      const entity = new bodyEntity(
        'def456',
        new Date(),
        'sender@email.com',
        'recipient@email.com',
        'Hello World!',
        null,
        'production'
      );

      chai.expect(entity).to.be.an.instanceOf(bodyEntity);
      chai.expect(entity.hashid).to.equal('def456');
      chai.expect(entity.sendDate).to.be.an.instanceOf(Date);
      chai.expect(entity.from).to.equal('sender@email.com');
      chai.expect(entity.to).to.equal('recipient@email.com');
      chai.expect(entity.contents).to.equal('Hello World!');
      chai.expect(entity.attachment).to.equal(null);
      chai.expect(entity.environment).to.equal('production');
    });
  });
});
