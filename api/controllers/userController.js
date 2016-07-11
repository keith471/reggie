
var User = require('../models/user');
var Course = require('../models/course');
var mongoose = require('mongoose');
var async = require('async');

module.exports = {
    // Get all users, sorted from oldest to newest
    getAllUsers: function(callback) {
        User
        .find({}, '-mcgillCredentials')
        .sort('createdAt')
        .exec(callback)
    },

    // Get a user by their ID
    getUserById: function(id, callback) {
        User
        .findById(id)
        .populate('courses.pending courses.registered')
        .exec(callback);
    },

    // Save a user (raw or otherwise)
    saveUser: function(user, callback) {
        if (!(user instanceof User)) {
            user = new User(user);
        }
        user.save(callback);
    },

    checkIfUserAlreadyExists: function(user, callback) {
        User
        .find({
            mcgillCredentials: {
                email: user.email,
                password: user.password
            }
        })
        .limit(1)
        .exec(function (err, doc) {
            if (err) {
                callback(err);
            } else {
                if (doc) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            }
        });
    },

    updateUser: function(id, data, callback) {
        User
        .update({ _id: id }, { $set: data })
        .exec(callback);
    },

    updateAndReturnUser: function(id, data, callback) {
        User
        .findByIdAndUpdate(id, {$set: data})
        .exec(callback);
    }
}
