'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config')
const moment = require('moment');


exports.register = (server, options, next) => {

    server.register(require('hapi-auth-bearer-token'), function (err) {

        server.auth.strategy('simple', 'bearer-access-token', true, {
            allowQueryToken: true,              // optional, true by default
            allowMultipleHeaders: false,        // optional, false by default
            validateFunc: function( token, callback ) {

                var payload = jwt.decode(token, config.TOKEN_SECRET);

                // if (payload.exp <= moment().unix())
                //     return callback(null, false)

                callback(null, true, payload.user);
            }
        });
    });

    // server.auth.default('simple');

    next();
};

exports.register.attributes = {
    name: 'authentication',
    version: '0.0.0'
};