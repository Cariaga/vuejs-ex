let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGamePlayChipsModel = require("./InGamePlayChipsModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
module.exports = function (app) {
    app.get('/Api/v1/InGamePlayChips/Add/UserAccountID/:UserAccountID/SeasonID/:SeasonID/Chips/:Chips', function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let Chips = req.params.Chips;
        
        if(!isNullOrEmpty(UserAccountID)){
            InGamePlayChipsModel.AddChipsInSeason(UserAccountID,SeasonID,Points, function (response) {
            res.send(response);
        });
        }
    });
}