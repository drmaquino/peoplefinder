var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send({text:"API root"});
});

/* GET son todos putos. */
router.get('/sontodosputos', function(req, res, next) {
    res.send('todos son putos');
});

/* POST to person */
router.post("/person", function(req, res, next) {
    console.log(req.body)
    res.send(req.body);
    // // Get db
    // var db = req.db
    // // Get the documents collection
    // var collection = db.collection('person');
    // // Create a person
    // var person = {
    //     pair: req.body.name.charAt(0).concat(req.body.lastname.charAt(0)),
    //     name: req.body.name,
    //     lastname: req.body.lastname,
    //     image: req.body.image
    // };
    // // Insert person
    // collection.insert(person, function(err, result) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log('Inserted %d documents into the "person" collection. The documents inserted with "_id" are:', result.length, result);
    //     }
    // });
    // res.send(req.body); // echo the result back
});

module.exports = router;
