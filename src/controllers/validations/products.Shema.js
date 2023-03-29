const Joi = require('joi');

// valida o ID do produto que vem por parâmetro
const productIdShema = Joi.number().integer().min(1).required();

// valida o campo nome do id que vem por requisição
const newProductShema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  productIdShema,
  newProductShema,
};