/**
 * For dealing with token issues and renewal
 */

var jwt = require('jsonwebtoken');
var time = require('./timeHelper');
var constants = require('./constants');

var DAYS_TILL_EXP = 30;

function tokenError(err, req, res) {
    if (err.inner.name === 'TokenExpiredError') {
        // Return message to user indicating they need to login
        console.log("Token expired");
        console.log(constants.errors.server_errors.token_expiry_error);
        res.status(401).json({status: 401, message: "Expired token", error: constants.errors.server_errors.token_expiry_error});
    } else if (err.inner.name === 'JsonWebTokenError') {
        console.log("A rare occurrence: JsonWebTokenError");
        res.status(401).json({status: 401, message: "A rare occurrence: JsonWebTokenError", error: constants.errors.server_errors.invalid_token_error});
    }
}

// Creates a token with the user's id encoded into it
// Expires in xx days
function getToken(id) {
    return jwt.sign({id: uid, exp: time.exp(DAYS_TILL_EXP)}, "qHRzkGjXR5ZWZYrhOhGA", {expiresIn: DAYS_TILL_EXP + " days"});
}

module.exports.tokenError = tokenError;
module.exports.getToken = getToken;
