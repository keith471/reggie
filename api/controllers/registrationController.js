
var Registration = require('../models/registration').Registration;
var RegStatus = require('../models/registration').RegStatus;
var mongoose = require('mongoose');
var async = require('async');

module.exports = {

    getPendingRegistrations: function(callback) {
        Registration
        .find({ status: RegStatus.PENDING })
        .sort('createdAt')
        .exec(callback);
    },

    getExpandedPendingRegistrations: function(callback) {
        Registration
        .find({ status: RegStatus.PENDING })
        .populate('user course')
        .sort('createdAt')
        .exec(callback);
    },

    updateRegistrationStatus: function(id, status, callback) {
        Registration
        .update({ _id: id }, { $set: {status: status} })
        .exec(callback);
    },

    batchStatusUpdate: function(ids, status, callback) {
        Registration
        .update({ _id: {$in: ids } }, { $set: { status: status } }, { multi: true })
        .exec(callback);
    },

    getRegistrationsForUser: function(userId, opts, callback) {
        Registration
        .find({ userId: userId })
        .populate(opts.populate ? opts.populate : '')
        .exec(function(err, regs) {
            if (err) {
                callback(err);
                return;
            }
            // Organize courses nicely
            var registeredCourses = [];
            var pendingCourses = [];
            regs.forEach(function(reg) {
                if (reg.status === RegStatus.PENDING)
                    pendingCourses.push(reg);
                else
                    registeredCourses.push(reg);
            });
            var courses = {
                courses: {
                    registered: registeredCourses,
                    pending: pendingCourses
                }
            };
            callback(null, courses);
        });
    },

    saveRegistration: function(registration) {
        if (!(registration instanceof Registration)) {
            registration = new Registration(registration);
        }
        registration.save(callback);
    },

    saveAll: function(regs) {
        Registration
        .insertMany(regs)
        .exec(callback);
    }
};
