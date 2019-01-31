const pkg = require('../../package.json')
    , config = require('../config').kafka
    , messaging = require('api-common-events');

let Handlers = [
    SignedUpHandler = require('./SignedUp')
    , AccountUpdatedHandler = require('./AccountUpdated')
]


exports.register = function (server, options, next) {

    let consumer = messaging.getConsumer(config, pkg.name)
    let handlers = messaging.wireUpHandlers(consumer, Handlers);

    next();
}

exports.register.attributes = {
    name: 'delegates',
    version: '0.0.0'
    //pkg: require('../package.json')
};



