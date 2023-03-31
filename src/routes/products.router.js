const express = require('express');
const { productsController } = require('../controllers');

const productsRouter = express.Router();

productsRouter.get('/', productsController.listAllProducts);

productsRouter.get('/:id', productsController.findProduct);

productsRouter.post('/', productsController.addNewProduct);

productsRouter.put('/:id', productsController.reeditProductById);

productsRouter.delete('/:id', productsController.deleteProdutctById);

module.exports = productsRouter;