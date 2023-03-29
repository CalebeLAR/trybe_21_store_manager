const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const getSaleByIdFromDatabase = async (saleID) => {
  const [[sale]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [saleID],
  );

  return camelize(sale);
};

const insertNewSaleInTheDatabase = (_dataTime) => {
  // colocar um novo id em sale;
  // pegar um id de sales
};

const insertNewSaleProductInTheDatabase = (_saleID, _productID) => {
  // colocar um novo id em sale;
  // pegar um id de sales
};

module.exports = {
  insertNewSaleInTheDatabase,
  getSaleByIdFromDatabase,
  insertNewSaleProductInTheDatabase,
};