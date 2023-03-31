const {salesService} = require('../services');
const { validateSaleProduct } = require('../controllers/validations/saleProductsValidation');
const { mapError } = require('../utils/errorMap');


const addNewSaleProduct = async (req, res) => {
  const saleProducts = req.body;

  // validation params
  const error = validateSaleProduct(saleProducts);
  if (error) return res.status(mapError(error.type)).json({ message: error.message });

  // service
  const { type, message } = await salesService.askToAddnewSaleProduct(saleProducts);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  addNewSaleProduct,
}