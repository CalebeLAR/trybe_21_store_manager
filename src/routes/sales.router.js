const express = require('express');
const { salesController } = require('../controllers');

const salesRouter = express.Router();

salesRouter.post('/', salesController.addNewSaleProduct);

module.exports = salesRouter;
