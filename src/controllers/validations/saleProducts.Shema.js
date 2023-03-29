const Joi = require('joi');

// valida o array de salesProducts que vem por requisição
const saleProductShema = Joi.array().items(
  Joi.object({
    productId: Joi.number().integer().min(1).required(),
    quantity: Joi.number().integer().min(1).required(),
  }),
);

module.exports = {
  saleProductShema,
};
