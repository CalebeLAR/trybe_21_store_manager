const { productsModel } = require('../models');
const { valideteProductId } = require('./validations/productsValidations');

const requestAllProducts = async () => {
  const allProducts = await productsModel.getAllProductsFromDatabase();
  if (!allProducts) return { type: 'INTERNAL_ERROR', message: 'error accessing database' };

  return { type: null, message: allProducts };
};

const requestProductById = async (productID) => {
  const error = await valideteProductId(productID);
  if (error) return { type: 'INPUT_VALUE', message: error.message };

  const product = await productsModel.getProductByIdFromDatabase(productID);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

module.exports = {
  requestAllProducts,
  requestProductById,
};
