import Joi from 'joi';

export const SignUpSchema = Joi.object ({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),    
})