// var environment = process.env.NODE_ENV || 'development';

var config = require('./config');
config.db = require('./db');
config.kafka = require('./kafka');

console.log('config: \n', config)

module.exports = config;