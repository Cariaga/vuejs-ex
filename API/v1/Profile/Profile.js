let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let ProfileModel = require("./ProfileModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
    app.get('/Api/v1/Profile/UserAccountID/:UserAccountID/', Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        let UserAccountID = req.params.UserAccountID;

        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {
                ProfileModel.Profile(UserAccountID, function (response) {
                    if (response != undefined) {
                        res.send(response);
                    } else {
                        let status = 404;
                        res.status(status).end(http.STATUS_CODES[status]);
                    }
                });
            } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        });
    });
    app.get('/Api/v1/Profile/UserAccountID/:UserAccountID/DeviceUUID/:DeviceUUID/', Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let DeviceUUID = req.params.DeviceUUID;
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {
                ProfileModel.Profile(UserAccountID, function (response) {
                    if (response != undefined) {
                        res.send(response);
                    } else {
                        let status = 404;
                        res.status(status).end(http.STATUS_CODES[status]);
                    }
                });
            } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        });
    });
}