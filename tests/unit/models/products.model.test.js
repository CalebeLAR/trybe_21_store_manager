const sinon = require('sinon');
const { exect } = require('chai');
const connection = require('../../../src/models/connection');
const mockProducts = require('./moks/products.model.mock');
const productsModel = require('../../../src/models/products.model');

describe('testes unitários para a camada model de produtos.', async function () {
  it('testa o retorno da função getAllProductsFromDatabase em caso de sucesso.', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves(mockProducts.allProducts);
    // Act
    const sucessResponse = productsModel.getAllProductsFromDatabase();
    console.log(sucessResponse);
    // Assert

    
    sinon.restore();
  });

  it('testa o retorno da função getProductByIdFromDatabase em caso de sucesso.', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves(mockProducts.allProducts);
    // Act
    const sucessResponse = productsModel.getProductByIdFromDatabase();
    console.log(sucessResponse);
    // Assert


    sinon.restore();
  });
});