const pluginName = 'acl';
const _ = require('lodash');

var internals = {};

exports.register = function (server, options, next) {

    internals.options = options;

    //server.ext('onPreStart', internals.validateRoutes);
    server.ext('onPreHandler', internals.onPreHandler);

    next();
}

exports.register.attributes = {
    name: 'acl',
    version: '0.0.0'
    //pkg: require('../package.json')
};

internals.checkAccess = function(resource, method, roles) {

    if (!roles || !roles.length) return;

    let role = _.filter(roles, r => {
        return _.filter(r.permissions, p => {

            if (p.resource !== resource && p.resource !== '*') return false;

            return (method == 'post' && p.create)
                || (method == 'get' && p.read)
                || (method == 'update' && p.put)
                || (method == 'update' && p.patch)
                || (method == 'delete' && p.delete)
        })
    })

    return !!role
}

internals.onPreHandler = (request, reply) => {

    if(request.route.method === 'options')
        return reply.continue();

    if(request.route.settings.auth === false)
        return reply.continue();

    let settings = request.route.settings.plugins['acl'];

    if (!settings || settings.validate === false)
        return reply.continue();


    internals.options.getUserRoles(request)
        .then(roles => {
            return internals.checkAccess(settings.resource, request.route.method, roles)
        })
        .then(hasAccess => {
            if (hasAccess)
                reply.continue();
            else
                reply().code(403);
        })
        .catch(error => {
            reply({message: error}).code(500);
        })
    // ;

}