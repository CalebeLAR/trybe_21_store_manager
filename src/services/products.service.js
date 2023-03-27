const { productsModel } = require('../models');

const requestAllProducts = async () => {
  try {
    // chama a camada model
    const allProducts = await productsModel.getAllProductsFromDatabase();

    // response
    return { type: null, message: allProducts };
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: 'internal error' };
  }
};

const requestProductById = async (productID) => {
  try {
    // chama a camada model
    const product = await productsModel.getProductByIdFromDatabase(productID);
    if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    // response
    return { type: null, message: product };
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: 'internal error' };
  }
};

const requestAddNewProduct = async (newProduct) => {
  try {
    // chama a camada model
    const newProductID = await productsModel.insertNewProductInTheDatabase(newProduct);
    const newProductWithID = await productsModel.getProductByIdFromDatabase(newProductID);

    // response
    return { type: null, message: newProductWithID };
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: 'internal error' };
  }
};

module.exports = {
  requestAllProducts,
  requestProductById,
  requestAddNewProduct,
};