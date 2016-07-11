var express = require('express');
var User = require('../../models/user');
var async = require('async');
var router = express.Router();
var UserController = require('../../controllers/userController');
var ObjectID = require('mongodb').ObjectID;

var tokenHelper = require('../../lib/utilities/tokenHelper');

var mc = require('../../controllers/mcgillClient');

/**
 * HTTP body parameters
 *   mcgillEmail = the user's email
 *   preferredEmail = the user's preferred contact email (could be null)
 *   password =  their mcgill password
 *   courses = an array of courses, each course being an object with name and CRN
 */
/*router.post('/', function(req, res) {
    // Create course ids for the courses
    var courseIds = [];
    var courses = req.body.courses.map(function(currCourse) {
        var id = new ObjectID();
        courseIds.push(id);
        currCourse._id = id;
        return currCourse;
    });
    console.log(courses);
    var user = new User({
        mcgillCredentials: req.body.mcgillCredentials,
        preferredEmail: req.body.preferredEmail,
        courses: {
            registered: [],
            pending: courseIds
        }
    });
    async.parallel([
        async.apply(CourseController.saveCourses, courses),
        async.apply(UserController.saveUser, user)
    ], function(err, results) {
        if (err) {
            res.status(500).json({status: "error", message: "Server error"});
            return;
        }
        res.status(200).json({status: "success", data: {user: results[1]}});
    });
});*/

router.get('/test', function(req, res) {
    res.send("It worked");
});

/**
 * - Checks credentials with McGill
 * - Creates a new user
 * HTTP body parameters
 *   mcgillCredentials
 *     email
 *     password
 *   preferredEmail
 */
router.post('/', function(req, res, next) {
    var user = new User({
        mcgillCredentials: req.body.mcgillCredentials,
        preferredEmail: req.body.preferredEmail,
        courses: {
            registered: [],
            pending: []
        }
    });
    async.waterfall([
        async.apply(mc.validateUser, req.body.mcgillCredentials),
        async.apply(UserController.saveUser, user)
    ], function (err, user) {
        if (err) {
            res.status(500).json({status: "error", message: "Server error"});
            return;
        }
        var token = tokenHelper.getToken(user._id);
        res.status(200).json({status: "success", data: {user: user, token: token}});
    });
});

/**
 * Given a user ID, returns their public information
 */
router.get('/:id', function(req, res, next) {
    UserController.getUserById(req.params.id, function(err, user) {
        if (err) {
            res.status(500).json({status: "error", message: "Unable to communicate with database"});
            return;
        }
        res.status(200).json({status: "success", data: {user: user}});
    });
});

router.get('/', function(req, res) {
    UserController.getAllUsers(function(err, users) {
        if (err) {
            res.status(500).json({status: "error", message: "Unable to communicate with database"});
            return;
        }
        console.log(typeof users);
        res.status(200).json({status: "success", data: {users: users}});
    });
});

/**
 * HTTP body params
 *   token = the stripe token
 */
router.post('/paymentInfo', function(req, res, next) {
    var data = {
        stripeCustomerId: req.body.token
    };
    UserController.updateUser(req.user.id, data, function(err) {
        if (err) {
            res.status(500).json({status: "error", message: "Unable to communicate with database"});
            return;
        }
        res.status(200).json({status: "success", data: null});
    });
});

module.exports = router;
