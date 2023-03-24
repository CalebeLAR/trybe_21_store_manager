const express = require('express');
const { productsServise } = require('../services');

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  const response = await productsServise.requestAllProducts();
  res.status(200).json(response.message);
});

productsRouter.get('/:id', async (req, res) => {
  const productId = Number(req.params.id);
  const response = await productsServise.requestProductById(productId);
  if (response.type) return res.status(404).json({ message: response.message });
  res.status(200).json(response.message);
});

module.exports = productsRouter;