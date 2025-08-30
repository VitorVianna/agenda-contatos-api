import Joi from 'joi';

export const usuarioUpdateSchema = Joi.object({
  nome: Joi.string().min(2).max(120),
  email: Joi.string().email(),
  senha: Joi.string().min(6).max(60),
  dataNascimento: Joi.date().iso(),
  rg: Joi.string().allow('', null),
  cpf: Joi.string().allow('', null)
}).min(1);
