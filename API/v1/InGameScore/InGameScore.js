let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameScoreModel = require("./InGameScoreModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) {
    /*deprecated
    app.get('/Api/v1/InGameScore/UserAccountID/:UserAccountID/', function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        if (!isNullOrEmpty(UserAccountID)) {
            DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                if (response == true) {
                    InGameScoreModel.WinRate(UserAccountID, function (response) {
                        if (response != undefined) {
                            res.send(response);
                        } else {
                            let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);
                        }
                    });
                } else {
                    res.send({
                        UserAccountIDNotExist: true
                    });
                }
            });
        } else {
            res.send({
                InvalidUserAccountID: true
            });
        }
    });*/
}