const { productsServise } = require('../services');
const { mapError } = require('../utils/errorMap');

const listAllProducts = async (req, res) => {
  const { type, message } = await productsServise.requestAllProducts();
  if (type) return res.status(mapError(type)).json(message);

  return res.status(200).json(message);
};

const findProduct = async (req, res) => {
  const productId = Number(req.params.id);
  const response = await productsServise.requestProductById(productId);
  if (response.type) return res.status(404).json({ message: response.message });
  res.status(200).json(response.message);
};

module.exports = {
  listAllProducts,
  findProduct,
};
