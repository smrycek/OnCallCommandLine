var request = require('request');

var staffAddress = 'http://on-call-escalation-manager.herokuapp.com/api/applications/:appName/staff';
var applicationAddress = 'http://on-call-escalation-manager.herokuapp.com/api/applications/';
var updateAddress = 'http://on-call-escalation-manager.herokuapp.com/api/applications/:appName/';

exports.postStaff = function (obj, callback) {
    var newStaffAddress = staffAddress.replace(":appName", obj.name);
    request.post(newStaffAddress, { form: { Name: obj.fallbackName, Phone: obj.fallbackNumber} }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            callback(body);
        } else {
            console.log("Failed to post to " + newStaffAddress);
            if (!err) {
                console.log(body);
                callback(body);
            }
        }
    });
}

exports.postApplication = function (obj, callback) {
    request.post(applicationAddress, {form: { Name: obj.name, Phone: obj.phone }}, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            callback(body);
        } else {
            console.log("Failed to post to " + applicationAddress);
            if (!err) {
                console.log(body);
                callback(body);
            }
        }
    });
}

exports.updateFallback = function (obj, callback) {
    var newUpdateAddress = updateAddress.replace(":appName", obj.name.split(" ").join("_"));
    request({ url: newUpdateAddress, method: 'PUT', json: { Fallback: obj.id} }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            callback(body);
        } else {
            console.log("Failed to post to " + newUpdateAddress);
            if (!err) {
                console.log(body);
                callback(body);
            }
        }
    });
}