
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var courseSchema = new Schema({
    code: String,
    number: Number,
    crn: Number,
    term: String
},
{
    timestamps: true
});

var Course = mongoose.model('Course', courseSchema);

module.exports = Course;
