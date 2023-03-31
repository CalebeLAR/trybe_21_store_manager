const express = require('express');
const { salesController } = require('../controllers');

const salesRouter = express.Router();

salesRouter.get('/', salesController.listAllSaleProducts);

salesRouter.get('/:id', salesController.findSaleProducts);

salesRouter.post('/', salesController.addNewSaleProduct);


module.exports = salesRouter;
