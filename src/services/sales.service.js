const { salesModel } = require('../models');
const { productsModel } = require('../models');

const validAllProductsExists = async (arrSales) => {
  try {
    const arrProductsID = arrSales
    .map((sale) => productsModel.getProductByIdFromDatabase(sale.productId));
    
    const resolved = await Promise.allSettled(arrProductsID);
    const thereIsAError = resolved.some((d) => d.value === undefined);
    return thereIsAError;

  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: dataBaseError.message };
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
    return { type: 'INTERNAL_ERROR', message: dataBaseError.message };
  }
}

const askToAddnewSaleProduct = async (arrSales) => {
  try {
    // valida regras de negocio para cada produto
    const error = await validAllProductsExists(arrSales);
    if (error) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    const idNewSale = await insertNewSaleProcess(arrSales);

    return { type: null, message: { id: idNewSale, itemsSold: arrSales } };
  } catch (dataBaseError) {
    
    return { type: 'INTERNAL_ERROR', message: dataBaseError.message };
  }
};

module.exports = {
  askToAddnewSaleProduct,
};