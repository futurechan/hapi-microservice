const _ = require('lodash')
const config = require('./config')
// const glueHelper = require('./glueHelper')

module.exports = {
    connections: [
        {
            port: process.env.PORT || config.PORT,
            router: {
                isCaseSensitive:false,
                stripTrailingSlash: true
            },
            routes: {
                validate: {
                    options: {
                        abortEarly: false,
                        stripUnknown: true
                    }
                }
            }
        }
    ],
    registrations: [
        {
            plugin: {
                register: 'good',
                options: {
                    ops: {
                        interval: 60000  // 1 minute
                    },
                    reporters: {
                        console: [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{ops: '*', error: '*', log: '*', response: '*'}]
                            },
                            {
                                module: 'good-console'
                            },
                            'stdout'
                        ]
                    }
                }
            }
        },
        {
            plugin: './authentication',
            options: {
                routes: {
                    prefix: '/auth'
                }
            }
        },
        {
            plugin: {
                register: './delegates'
            }
        },
/*
        {
            plugin: {
                register: './authorization',
                options: {
                    getUserRoles: (request) => {

                        let userRoleIds = request.auth.credentials.roles
                            .map(userRole => userRole.id)

                        return glueHelper.getRoles()
                            .then(roles => {
                                return _.filter(roles, role => {
                                    return userRoleIds.indexOf(role.id) > -1;
                                })
                            })
                    }
                }
            }
        },
*/
        {
            plugin: './api',
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        }
    ]
}