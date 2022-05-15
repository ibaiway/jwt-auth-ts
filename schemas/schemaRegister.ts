import Joi from 'joi';

const schemaRegister = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .min(8)
    .regex(/[a-z]+/)
    .message('Lowercase character is required')
    .regex(/[A-Z]+/)
    .message('Uppercase character is required')
    .regex(/\d+/)
    .message('A number is required')
});

export default schemaRegister;
