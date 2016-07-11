var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var registrationSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    course: {type: Schema.Types.ObjectId, ref: 'Course'},
    status: String
},
{
    timestamps: true
});

module.exports = {

    Registration: mongoose.model('Registration', registrationSchema),

    RegStatus: {
        PENDING: 'pending',
        REGISTERED: 'registered'
    }

};
