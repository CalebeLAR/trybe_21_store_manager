// funções que acessam o banco de dados.
const snakeize = require('snakeize');
const camelize = require('camelize');
const connection = require('./connection');

const getAllProductsFromDatabase = async () => {
  const [allProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC;',
  );
  return camelize(allProducts);
};

const getProductByIdFromDatabase = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return camelize(product);
};

const insertNewProductInTheDatabase = async (newProduct) => {
  const columns = Object.keys(snakeize(newProduct)).join(', ');

  const placeholders = Object.keys(newProduct)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(newProduct)],
  );
  return insertId;
};
  
  module.exports = {
    getAllProductsFromDatabase,
    getProductByIdFromDatabase,
    insertNewProductInTheDatabase,
  };