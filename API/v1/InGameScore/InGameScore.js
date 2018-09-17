let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameScoreModel = require("./InGameScoreModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');

module.exports = function (app) {
    app.get('/Api/v1/InGameScore/UserAccountID/:UserAccountID/', function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        InGameScoreModel.WinRate(UserAccountID, function (response) {
            res.send(response);
        });
    });
}