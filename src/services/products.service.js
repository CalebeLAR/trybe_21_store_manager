const { productsModel } = require('../models');

const requestAllProducts = async () => {
  const allProducts = await productsModel.getAllProductsFromDatabase();

  return { type: null, message: allProducts };
};

const requestProductById = async (productID) => {
  const product = await productsModel.getProductByIdFromDatabase(productID);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const requestAddNewProduct = async (newProduct) => {
  const newProductID = await productsModel.insertNewProductInTheDatabase(newProduct);

  const newProcustWithID = await productsModel.getProductByIdFromDatabase(newProductID);

  return { type: null, message: newProcustWithID };
};

module.exports = {
  requestAllProducts,
  requestProductById,
  requestAddNewProduct,
};