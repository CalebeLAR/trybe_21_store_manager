const { productIdShema, newProductShema } = require('./products.Shema');

const valideteProductId = (productID) => {
  const { error } = productIdShema.validate(productID);

  return error;
};

const validateNewProduct = (newProduct) => {
  const { error } = newProductShema.validate(newProduct);

  return error;
};

module.exports = {
  valideteProductId,
  validateNewProduct,
};  