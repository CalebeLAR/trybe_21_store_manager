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

  describe('testes da função "requestAllProducts" que pede uma lista com todos os produtos', function () {
    it('deve retornar uma lista de com todos produtos em caso de sucesso.', async function () {
      // Arrange
      sinon.stub(productsModel, 'getAllProductsFromDatabase').resolves(mock.allProducts);
      // Act
      const response = await productsService.requestAllProducts();

      // Assert
      expect(response.type).to.be.equal(null);
      expect(response.message).to.deep.equal(mock.allProducts);
    });

    it('deve retornar uma mensagem de erro em caso de falha no acesso ao banco de dados.', async function () {
      // Arrange
      const internalError = { type: 'INTERNAL_ERROR', message: 'internal error' }
      sinon.stub(connection, 'execute').returns(undefined);

      // Act
      const response = await productsService.requestAllProducts();

      // Assert
      expect(response).to.be.deep.equal(internalError);
    });
  });

  describe('testes da função "requestProductById" que pede por apenas um produto', function () {
    it('deve retornar apenas um produto em caso de sucesso.', async function () {
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

    it('deve retornar uma mensagem de erro em caso de rejeição.', async function () {
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

    it('deve retornar uma mensagem de erro em caso de falha no acesso ao banco de dados.', async function () {
      // Arrange
      const internalError = { type: 'INTERNAL_ERROR', message: 'internal error' }
      sinon.stub(connection, 'execute').returns(undefined);

      // Act
      const response = await productsService.requestProductById(3);

      // Assert
      expect(response).to.be.deep.equal(internalError);
    });
  });

  describe('testes da função "requestAddNewProduct" que pede para adicionar um novo produto', function () {
    it('em caso de sucesso a função deve adicionar no banco de dados um novo produto e retornar o mesmo.', async function () {
      // Arrange
      const newProductID = 4;
      const newProduct = { name: 'newProduct' };
      const newProductWithID = { id: 4, name: 'newProduct' };
      
      sinon.stub(productsModel, 'insertNewProductInTheDatabase').resolves(newProductID);
      sinon.stub(productsModel, 'getProductByIdFromDatabase').resolves({ id: newProductID, ...newProduct });
      // Act
      const response = await productsService.requestAddNewProduct(newProduct);

      // Asserts
      expect(productsModel.insertNewProductInTheDatabase).to.have.been.calledWith(newProduct);
      expect(productsModel.getProductByIdFromDatabase).to.have.been.calledWith(4);
      
      expect(response).to.be.deep.equal({ type: null, message: newProductWithID });
    });
    it('deve retornar uma mensagem de erro em caso de falha no acesso ao banco de dados.', async function () {
      // Arrange
      const newProduct = {name: 'newProduct'}
      const internalError = { type: 'INTERNAL_ERROR', message: 'internal error' }

      sinon.stub(connection, 'execute').returns(undefined);

      // Act
      const response = await productsService.requestAddNewProduct(newProduct);

      // Assert
      expect(response).to.be.deep.equal(internalError);
    });
  });
});

