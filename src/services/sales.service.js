const { salesModel } = require('../models');

const { saleServicesUtils } = require('./utils');

const requestAddNewSale = async (arrSales) => {
  try {   
    // valida regras de negocio para cada produto
    const error = await saleServicesUtils.validAllSaleProductsExists(arrSales);
    if (error) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    const idNewSale = await saleServicesUtils.insertNewSaleProcess(arrSales);

    return { type: null, message: { id: idNewSale, itemsSold: arrSales } };
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: 'erro interno' };
  }
};

const requestAllsalesProducts = async () => {
  try {
    // chama a camada model
    const allProducts = await salesModel.getAllSaleProductFromDatabase();

    // response
    return { type: null, message: allProducts };
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: dataBaseError.message };
  }
};

const requestSaleById = async (saleID) => {
  try {
    // chama a camada model
    const product = await salesModel.getSaleProductByIdFromDatabase(saleID);
    if (!product.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

    // response
    return { type: null, message: product };
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: 'internal error' };
  }
};

module.exports = {
  requestAddNewSale,
  requestAllsalesProducts,
  requestSaleById,
};