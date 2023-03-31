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
    const newProductAdded = await productsModel.getProductByIdFromDatabase(newProductID);

    // response
    return { type: null, message: newProductAdded };
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: 'internal error' };
  }
};

const requestReeditProductById = async (newProduct) => {
  try {
    // call model pra editar produto
    const affectedRows = await productsModel.reeditProductInTheDatabase(newProduct);
    if (!affectedRows) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    
    const uppdatedProduct = await productsModel.getProductByIdFromDatabase(newProduct.productId);

    return { type: null, message: uppdatedProduct };
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: dataBaseError.message };
  }
};

const requestDeleteProductById = async (productId) => {
  try {
    // call model pra editar produto
    const affectedRows = await productsModel.deleteProdutcByIdFromDatabase(productId);
    if (!affectedRows) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    return { type: null, message: affectedRows };
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: dataBaseError.message };
  }
};

module.exports = {
  requestAllProducts,
  requestProductById,
  requestAddNewProduct,
  requestReeditProductById,
  requestDeleteProductById,
};