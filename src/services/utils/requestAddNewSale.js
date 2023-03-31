const { salesModel } = require('../../models');
const { productsModel } = require('../../models');

const validAllSaleProductsExists = async (arrSales) => {
  try {
    const arrProductsID = arrSales
      .map((sale) => productsModel.getProductByIdFromDatabase(sale.productId));

    const resolved = await Promise.allSettled(arrProductsID);
    const thereIsAError = resolved.some((d) => d.value === undefined);
    return thereIsAError;
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: 'erro interno' };
  }
};

const insertNewSaleProcess = async (arrSales) => {
  try {
    const newSaleId = await salesModel.getAllSalesFromDatabase();
    const newSaleProductId = await salesModel.insertNewSaleInTheDatabase(newSaleId.length);

    const allSalesPoductsPromisses = arrSales.map(
      (saleProduct) => salesModel.insertNewSaleProductInTheDatabase(
        { saleId: newSaleProductId, ...saleProduct },
      ),
    );

    await Promise.all(allSalesPoductsPromisses);

    const { id } = await salesModel.getSaleByIdFromDatabase(newSaleProductId);
    return id;
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: 'erro interno' };
  }
};

module.exports = {
  validAllSaleProductsExists,
  insertNewSaleProcess,
};