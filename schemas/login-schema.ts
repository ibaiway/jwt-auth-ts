import Joi from 'joi';

const schemaLogin = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
});

export default schemaLogin;
