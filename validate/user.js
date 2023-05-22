const Joi = require('joi');

const register = {
    body: Joi.object().keys({
        // email: Joi.string(),
        username : Joi.string().required(),
        password: Joi.string().required(),
        phone : Joi.string().regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
        grade :  Joi.string().allow(null)
    }),
};

module.exports = {
    register
}