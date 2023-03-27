const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const mock = require('./mocks/products.model.mock');
const productsModel = require('../../../src/models/products.model');

describe('testes unitários para a camada producs models.', async function () {
  describe('testa a função "getAllProductsFromDatabase" que retorna todos os produtos do banco de dados', function () {
    it('a função deve retornar todos os produtos no banco de dados.', async function () {
      // Arrange
      const { getAllProductsResponse } = mock;
      const sucessReponse = getAllProductsResponse[0];
      sinon.stub(connection, 'execute').resolves(getAllProductsResponse);

      // Act
      const response = await productsModel.getAllProductsFromDatabase();

      // Assert
      expect(response).to.be.deep.equal(getAllProductsResponse[0]);

      sinon.restore();
    });
  });

  describe('testa a função "getProductByIdFromDatabase" que retorna um unico produto no banco de dados', async function () {
    it('deve retornar um objeto com nome e id do produto.', async function () {
      // Arrange
      const { getAllProductsResponse } = mock;
      const sucessResponse = getAllProductsResponse[0][0] // primeiro produto.
      const productID = 1;
      sinon.stub(connection, 'execute').resolves(getAllProductsResponse);

      // Act
      const response = await productsModel.getProductByIdFromDatabase(productID);

      // Assert
      expect(response).to.be.deep.equal(sucessResponse);

      sinon.restore();
    });
  });
  describe('testa a função "insertNewProductInTheDatabase" que injeta um novo produto no banco de dados', async function () {
    it('deve inserir o novo produto no banco de dados e retornar seu ID.', async function () {
      // Arrange
      const newProduct = { name: 'novoProduto' }
      const newProductWithID = [[{ name: 'novoProduto', id: 4 }]]
      
      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves(mock.insertNewProductResponse)
        .onSecondCall()
        .resolves(newProductWithID);
      
      // Act
      const iTisReturnID = await productsModel.insertNewProductInTheDatabase(newProduct);
      const isAdded = await productsModel.getProductByIdFromDatabase(4)
      // Assert
      expect(iTisReturnID).to.be.equal(4);
      expect(isAdded).to.be.deep.equal({ name: 'novoProduto', id: 4 });

    });
  });
});