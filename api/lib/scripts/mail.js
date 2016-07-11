var Mailgun = require('mailgun-js');
var path = require("path");

var apiKey = 'key-93ba87416bddd3e51d5f38c7f2507999';
var domain = 'https://api.mailgun.net/v3/sandboxcb0b1966285f425a92e0d659e98a9ead.mailgun.org';

var fromWho = 'info@reggie.com';

var mailgun = new Mailgun({apiKey: apiKey, domain: domain});

var mailingListAddress = 'mailinglist@sandboxcb0b1966285f425a92e0d659e98a9ead.mailgun.org';

module.exports = {
    sendMail: function(recipient) {
        // email data
        var data = {
            from: fromWho,
            to: recipient,
            subject: "You've been registered!",
            html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
        };

        //Invokes the method to send emails given the above data with the helper library
        mailgun.messages().send(data, function (err, body) {
            // If there is an error, render the error page
            if (err) {
                //res.render('error', { error : err});
                console.log("got an error: ", err);
                res.send(err);
            }
            //Else we can greet and leave
            else {
                //Here "submitted.jade" is the view file for this landing page
                //We pass the variable "email" from the url parameter in an object rendered by Jade
                //res.render('submitted', { email : req.params.mail });
                res.send(body);
            }
        });
    },

    addToMailingList: function(recipient) {
        var members = [{ address: recipient }];
        //For the sake of this tutorial you need to create a mailing list on Mailgun.com/cp/lists and put its address below
        mailgun.lists(mailingListAddress).members().add({ members: members, subscribed: true }, function (err, body) {
            console.log(body);
            if (err) {
                res.send("Error - check console");
            } else {
                res.send("Added to mailing list");
            }
        });
    },

    sendInvoice: function(recipient) {
        //  Which file to send? I made an empty invoice.txt file in the root directory
        var fp = path.join(__dirname, 'invoice.txt');

        var data = {
            from: fromWho,
            to: recipient,
            subject: 'An invoice from your friendly hackers',
            text: 'A fake invoice should be attached, it is just an empty text file after all',
            attachment: fp
        };

        //Sending the email with attachment
        mailgun.messages().send(data, function (error, body) {
            if (error) {
                res.render('error', {error: error});
            } else {
                res.send("Attachment is on its way");
                console.log("attachment sent", fp);
            }
        });
    }

};
