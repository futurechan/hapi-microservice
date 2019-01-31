
var Sequelize = require('sequelize')
    , config = require('../config')
    , fs = require('fs')
    , path = require('path')
    , glob = require('glob')
    , db = {}
    , child_process = require('child_process')
;

child_process.execSync('node_modules/.bin/sequelize db:migrate');

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    define: config.db.define,
    schema: config.db.schema,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});


glob.sync('**/models/*', { cwd: path.join(__dirname, '../')})
    .forEach(file => {
        var model = sequelize['import'](path.join(__dirname, '..', file));
        db[model.name] = model;
    })


Object.keys(db)
    .forEach(function(modelName) {
        if ('associate' in db[modelName]) {
            db[modelName].associate(db);
        }
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;