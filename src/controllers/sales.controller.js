const { salesService } = require('../services');
const {
  validateSaleProduct, validateSaleProductID } = require('./validations/saleProductsValidation');
const { mapError } = require('../utils/errorMap');

const addNewSaleProduct = async (req, res) => {
  const saleProducts = req.body;

  // validation params
  const error = validateSaleProduct(saleProducts);
  if (error) return res.status(mapError(error.type)).json({ message: error.message });

  // service
  const { type, message } = await salesService.requestAddNewSale(saleProducts);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

const listAllSaleProducts = async (req, res) => {
  // chama service
  const { message } = await salesService.requestAllsalesProducts();

  // response
  return res.status(200).json(message);
};

const findSaleProducts = async (req, res) => {
  const id = Number(req.params.id);

  // valida id
  const error = validateSaleProductID(id);
  if (error) return res.status(mapError(error.type)).json({ message: error.message });

  // call services
  const { type, message } = await salesService.requestSaleById(id);
  if (type) return res.status(mapError(type)).json({ message });

  // response
  res.status(200).json(message);
};

module.exports = {
  addNewSaleProduct,
  listAllSaleProducts,
  findSaleProducts,
};