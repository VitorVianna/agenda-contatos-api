import Joi from 'joi';

export const contatoCreateSchema = Joi.object({
  numeroTelefone: Joi.string().required()
});
