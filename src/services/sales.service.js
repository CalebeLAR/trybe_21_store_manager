const { salesModel } = require('../models');

const { saleServicesUtils } = require('../services/utils');

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

const requestAllsales = async () => {
  try {
    // chama a camada model
    const allProducts = await salesModel.getAllSalesFromDatabase();

    // response
    return { type: null, message: allProducts };
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: 'internal error' };
  }
};

const requestSaleById = async (saleID) => {
  try {
    // chama a camada model
    const product = await salesModel.getSaleByIdFromDatabase(saleID);
    if (!product) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

    // response
    return { type: null, message: product };
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: 'internal error' };
  }
};


module.exports = {
  requestAddNewSale,
  requestAllsales,
  requestSaleById,
};