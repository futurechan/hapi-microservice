const db = require('../db').sequelize
    , Account = db.model('Account')
    , messaging = require('api-common-events')
    , events = messaging.types
    , AccountUpdated = events.AccountUpdated;


class AccountUpdatedHandler extends messaging.EventHandler {

    constructor(consumer) {
        super(consumer);
    }

    filter(event) {
        return event.type == AccountUpdated.name
    }

    delegate(event) {

        Account.update(event.data,{
            where: {
                id: event.data.id
            }
        })
        .then(function(result){
            console.log("updated account", event)
        }).catch(function(err){
            console.log("Failed to update account", event, err)
        })
    }
}

module.exports = AccountUpdatedHandler;
