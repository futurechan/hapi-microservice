const db = require('../db').sequelize
    , Account = db.model('Account')
    , messaging = require('api-common-events')
    , events = messaging.types


class SignedUpHandler extends messaging.EventHandler {

    constructor(consumer) {
        super(consumer);
    }

    filter(event) {
        return event.type == events.SignedUp.name
    }

    delegate(event) {

        Account.create({
            id: event.data.accountId,
            name: event.data.accountName
        })
        .then(function(result){
            console.log("Created account", event)
        }).catch(function(err){
            console.log("Failed to create account", event, err)
        })
    }
}

module.exports = SignedUpHandler;
