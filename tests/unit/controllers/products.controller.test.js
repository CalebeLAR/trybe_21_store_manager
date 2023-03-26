const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');

const { mapError } = require('../../../src/utils/errorMap')
const mock = require('./mocks/products.controller.mock');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

chai.use(sinonChai);

describe('testes unitários para a camada producs controller.', function () {

  afterEach(function () {
    sinon.restore();
  });

  describe('testes da função que lista todos os produtos', async function () {
    it('em caso de sucesso a função listAllProducts deve retornar uma lista com todos os produto, e um status code 200.', async function () {
      // Arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'requestAllProducts')
        .resolves({ type: null, message: mock.allProducts });
      

      // Act
      await productsController.listAllProducts(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mock.allProducts);
    });
  })

  describe('testes da função que lista apenas um produto', function () {
    it('em caso de sucesso a função findProduct deve retornar o produto com id requerido, e um status code 200.', async function () {
      // Arrange
      const productID = 1
      const res = {};
      const req = { params: { id: productID } };

      const [product] = mock.allProducts;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()

      sinon.stub(productsService, 'requestProductById')
        .resolves({ type: null, message: product })

      // Act
      await productsController.findProduct(req, res);

      // Asserts
      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith({ ...product })
    });

    it('em caso de rejeição a função findProduct deve retornar uma mensagem de erro, e um status code 404.', async function () {
      // Arrange
      const productID = 1
      const res = {};
      const req = { params: { id: productID } };

      const [product] = mock.allProducts;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()

      sinon.stub(productsService, 'requestProductById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })

      // Act
      await productsController.findProduct(req, res);

      // Asserts
      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: 'Product not found' })
    });

    it('em caso de falha por parametro inválido a função findProduct deve retornar uma mensagem de erro, e um status code 422.', async function () {
      // Arrange
      const productID = 1
      const res = {};
      const req = { params: { id: productID } };

      const [product] = mock.allProducts;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()

      sinon.stub(productsService, 'requestProductById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })

      // Act
      await productsController.findProduct(req, res);

      // Asserts
      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: 'Product not found' })
    });
  });
});