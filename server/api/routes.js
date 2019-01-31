const Joi = require('joi')

let accountCtrl = require('./controllers/account')

module.exports = [
    { method: 'GET', path: '/account', handler: accountCtrl.get },
    { method: 'PUT', path: '/account', handler: accountCtrl.update },
]