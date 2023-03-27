const { mapError } = require('../utils/errorMap');
const { productsService } = require('../services');
const { valideteProductId, validateNewProduct } = require('./validations/productsValidations');

const listAllProducts = async (_req, res) => {
  const { message } = await productsService.requestAllProducts();

  // response
  return res.status(200).json(message);
};

const findProduct = async (req, res) => {
  const productId = Number(req.params.id);

  // validation params
  const error = valideteProductId(productId);
  if (error) return res.status(mapError(error.type)).json({ message: error.message });

  // call services
  const { type, message } = await productsService.requestProductById(productId);
  if (type) return res.status(mapError(type)).json({ message });

  // response
  res.status(200).json(message);
};

const addNewProduct = async (req, res) => {
  const newProduct = { ...req.body };

  // validation params
  const error = validateNewProduct(newProduct);
  if (error) return res.status(mapError(error.type)).json({ message: error.message });

  // call services
  const { type, message } = await productsService.requestAddNewProduct(newProduct);
  if (type) return res.status(mapError(type)).json({ message });

  // response
  return res.status(201).json(message);
};

module.exports = {
  listAllProducts,
  findProduct,
  addNewProduct,
};
