// For testing specific things

var express = require('express');
var mc = require('../../controllers/mcgillClient');

var router = express.Router();

router.get('/', function(req, res) {
    res.send("It's working");
});

router.post('/mclogin', function(req, res) {
    mc.validateUser(req.body, function(validated) {
        res.send(validated);
    });
});

router.post('/mcsessid', function(req, res) {
    mc.login(req.body, function(sessId) {
        res.send(sessId);
    });
});

module.exports = router;
