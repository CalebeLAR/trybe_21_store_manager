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
      // value is not a integer
      let res = {};
      let req = { params: { id: 0.9 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()
      await productsController.findProduct(req, res);
      expect(res.status).to.be.calledWith(422);
      expect(res.json).to.be.calledWith({ message: '"value" must be an integer' })
      sinon.restore();


      // value must be greater than or equal to 1
      res = {};
      req = { params: { id: 0 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()
      await productsController.findProduct(req, res);
      expect(res.status).to.be.calledWith(422);
      expect(res.json).to.be.calledWith({ message: '"value" must be greater than or equal to 1' })
      sinon.restore();

      // value must be a number
      res = {};
      req = { params: { id: 'string' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()
      await productsController.findProduct(req, res);
      expect(res.status).to.be.calledWith(422);
      expect(res.json).to.be.calledWith({ message: '"value" must be a number' })
      sinon.restore();

      // value must be a number
      res = {};
      req = { params: { id: 'string' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()
      await productsController.findProduct(req, res);
      expect(res.status).to.be.calledWith(422);
      expect(res.json).to.be.calledWith({ message: '"value" must be a number' })
      sinon.restore();
    });
  });

  describe('testes da função "addNewProduct" que mostra novo o produto que foi adicionado', function () {
    it('em caso de sucesso retorna um objeto com nome e id no novo produto, e um status code 201.', async function () {
      //Arrange
      const newProduct = { name: 'newProduct' }
      const req = {}
      const res = {}

      req.body = newProduct;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const serviceResponse = { type: null, message: { id: 4, ...newProduct } };
      const message = { id: 4, ...newProduct };

      sinon.stub(productsService, 'requestAddNewProduct').resolves(serviceResponse);

      //Act
      await productsController.addNewProduct(req, res);

      //Asserts
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(message);
    });
    it('em caso de rejeição retorna uma mensagem de erro e o status code do erro.', async function () {
      // Arrange
      const newProduct = { name: 'newProduct' }
      const req = {}
      const res = {}

      req.body = newProduct;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const serviceResponse = { type: 'INTERNAL_ERROR', message: 'internal error' }
      const message = { message: 'internal error' };

      sinon.stub(productsService, 'requestAddNewProduct').resolves(serviceResponse);

      // Act
      await productsController.addNewProduct(req, res);

      //Asserts
      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(message);
    });
    it.skip('retorna uma mensagem de erro e o status code do erro em caso de falha por validação de parâmetro, ', async function () { });
  });
});


// it('a função deve retornar um objeto com as chaves type e message, caso o ID nao seja um numero inteiro maior ou igual a 1.', async function () {
//   // Arrange
//   const errorGreater = '"value" must be greater than or equal to 1'
//   const errorNumber = '"value" must be a number';
//   const errorInteger = '"value" must be an integer';
//   const typeError = 'INVALID_VALUE'

//   sinon.stub(productsModel, 'getProductByIdFromDatabase').resolves();

//   //Act
//   const responseGreater = await productsService.requestProductById(0);
//   //Assert
//   expect(responseGreater.type).to.be.equal(typeError);
//   expect(responseGreater.message).to.be.equal(errorGreater);
//   expect(productsModel.getProductByIdFromDatabase.called).to.be.equal(false);


//   //Act
//   const responseNumber = await productsService.requestProductById('g');
//   //Assert
//   expect(responseNumber.type).to.be.equal(typeError);
//   expect(responseNumber.message).to.be.equal(errorNumber);
//   expect(productsModel.getProductByIdFromDatabase.called).to.be.equal(false);


//   //Act
//   const responseInteger = await productsService.requestProductById(0.9);
//   //Assert
//   expect(responseInteger.type).to.be.equal(typeError);
//   expect(responseInteger.message).to.be.equal(errorInteger);
//   expect(productsModel.getProductByIdFromDatabase.called).to.be.equal(false);
// });