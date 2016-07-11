
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var userSchema = new Schema({
    mcgillCredentials: {
        email: String,
        password: String
    },
    preferredEmail: String,
    stripeCustomerId: String
},
{
    timestamps: true
});

var User = mongoose.model('User', userSchema);

module.exports = User;
