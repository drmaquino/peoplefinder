var express = require("express");
var mongodb = require('mongodb');
var bodyParser = require('body-parser')

var port = 9000;
var app = express();

// Database url
var url = 'mongodb://localhost:27017/testdb';

// Mongo client
var MongoClient = mongodb.MongoClient;

// create application/json parser
var jsonParser = bodyParser.json()

/* routes */

// add person to db
app.post("/person", jsonParser, function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            res.sendStatus(400);
        } else {
            console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection('person');
            //Create a person
            var person = {
                name: req.body.fn,
                lastname: req.body.ln,
                image: req.body.image
            };
            // Insert person
            collection.insert(person, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }
                //Close connection
                db.close();
            })
        }
    });
    res.send(req.body); // echo the result back
});

// get all people
app.get("/person", jsonParser, function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            res.sendStatus(400);
        } else {
            console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection('person');
            // find all people
            collection.find({}).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result);
                    res.send({people: result});
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                }
                //Close connection
                db.close();
            });
        }
    });
});

app.listen(port);

console.log("listening on port", port);
