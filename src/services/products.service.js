const { procuctsModel } = require('../models');

const requestAllProducts = async () => {
  const allProducts = await procuctsModel.getAllProductsFromDatabase();
  
  return { type: null, message: allProducts };
};

module.exports = {
  requestAllProducts,
};
