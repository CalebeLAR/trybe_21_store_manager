// funções que acessam o banco de dados.
const camelize = require('camelize');
const connection = require('./connection');

const getAllProductsFromDatabase = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC;',
  );
  return camelize(result);
};

const getProductByIdFromDatabase = async (passengerId) => {
  const [[passenger]] = await connection.execute(
    'SELECT * FROM passengers WHERE id = ?',
    [passengerId],
  );
  return camelize(passenger);
};
  
  module.exports = {
    getAllProductsFromDatabase,
    getProductByIdFromDatabase,
  };