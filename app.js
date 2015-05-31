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

app.post("/person", jsonParser, function (req, res) {

    MongoClient.connect(url, function (err, db)
    {
        if (err)
        {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            res.sendStatus(400);
        }
        else
        {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('person');

            //Create some users
            var person = {name: req.body.fn, lastname: req.body.ln, image: req.body.image};

            // Insert some users
            collection.insert(person, function (err, result)
            {
                if (err)
                {
                    console.log(err);
                }
                else
                {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }
                //Close connection
                db.close();
            })
        }
    });
    res.send(req.body);    // echo the result back
});

app.listen(port);

console.log("listening on port", port);
