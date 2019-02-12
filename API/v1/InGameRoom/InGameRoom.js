let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameRoomModel = require("./InGameRoomModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) {
    app.get('/Api/v1/InGameRoom/Update/UserAccountID/:UserAccountID/CurrentRoomName/:CurrentRoomName/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let CurrentRoomName = req.params.CurrentRoomName;
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {
                InGameRoomModel.InGameRoomPlayerCurrentRoom(UserAccountID, CurrentRoomName, function (response) {
                    if (response != undefined) {
                        let status = 200;
                        res.status(status).end(http.STATUS_CODES[status]);
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