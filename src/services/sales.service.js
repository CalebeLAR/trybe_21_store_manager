const { salesModel } = require('../models');
const { productsModel } = require('../models');

const validAllProductsExists = async (arrSales) => {
  const arrProductsID = arrSales
    .map((sale) => productsModel.getProductByIdFromDatabase(sale.productId));

  const resolved = await Promise.allSettled(arrProductsID);
  const thereIsAError = resolved.some((d) => d.value === undefined);
  return thereIsAError;
};

const askToAddnewSaleProduct = async (arrSales) => {
  try {
    // valida regras de negocio para cada produto
    const error = await validAllProductsExists(arrSales);
    if (error) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    const newSaleId = await salesModel.getAllSalesFromDatabase();
    const newSaleProductId = await salesModel.insertNewSaleInTheDatabase(newSaleId.length);

    const allSalesPoductsPromisses = arrSales.map(
      (saleProduct) => salesModel.insertNewSaleProductInTheDatabase(
        { saleId: newSaleProductId, ...saleProduct },
      ),
    );

    await Promise.all(allSalesPoductsPromisses);

    const { id } = await salesModel.getSaleByIdFromDatabase(newSaleProductId);
    // const salesProductsAdded = await salesModel.getSaleProductByIdFromDatabase(id);
    const report = { id, itemsSold: arrSales };

    return { type: null, message: report };
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: dataBaseError.message };
  }
};

module.exports = {
  askToAddnewSaleProduct,
};