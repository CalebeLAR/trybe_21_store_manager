// funções que acessam o banco de dados.
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
  
  module.exports = {
    getAllProductsFromDatabase,
    getProductByIdFromDatabase,
  };