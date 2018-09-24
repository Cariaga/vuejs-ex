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
        let SeasonID = req.params.SeasonID;
        let Chips = req.params.Chips;
        if(!isNullOrEmpty(UserAccountID)){
            if(!isNullOrEmpty(UserAccountID)){
                if(!isNullOrEmpty(Chips)){
                    
                    InGamePlayChipsModel.AddChipsInSeason(UserAccountID,SeasonID,Points, function (response) {
                        res.send(response);
                        });
                }
            }
        }
    });
}