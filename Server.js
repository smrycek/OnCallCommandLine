var promptly = require('promptly'),
    http = require('http'),
    path = require('path');


function promptApplication(callback) {
    var app = new Object();
    //var name, phone, fallbackName, fallbackNumber;
    console.log("");
    console.log("Add New Application");
    console.log("-------------------");
    if (!app.name) {
        promptly.prompt('Application Name: ', function (err, retName) {
            app.name = retName;
            if (!app.phone) {
                promptly.prompt('Phone Number: ', { validator: PhoneValidator }, function (err, retPhone) {
                    app.phone = retPhone;
                    if (!app.fallbackName) {
                        promptly.prompt('Fallback Name: ', function (err, retFallback) {
                            app.fallbackName = retFallback;
                            if (!app.fallbackNumber) {
                                promptly.prompt('Fallback Number: ', { validator: PhoneValidator }, function (err, retFallback) {
                                    app.fallbackNumber = retFallback;
                                    if (app.name && app.phone && app.fallbackName && app.fallbackNumber) {
                                        console.log("");
                                        callback(app, promptAction);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    var PhoneValidator = function (value) {
        var pattern = /^\d{10}$/,
        nondigit = /\D/g,
        value = value.replace(nondigit, "");

        if (!pattern.test(value)) {
            err = new Error('Number did not consist of 10 digits.');
        }

        if (app.phone) {
            //If phone is set, we are entering the fallback number. These 2 numbers cannot be the same or an infinite call loop may occur. (if thats even possible)
            if (app.phone == value) {
                throw new Error('Fallback number cannot be the same as the application number.');
            }
        }


        return value;
    };
}

function promptAction() {
    promptly.prompt("Enter Action: ", function (err, input) {
        if (input.toLowerCase() == 'add') {
            promptApplication(addApplication);
        } else if (input.toLowerCase() == 'exit') {
            process.exit();
        } else {
            promptAction();
        }

    });
}

function addApplication(app, callback) {
    var makePost = require('./lib/MakePost.js');

    makePost.postStaff(app, function (body) {
        var staff = JSON.parse(body);
        if (staff.status === "Success") {
            console.log("Staffer successfully added.");
            app.id = staff.id;
            makePost.postApplication(app, function (body) {
                var application = JSON.parse(body);
                if (application.status === "Success") {
                    console.log("Application successfully added.");
                } else {
                    console.log("Failed to add application.");
                }
            });
        } else {
            console.log("Failed to add staffer.");
        }
        callback();
    });
}


console.log("");
console.log("On Call Escalation Manager Started");
console.log("----------------------------------")
console.log("");
console.log("To add a new application to the database, enter 'add'");
console.log("To exit the application, enter 'exit'");
console.log("");

promptAction();