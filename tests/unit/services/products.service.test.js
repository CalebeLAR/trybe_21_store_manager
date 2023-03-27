const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');

const mock = require('./mocks/products.service.mock');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

describe('testes unitários para a camada producs services.', async function () {

  afterEach(function () {
    sinon.restore();
  });

  describe('testes da função "requestAllProducts" que lista todos os produtos', function () {
    it('a função deve retornar uma lista de com todos produtos em caso de sucesso.', async function () {
      // Arrange
      sinon.stub(productsModel, 'getAllProductsFromDatabase').resolves(mock.allProducts);
      // Act
      const response = await productsService.requestAllProducts();

      // Assert
      expect(response.type).to.be.equal(null);
      expect(response.message).to.deep.equal(mock.allProducts);
    });
  });

  describe('testes da função requestProductById que lista apenas um produto', function () {
    it('a função deve retornar apenas um produto em caso de sucesso.', async function () {
      // Arrange
      const validId = 3;
      sinon.stub(productsModel, 'getProductByIdFromDatabase').resolves(mock.allProducts);
      // Act
      const response = await productsService.requestProductById(validId);

      // Assert
      expect(productsModel.getProductByIdFromDatabase.calledWith(3)).to.be.equal(true);

      expect(response.type).to.be.equal(null);
      expect(response.message).to.deep.equal(mock.allProducts);
    });

    it('a função deve retornar um objeto com as chaves type e message em caso de falha.', async function () {
      // Arrange
      const invalidId = 999;
      sinon.stub(productsModel, 'getProductByIdFromDatabase').resolves(undefined);

      // Act
      const response = await productsService.requestProductById(invalidId);

      // Assert
      expect(response.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(response.message).to.be.equal("Product not found");
      expect(productsModel.getProductByIdFromDatabase.calledWith(invalidId)).to.be.equal(true);
    });

    it('a função deve retornar um objeto com as chaves type e message, caso o ID nao seja um numero inteiro maior ou igual a 1.', async function () {
      // Arrange
      const errorGreater = '"value" must be greater than or equal to 1'
      const errorNumber = '"value" must be a number';
      const errorInteger = '"value" must be an integer';
      const typeError = 'INVALID_VALUE'

      sinon.stub(productsModel, 'getProductByIdFromDatabase').resolves();

      //Act
      const responseGreater = await productsService.requestProductById(0);
      //Assert
      expect(responseGreater.type).to.be.equal(typeError);
      expect(responseGreater.message).to.be.equal(errorGreater);
      expect(productsModel.getProductByIdFromDatabase.called).to.be.equal(false);


      //Act
      const responseNumber = await productsService.requestProductById('g');
      //Assert
      expect(responseNumber.type).to.be.equal(typeError);
      expect(responseNumber.message).to.be.equal(errorNumber);
      expect(productsModel.getProductByIdFromDatabase.called).to.be.equal(false);


      //Act
      const responseInteger = await productsService.requestProductById(0.9);
      //Assert
      expect(responseInteger.type).to.be.equal(typeError);
      expect(responseInteger.message).to.be.equal(errorInteger);
      expect(productsModel.getProductByIdFromDatabase.called).to.be.equal(false);
    });
  });
});

