const sinon = require('sinon');
const { expect } = require('chai');
const mock = require('./mocks/products.service.mock');
const connection = require('../../../src/models/connection');
const { productsModel }  = require('../../../src/models');
const { productsServise } = require('../../../src/services');
const productsValidations = require('../../../src/services/validations/productsValidations');

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
    expect(response.message).to.be.equal('error accessing database');
  });

  it('testa o retorno da função requestProductById em caso de sucesso.', async function () {
    // Arrange
    const validId = 3;
    sinon.stub(productsModel, 'getProductByIdFromDatabase').resolves(mock.allProducts);
    // Act
    const response = await productsServise.requestProductById(validId);

    // Assert
    expect(productsModel.getProductByIdFromDatabase.calledWith(3)).to.be.equal(true);

    expect(response.type).to.be.equal(null);
    expect(response.message).to.deep.equal(mock.allProducts);
  });

  it('testa o retorno da função requestProductById nos casos de falha.', async function () {
    // Arrange
    const invalidId = 999;
    //"value" must be greater than or equal to 1
    //"value" must be a number
    //"value" must be an integer
    //"value" is required
    //Product not found
    sinon.stub(productsModel, 'getProductByIdFromDatabase').resolves(undefined);

    // Act
    const response = await productsServise.requestProductById(invalidId);

    // Assert
    expect(response.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(response.message).to.be.equal("Product not found");
    expect(productsModel.getProductByIdFromDatabase.calledWith(invalidId)).to.be.equal(true);
  });

  it('testa o retorno da função requestProductById nos casos de falha por parâmetro invalido.', async function () {
    // Arrange
    const errorGreater = '"value" must be greater than or equal to 1'
    const errorNumber = '"value" must be a number';
    const errorInteger = '"value" must be an integer';
    const typeError = 'INVALID_VALUE'

    sinon.stub(productsModel, 'getProductByIdFromDatabase').resolves();    

    //Act
    const responseGreater = await productsServise.requestProductById(0);
    //Assert
    expect(responseGreater.type).to.be.equal(typeError);
    expect(responseGreater.message).to.be.equal(errorGreater);
    expect(productsModel.getProductByIdFromDatabase.called).to.be.equal(false);


    //Act
    const responseNumber = await productsServise.requestProductById('g');
    //Assert
    expect(responseNumber.type).to.be.equal(typeError);
    expect(responseNumber.message).to.be.equal(errorNumber);
    expect(productsModel.getProductByIdFromDatabase.called).to.be.equal(false);


    //Act
    const responseInteger = await productsServise.requestProductById(0.9);
    //Assert
    expect(responseInteger.type).to.be.equal(typeError);
    expect(responseInteger.message).to.be.equal(errorInteger);
    expect(productsModel.getProductByIdFromDatabase.called).to.be.equal(false);

  });
});
