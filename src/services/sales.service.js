const { salesModel } = require('../models');

const requestSaleById = async (saleID) => {
  try {
    // chama a camada model
    const result = await salesModel.getSaleByIdFromDatabase(saleID);
    // response
    return result;
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: 'internal error' };
  }
};

module.exports = {
  requestSaleById,
};