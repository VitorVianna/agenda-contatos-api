import Joi from 'joi';

export const enderecoCreateSchema = Joi.object({
  cep: Joi.string().required(),
  rua: Joi.string().required(),
  numero: Joi.string().required(),
  complemento: Joi.string().allow('', null),
  bairro: Joi.string().required(),
  cidade: Joi.string().required(),
  estado: Joi.string().length(2).required()
});
