const { saleProductShema } = require('./saleProducts.Shema');

const validateSaleProduct = (saleProduct) => {
  const { error } = saleProductShema.validate(saleProduct);
  
  if (error && error.message.includes('require')) {
    return { type: 'MISSING_VALUE', message: `"${error.message.slice(5)}` };
  }

  if (error) {
    return { type: 'INVALID_VALUE', message: `"${error.message.slice(5)}` };
  }

  return error;
};

module.exports = {
  validateSaleProduct,
};