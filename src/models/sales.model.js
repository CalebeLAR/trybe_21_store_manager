const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const getAllSalesFromDatabase = async () => {
  const [allSales] = await connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY id ASC;',
  );
  return camelize(allSales);
};

const getSaleProductByIdFromDatabase = async (saleProductID) => {
  const [sale] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [saleProductID],
  );

  return camelize(sale);
};

const getSaleByIdFromDatabase = async (saleID) => {
  const [[sale]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [saleID],
  );

  return camelize(sale);
};

const insertNewSaleInTheDatabase = async (saleID) => {
  const columns = Object.keys(snakeize(saleID)).join(', ');

  const placeholders = Object.keys(saleID)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales (${columns}) VALUE (${placeholders})`,
    [...Object.values(saleID)],
  );
  return insertId;
};

const insertNewSaleProductInTheDatabase = async (salePeoduct) => {
  const columns = Object.keys(snakeize(salePeoduct)).join(', ');

  const placeholders = Object.keys(salePeoduct)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (${columns}) VALUE (${placeholders})`,
    [...Object.values(salePeoduct)],
  );
  return insertId;
};

module.exports = {
  getAllSalesFromDatabase,
  getSaleByIdFromDatabase,
  getSaleProductByIdFromDatabase,
  insertNewSaleInTheDatabase,
  insertNewSaleProductInTheDatabase,
};