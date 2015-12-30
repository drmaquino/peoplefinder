var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

db = null;

function connect (url) {
    MongoClient.connect(url, function(err, result) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            // console.log('Connection established to', url);
            db = result;
        }
    });
}

function middleware (req, res, next) {
    req.db = db;
    next();
}

module.exports = {
    connect: connect,
    middleware: middleware
};

