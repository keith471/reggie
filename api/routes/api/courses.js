// Handles courses shit

var express = require('express');
var Course = require('../../models/course');
var CourseController = require('../../controllers/courseController');
var UserController = require('../../controllers/userController');
var RegStatus = require('../../models/registration').RegStatus;
var RegistrationController = require('../../controllers/registrationController');

var time = require('../../lib/utilities/timeHelper');

var router = express.Router();

/**
 * HTTP Body parameters
 *   courses = an array of courses with the following properties
 *     code, e.g. MATH
 *     number, e.g. 200
 *     crn, e.g. 12345
 *     term, e.g. 201609
 * The courses are already confirmed as valid
 */
router.post('/courses', function(req, res, next) {
    var courses = req.body.courses;

    // Collect an array of course ids
    var courseIds = [];
    async.each(courses, function(course, callback) {
        CourseController.findCourse(course, function(err, course) {
            if (err) {
                callback(err);
            } else {
                if (course) {
                    courseIds.push(course._id);
                    callback();
                } else {
                    CourseController.saveCourse(course, function(err, course) {
                        if (err) {
                            callback(err);
                        } else {
                            courseIds.push(course._id);
                            callback();
                        }
                    });
                }
            }
        });
    }, function(err) {
        if (err) {
            res.status(500).json({status: 'error', message: 'Server error'});
            return;
        }
        // Create registration objects using course ids and user id
        var registrations = [];
        courseIds.forEach(function(courseId) {
            registrations.push({ user: req.user.id, course: courseId, status: RegStatus.PENDING });
        });

        RegistrationController.saveAll(registrations, function(err, results) {
            if (err) {
                res.status(500).json({status: 'error', message: 'Server error'});
                return;
            }
            res.status(200).json({status: 'success', data: null})
        });
    });
});

// TODO: Make robust (basically only try to register for coures that are offered soon or currently)
function getTerm(term) {
    var Term = Object.freeze({
        FALL: 'fall',
        WINTER: 'winter',
        SUMMER: 'summer'
    });

    var Month = Object.freeze({
        SEPTEMBER: '09',
        JANUARY: '01',
        MAY: '05'
    });

    var now = time.now();

    var year = now.year;
    var month = now.month;

    // Deduce term
    if (term === Term.FALL) {
        // use current year and month 09
        return now.year + Month.SEPTEMBER;
    } else if (term === Term.WINTER) {
        if (now.month > 1) {
            // tring to reg for course next year
            return (now.year + 1) + Month.JANUARY;
        } else {
            return now.year + Month.JANUARY;
        }
    } else {
        return now.year + Month.MAY;
    }
}

module.exports = router;
