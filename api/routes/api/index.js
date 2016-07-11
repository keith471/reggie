// This is the hub of the API
// Routes requests to the appropriate api module

var express = require('express');
var router = express.Router();

var courses = require('./courses');
var users = require('./users');
var tests = require('./tests');

// Some endpoints for testing
router.get('/', function(req, res) {
    res.send('It\'s working');
});

// Test sending json data
router.post('/', function(req, res, next) {

    console.log(req.body.mcgillCredentials);
    console.log(req.body.preferredEmail);
    console.log(req.body.courses);

    // send back what we got
    res.status(200).json(req.body);
});

router.use('/users', users);
router.use('/courses', courses);
router.use('/tests', tests);

module.exports = router;
