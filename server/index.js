var Glue = require('glue');


const options = {
    relativeTo: __dirname
};

Glue.compose(require('./glueManifest'), options, (err, server) => {

    if (err) {
        throw err;
    }

    server.start(() => {

        var table = server.table()
        var routes = table[0].table.map((t) => t.path)

        console.info('Server started \n', {
            uri: server.info.uri,
            routes
        });
    });
});