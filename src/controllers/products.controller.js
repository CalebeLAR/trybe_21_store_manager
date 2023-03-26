const { productsService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listAllProducts = async (_req, res) => {
  const { message } = await productsService.requestAllProducts();

  return res.status(200).json(message);
};

const findProduct = async (req, res) => {
  const productId = Number(req.params.id);
  const { type, message } = await productsService.requestProductById(productId);

  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  listAllProducts,
  findProduct,
};
