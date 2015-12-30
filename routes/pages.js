var express = require('express');
var router = express.Router();

/* Home page. */
router.get('/', function(req, res, next) {
    res.render('home', {title: 'People Finder', linkto: 'test'});
});

/* Test page. */
router.get('/test', function(req, res, next) {
    res.render('test', {content: "'test content!'"});
});

module.exports = router;
