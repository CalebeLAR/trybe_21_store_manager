const express = require('express');
const { procuctsModel } = require('../models');

const productsRouter = express.Router();

productsRouter.get('/products', async (req, res) => {
  const allProducts = await procuctsModel.getAllProductsFromDatabase();
  res.status(200).json(allProducts);
});

productsRouter.get('/products/:id', async (req, res) => {
  const id = Number(req.params.id);
  const product = await procuctsModel.getProductByIdFromDatabase(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(product);
});

module.exports = productsRouter;