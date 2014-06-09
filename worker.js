var cluster = require('cluster');
var config  = require('config').Server
var restify = require('restify');

var parrot = function(req, res, next) {
    res.send({'accept-language': req.header('accept-language')});
    next();
};

exports.startServer = function() {
    var server = restify.createServer();
    server.get('/', parrot);

    server.listen(config.port, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
};
