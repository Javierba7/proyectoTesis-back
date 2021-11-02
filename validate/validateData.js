const Joi = require('joi');

const registerValidation = data => {
    const schema = new Joi.object({
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(4).required(),
        name: Joi.string().min(3).required(),
        secondName: Joi.string().allow(null, ''),
        lastName: Joi.string(),
        secondLastName: Joi.string()  
    }); 
    return schema.validate(data)
};

const loginValidation = data => {
    const schema = new Joi.object({
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(data);
}

module.exports = {
    loginValidation,
    registerValidation
};