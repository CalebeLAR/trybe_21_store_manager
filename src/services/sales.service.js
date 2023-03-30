const { salesModel } = require('../models');
const { productsModel } = require('../models');

const validAllProductsExists = async (arrSales) => {
  const arrProductsID = arrSales
    .map((sale) => productsModel.getProductByIdFromDatabase(sale.productId));

  const resolved = await Promise.allSettled(arrProductsID);
  const thereIsAError = resolved.some((d) => d.value === undefined);
  return thereIsAError;
};

const creteNewSales = async (arrSales) => {
  const firstNewSaleId = await salesModel.getAllSalesFromDatabase().length;

  const newSalesID = arrSales.map((_sale, i) => {
    const saleId = salesModel.insertNewSaleInTheDatabase({
      id: i + firstNewSaleId,
    });
    return saleId;
  });

  const salesID = await Promise.all(newSalesID);

  const saleProducts = arrSales.map((sale, i) => {
    const objectSaleProduct = {
      saleId: salesID[i],
      productId: sale.productId,
      quantity: sale.quantity,
    };

    return objectSaleProduct;
  });

  return saleProducts.sort((prev, next) => prev.id - next.id);
};

const addAllSalesProduct = async (saleProducts) => {
  const newSaleProducts = saleProducts.map(
    (saleProduct) => salesModel.insertNewSaleProductInTheDatabase(saleProduct),
  );

  await Promise.all(newSaleProducts);

  const newSaleProductsAdded = saleProducts.map(
    (saleProduct) => salesModel.getSaleProductByIdFromDatabase(saleProduct.saleId),
  );

  const saleProductAdded = await Promise.all(newSaleProductsAdded);
  return saleProductAdded;
};

const askToAddnewSaleProduct = async (arrSales) => {
  try {
    // valida regras de negocio para cada produto
    const error = await validAllProductsExists(arrSales);
    if (error) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    const saleProducts = await creteNewSales(arrSales);
    const saleProductsAdded = await addAllSalesProduct(saleProducts);

    return { type: null, message: saleProductsAdded };
  } catch (dataBaseError) {
    return { type: 'INTERNAL_ERROR', message: dataBaseError.message };
  }
};

module.exports = {
  askToAddnewSaleProduct,
};