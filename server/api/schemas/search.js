var Joi = require('joi');

var schema = Joi.object().keys({
    searchText: Joi.string().optional().allow('').default(''),
    skip: Joi.number().integer().min(0).default(0),
    take: Joi.number().integer().min(1).max(100).default(20)
});

module.exports = schema;