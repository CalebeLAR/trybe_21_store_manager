const { idShema } = require('./products.Shema');

const valideteProductId = async (productID) => {
  const { error } = idShema.validate(productID);

  return error;
};

module.exports = {
  valideteProductId,
};  