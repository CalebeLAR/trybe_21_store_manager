const { productIdShema, newProductShema } = require('./products.Shema');

const valideteProductId = (productID) => {
  const { error } = productIdShema.validate(productID);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return error;
};

const validateNewProduct = (newProduct) => {
  const { name } = newProduct;
  if (!name) return { type: 'MISSING_VALUE', message: '"name" is required' };

  const { error } = newProductShema.validate(newProduct);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return error;
};

module.exports = {
  valideteProductId,
  validateNewProduct,
};  