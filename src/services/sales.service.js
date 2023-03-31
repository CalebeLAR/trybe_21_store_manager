const { salesModel } = require('../models');
const { productsModel } = require('../models');

const { saleServicesUtils } = require('../services/utils');

const askToAddnewSaleProduct = async (arrSales) => {
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

module.exports = {
  askToAddnewSaleProduct,
};