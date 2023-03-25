const Joi = require('joi');

const idShema = Joi.number().integer().min(1);

// exemplo de objeto pra usar depois
const reqBodyObject = Joi.object({
  name: Joi.string().min(3).required(),
});

module.exports = {
  idShema,
  reqBodyObject,
};
