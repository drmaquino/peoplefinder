var express = require('express');
var router = express.Router();

/* GET api root. */
router.get('/', function(req, res, next) {
    res.send({text:"API root"});
});

/* POST to person */
router.post("/person", function(req, res, next) {
    var db = req.db
    var collection = db.collection('person');

    var person = {
        pair: req.body.name.charAt(0).concat(req.body.lastname.charAt(0)),
        name: req.body.name,
        lastname: req.body.lastname,
        image: req.body.image
    };

    collection.insert(person, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Inserted documents into the "person" collection.');
            console.log(result);
        }
    });

    res.send(person);
});

module.exports = router;
