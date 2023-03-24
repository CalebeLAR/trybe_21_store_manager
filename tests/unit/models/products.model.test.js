const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const mock = require('./mocks/products.model.mock');
const productsModel = require('../../../src/models/products.model');

describe('testes unitários para a camada model de produtos.', async function () {
  it('testa o retorno da função getAllProductsFromDatabase em caso de sucesso.', async function () {
    // Arrange
    const { allProducts } = mock;
    const sucessReponse = allProducts[0];
    sinon.stub(connection, 'execute').resolves(allProducts);

    // Act
    const response = await productsModel.getAllProductsFromDatabase();

    // Assert
    expect(response).to.be.deep.equal(allProducts[0]);

    sinon.restore();
  });

  it('testa o retorno da função getProductByIdFromDatabase em caso de sucesso.', async function () {
    // Arrange
    const { allProducts } = mock;
    const sucessResponse = allProducts[0][0] // primeiro produto.
    const productID = 1;
    sinon.stub(connection, 'execute').resolves(allProducts);

    // Act
    const response = await productsModel.getProductByIdFromDatabase(productID);

    // Assert
    expect(response).to.be.deep.equal(sucessResponse);

    sinon.restore();
  });
});