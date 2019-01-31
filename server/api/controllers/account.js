var db = require('../../db').sequelize
    , config = require('../../config')
    , Account = db.model('Account')
    , Boom = require('boom')
    , events = require('api-common-events').types
    , Producer = require('api-common-events').Producer
    , _ = require('lodash')
;

let producer = new Producer(config.kafka)

module.exports.get = (request, reply, next) => {

    Account.findById(request.auth.credentials.accountId,{
    }).then(function(account){
        if(!account) return null;

        return account.toDTO();
    }).then(function(account){
        if(!account) return reply().code(404);

        reply(account);
    }).catch(function(err){
        reply(Boom.wrap(new Error(err),500));
    })
}

module.exports.update = (request, reply) => {

    let data = _.defaults({
        id: request.auth.credentials.accountId
    }, request.payload);

    let event = new events.AccountUpdated(data);

    producer.sendEvent(event);

    reply()
}