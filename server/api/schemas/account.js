var Joi = require('joi');

var schema = Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().optional(),
    website: Joi.string().optional()
});

module.exports = schema;