// Attempts to register users every 15 minutes

var RegistrationController = require('../../controllers/registrationController');
var CourseController = require('../../controllers/courseController');
var UserController = require('../../controllers/userController');
var mc = require('../../controllers/mcgillClient');
var RegStatus = require('../../models/registration').RegStatus;
var async = require('async');

// This is what registers users in courses
function register() {
    console.log('Beginning registration script');
    var sessIds = {};
    RegistrationController.getExpandedPendingRegistrations(function(err, regs) {
        if (err) {
            console.log('Error getting all pending registrations: ' + err);
            console.log('Trying again in ' + interval + ' seconds.');
            return;
        }
        console.log('Attempting ' + regs.length + ' registrations');
        async.eachSeries(regs, function(reg, callback) {
            // get course and sessid
            var course = reg.course;
            getSessId(reg.user, function(err, sessId) {
                if (err) {
                    console.log('Error getting sessId');
                    console.log('Skipping reg ' + reg._id);
                    callback();
                    return;
                }
                mc.register(sessId, course, function(err) {
                    if (err) {
                        console.log('Unable to perform registration ' + reg._id);
                        callback();
                        return;
                    }
                    handleSuccessfulRegistration(reg);
                    callback();
                });
            }, function() {
                console.log('Done with registration attempts');
                // Log some stats
            });
        });
    });

    function getSessId(user, callback) {
        var userId = user._id;
        var sessId = sessIds[userId];
        if (sessId) {
            callback(null, sessId);
        } else {
            mc.login(user.mcgillCredentials, function(sessId) {
                if (err) {
                    console.log('Error logging in user');
                    callback('error');
                    return;
                }
                sessIds[userId] = sessId;
                callback(null, sessId);
            });
        }
    }

    function handleSuccessfulRegistration(reg) {
        async.parallel([
            updateRegistrationStatus,
            sendEmail
        ],
        function(err, results) {
            console.log('Done registration clean up for reg ' + reg._id);
        });

        function updateRegistrationStatus() {
            RegistrationController.updateRegistrationStatus(reg._id, RegStatus.REGISTERED, function(err) {
                if (err) {
                    console.log('WARN: Failed to update registration status to registered');
                    callback(null, false);
                    return;
                }
                callback(null, true);
            });
        }

        function sendEmail() {
            var email = reg.user.preferredEmail;
            callback(null, true);
        }
    }
}

// Optimized registration
// - batch operations
// - in-memory caching
function cheapRegister() {

    var sessIds = {};
    var courses = {};

    RegistrationController.getPendingRegistrations(function(err, regs) {
        if (err) {
            console.log('Error getting all pending registrations: ' + err);
            console.log('Trying again in ' + interval + ' seconds.');
            return;
        }
        regs.forEach(function(reg) {
            // get course and sessid in parallel
            async.parallel([
                async.apply(getCourse, reg),
                async.apply(getSessId, reg)
            ],
            function(err, results) {
                if (err) {
                    console.log('Skipping reg ' + reg._id);
                    return;
                }
                // results[0] = course
                // results[1] = sessId
                mc.register(results[1], results[0], function(err) {
                    if (err) {
                        console.log('Unable to register user in course');
                    }

                });
            });
        });
    });

    function getCourse(reg, callback) {
        var courseId = reg._courseId;
        var course = courses[courseId];
        if (course) {
            callback(null, course);
        } else {
            CourseController.getCourseById(courseId, function(err, course) {
                if (err) {
                    console.log('Error getting course by id from db: ' + err);
                    callback(err);
                    return;
                }
                courses[courseId] = course;
                callback(null, course);
            });
        }
    }

    function getSessId(reg, callback) {
        var userId = reg._userId;
        var sessId = sessIds[userId];
        if (sessId) {
            callback(null, sessId);
        } else {
            UserController.getUserById(userId, function(err, user) {
                if (err) {
                    console.log('Error getting user by id from db: ' + err);
                    callback(err);
                    return;
                }
                mc.login(user.mcgillCredentials, function(sessId) {
                    if (err) {
                        console.log('Error logging in user');
                        callback('error');
                        return;
                    }
                    sessIds[userId] = sessId;
                    callback(null, sessId);
                });
            });
        }
    }
}

var interval = 5*60000;
setInterval(register, interval);
