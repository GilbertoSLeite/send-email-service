const chai = require('chai');
const sinon = require('sinon');
const BodyRepository = require('../../../infrastructure/repositories/body-repository');

describe('Testando a função responsável por iniciar o processo de validação do body', () => {
    let context, body, httpResponseTypeStub, schemaStub, validateStub;

    beforeEach(() => {
        context = {
            succeed: (response) => response
        };
        body = {
            name: 'John Doe',
            age: 30
        };
        httpResponseTypeStub = sinon.stub();
        validateStub = sinon.stub().resolves({ error: null });
        schemaStub = {
            validate: validateStub
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Validação com sucesso', () => {
        it('deve retornar true quando a validação for bem-sucedida', async () => {
            const bodyRepository = BodyRepository({
                httpResponseType: httpResponseTypeStub, 
                schema: schemaStub
            });
            const result = await bodyRepository(context, body);

            chai.expect(result).to.be.true;
        });
    });

    describe('Validação com erro', () => {
        it('deve retornar resposta de erro com status 422 quando a validação falhar', async () => {
            validateStub.resolves({ 
                error: { 
                    details: [
                        { message: 'O campo "age" é obrigatório' },
                        { message: 'O campo "email" é obrigatório' }
                    ] 
                }
            });           
            httpResponseTypeStub.returns({ unprocessableEntity: sinon.stub().returns({ message: 'O campo "age" é obrigatório, O campo "email" é obrigatório' }) });

            const bodyRepository = BodyRepository({
                httpResponseType: httpResponseTypeStub, 
                schema: schemaStub
            });
            const response = await bodyRepository(context, {});


            chai.expect(response).to.deep.equal({
                message: 'O campo "age" é obrigatório, O campo "email" é obrigatório'
            });
        });
    });

    describe('Erro inesperado', () => {
        it('deve retornar resposta de erro com status 500 quando ocorrer um erro inesperado', async () => {
            const errorMessage = 'Erro inesperado';
            validateStub.rejects(new Error(errorMessage));
            httpResponseTypeStub.returns({ internalServerError: sinon.stub().returns({ error: 'Error message' }) });

            const bodyRepository = BodyRepository({
                httpResponseType: httpResponseTypeStub, 
                schema: schemaStub
            });
            const response = await bodyRepository(context, 'teste');

            chai.expect(response).to.deep.equal({ error: 'Error message' });
        });
    })
});
