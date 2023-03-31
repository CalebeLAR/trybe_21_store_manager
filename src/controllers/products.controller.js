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

const reeditProductById = async (req, res) => {
  const productId = Number(req.params.id);
  const body = { ...req.body };

  // validation params
  const IdError = valideteProductId(productId);
  if (IdError) return res.status(mapError(IdError.type)).json({ message: IdError.message });

  const bodyError = validateNewProduct(body);
  if (bodyError) return res.status(mapError(bodyError.type)).json({ message: bodyError.message });

  // call services
  const newProduct = { productId, name: body.name };

  const { type, message } = await productsService.requestReeditProductById(newProduct);
  if (type) return res.status(mapError(type)).json({ message }); 

  res.status(200).json(message);
};

module.exports = {
  listAllProducts,
  findProduct,
  addNewProduct,
  reeditProductById,
};
