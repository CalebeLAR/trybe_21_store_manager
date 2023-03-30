const express = require('express');
const { salesService } = require('../services');
const { validateSaleProduct } = require('../controllers/validations/saleProductsValidation');

const salesRouter = express.Router();

// controller  addNewSaleProduct  
salesRouter.post('/', async (req, res) => {
  const saleProducts = req.body;

  // validation params
  const error = validateSaleProduct(saleProducts);
  if (error) return res.status(200).json(error.message);

  // service
  const { message } = await salesService.askToAddnewSaleProduct(saleProducts);

  // response
  res.status(200).json(message);
});

module.exports = salesRouter;
