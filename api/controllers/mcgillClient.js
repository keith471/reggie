// Interacts with McGill

var request = require('request');
var needle = require('needle');

var McgillUrl = Object.freeze({
    LOG_IN: 'https://horizon.mcgill.ca/pban1/twbkwbis.P_ValLogin',
    REGISTER: 'https://horizon.mcgill.ca/pban1/bwskfreg.P_AltPin1'
});

module.exports = {

    // Checks if a user entered proper McGill credentials
    // calls callback with null error if valid creds and error otherwise
    validateUser: function(creds, callback) {
        var url = McgillUrl.LOG_IN;
        request.post(
            {
                url: url,
                headers: {
                    'Cookie': 'TESTID=set'
                },
                form: {
                    sid: creds.email,
                    pin: creds.password
                }
            },
            function (error, response, body) {
                var validated = false;
                if (!error && response.statusCode == 200) {
                    if (response.headers['set-cookie']) {
                        var re = /SESSID=\w+=;/;
                        response.headers['set-cookie'].some(function (cookie) {
                            if (re.test(cookie)) {
                                validated = true;
                            }
                            return validated;
                        });
                        callback(validated);
                    } else {
                        callback(validated);
                    }
                } else {
                    callback(validated);
                }
            }
        );
    },

    // Attempts to log a user in
    // HERE
    // calls callback with a sessid if logged in and an error otherwise
    login: function(creds, callback) {
        var url = McgillUrl.LOG_IN;
        request.post(
            {
                url: url,
                headers: {
                    'Cookie': 'TESTID=set'
                },
                form: {
                    sid: creds.email,
                    pin: creds.password
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (response.headers['set-cookie']) {
                        var re = /SESSID=\w+=;/;
                        for (var i=0; i < response.headers['set-cookie'].length; i++) {
                            var cookie = response.headers['set-cookie'][i];
                            var matchInfo = cookie.match(re);
                            if (matchInfo) {
                                var sessIdCookie = matchInfo[0].slice(0,-1);
                                callback(sessIdCookie);
                                return;
                            }
                        }
                        // erroneous
                        callback();
                    } else {
                        // erroneous
                        callback();
                    }
                } else {
                    // erroneous
                    callback();
                }
            }
        );
    },

    validateCourse: function(course, callback) {
        callback();
    },

    register: function(sessId, course, callback) {
        callback();
    }

};
