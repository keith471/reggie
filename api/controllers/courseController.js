
var Course = require('../models/course');
var mongoose = require('mongoose');
var async = require('async');

module.exports = {
    // Get all courses, ordered from oldest to newest
    getAllCourses: function(callback) {
        Course
        .find()
        .sort('createdAt')
        .exec(callback)
    },

    // Get a course by its id, either as a string or an ObjectId
    getCourseById: function(id, callback) {
        Course
        .findById(id)
        .exec(callback);
    },

    findCourse: function(course, callback) {
        Course
        .find(course)
        .exec(callback);
    },

    // Save a single course, raw or otherwise
    saveCourse: function(course, callback) {
        if (!(course instanceof Course)) {
            course = new Course(course);
        }
        course.save(callback);
    },

    // Saves a bunch of courses (raw or otherwise)
    saveCourses: function(courses, callback) {
        Course.insertMany(courses, callback);
    }
}
