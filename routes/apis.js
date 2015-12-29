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

module.exports = router;
