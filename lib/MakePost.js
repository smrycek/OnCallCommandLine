var request = require('request');

var staffAddress = 'http://on-call-escalation-manager.herokuapp.com/staff/add';
var applicationAddress = 'http://on-call-escalation-manager.herokuapp.com/applications/add';

exports.postStaff = function (obj, callback) {
    request.post(staffAddress, {form: { Name: obj.fallbackName, Primary: obj.fallbackNumber }}, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            callback(body);
        } else {
            console.log("Failed to post to " + staffAddress);
        }
    });
}

exports.postApplication = function (obj, callback) {
    request.post(applicationAddress, {form: { Name: obj.name, Phone: obj.phone, Fallback: obj.id }}, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            callback(body);
        } else {
            console.log("Failed to post to " + applicationAddress);
        }
    });
}