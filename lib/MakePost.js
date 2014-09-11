var request = require('request');

var staffAddress = 'http://on-call-escalation-manager.herokuapp.com/staff/add';
var applicationAddress = 'http://on-call-escalation-manager.herokuapp.com/applications/add';

exports.postStaff = function (){
    request.post(staffAddress, {}, function (err, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    });
}

exports.postApplication = function (){
    request.post(applicationAddress, {}, function (err, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    });
}