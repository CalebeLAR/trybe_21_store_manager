const express = require('express');
const { productsServise } = require('../services');
const { procuctsModel } = require('../models');

const productsRouter = express.Router();

productsRouter.get('/products', async (req, res) => {
  const response = await productsServise.requestAllProducts();
  res.status(200).json(response.message);
});

productsRouter.get('/products/:id', async (req, res) => {
  const id = Number(req.params.id);
  const product = await procuctsModel.getProductByIdFromDatabase(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(product);
});

module.exports = productsRouter;