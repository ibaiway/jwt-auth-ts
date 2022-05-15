import Joi from 'joi';

const schemaRegister = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .min(8)
    .regex(/[a-z]{1,}/)
    .message('Lowercase character is required')
    .regex(/[A-Z]{1,}/)
    .message('Uppercase character is required')
    .regex(/[0-9]{1,}/)
    .message('A number is required')
});

export default schemaRegister;
