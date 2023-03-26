const { productsModel } = require('../models');
const { valideteProductId, validateNewProduct } = require('./validations/productsValidations');

const requestAllProducts = async () => {
  const allProducts = await productsModel.getAllProductsFromDatabase();

  return { type: null, message: allProducts };
};

const requestProductById = async (productID) => {
  const error = await valideteProductId(productID);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const product = await productsModel.getProductByIdFromDatabase(productID);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const requestAddNewProduct = async (newProduct) => {
  const error = await validateNewProduct(newProduct);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const newProductID = await productsModel.insertNewProductInTheDatabase(newProduct);

  const newProcustWithID = await productsModel.getProductByIdFromDatabase(newProductID);

  return { type: null, message: newProcustWithID };
};

module.exports = {
  requestAllProducts,
  requestProductById,
  requestAddNewProduct,
};