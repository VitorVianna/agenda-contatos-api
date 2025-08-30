import Joi from 'joi';

export const registerSchema = Joi.object({
  nome: Joi.string().min(2).max(120).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).max(60).required(),
  dataNascimento: Joi.date().iso().optional(),
  rg: Joi.string().allow('', null),
  cpf: Joi.string().allow('', null)
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().required()
});
