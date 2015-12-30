var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/pfdb';
var MongoClient = mongodb.MongoClient;

db = null;

MongoClient.connect(url, function(err, result) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
        db = result;
    }
});

module.exports = function (req, res, next) {
    req.db = db;
    next();
}

