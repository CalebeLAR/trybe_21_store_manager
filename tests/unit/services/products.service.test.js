const sinon = require('sinon');
const { expect } = require('chai');
const mock = require('./mocks/products.service.mock');
const connection = require('../../../src/models/connection');
const { productsModel }  = require('../../../src/models');
const { productsServise }  = require('../../../src/services');

describe('testes unitários para a camada service de produtos.', async function () {
  
  afterEach(function () {
    sinon.restore();
  });

  it('testa o retorno da função requestAllProducts em caso de sucesso.', async function () {
    // Arrange
    sinon.stub(productsModel, 'getAllProductsFromDatabase').resolves(mock.allProducts);
    // Act
    const response = await productsServise.requestAllProducts();

    // Assert
    expect(response.type).to.be.equal(null);
    expect(response.message).to.deep.equal(mock.allProducts);
  });

  it('testa o retorno da função requestAllProducts em caso de falha.', async function () {
    // Arrange
    sinon.stub(productsModel, 'getAllProductsFromDatabase').resolves(undefined);
    // Act
    const response = await productsServise.requestAllProducts();

    // Assert
    expect(response.type).to.be.equal('INTERNAL_ERROR');
    expect(response.message).to.deep.equal('error accessing database');
  });

  // it('testa o retorno da função requestProductById em caso de sucesso.', async function () {
  //   // Arrange
  //   // Act
  //   // Assert
  // });

  // it('testa o retorno da função requestProductById em caso de sucesso.', async function () {
  //   // Arrange
  //   // Act
  //   // Assert
  // });
});