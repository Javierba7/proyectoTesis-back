const Joi = require('joi');

const registerValidation = data => {
    const schema = new Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        name: Joi.string().min(3).required(),
        secondName: Joi.string().allow(null, ''),
        lastName: Joi.string(),
        secondLastName: Joi.string()  
    }); 
    return schema.validate(data)
};

const loginValidation = data => {
    const schema = new Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

module.exports = {
    loginValidation,
    registerValidation
};