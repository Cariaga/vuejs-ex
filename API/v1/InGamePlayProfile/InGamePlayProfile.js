let InGamePlayProfileModel = require('./InGamePlayProfileModel');
let http = require('http');
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) {
    app.get('/Api/v1/InGamePlayProfile/UserAccountID/:UserAccountID/SeasonID/:SeasonID/', function (req, res) {
        /*should return the points for that current season of a player*/
        /*their current points for the season will be cleared and moved to their account after the end of a season only on going season for the room is retrivable*/
        let UserAccountID = req.params.UserAccountID;
        let SeasonID = req.params.SeasonID;
        if (!isNullOrEmpty(UserAccountID)) {
            if (!isNullOrEmpty(SeasonID)) {
                InGamePlayProfileModel.InGamePlayProfile(UserAccountID, SeasonID, function (response) {
                    res.send(response);
                });
            } else {
                res.send({
                    InvalidSeasonID: true
                });
            }
        } else {
            res.send({
                InvalidUserAccountID: true
            });
        }
    });

    app.get('/Api/v1/InGamePlayProfile/Update/UserAccountID/:UserAccountID/SeasonID/:SeasonID/CurrentPoints/:CurrentPoints', function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let SeasonID = req.params.SeasonID;
        let CurrentPoints = req.params.CurrentPoints;
        if (!isNullOrEmpty(UserAccountID)) {
            if (!isNullOrEmpty(SeasonID)) {
                if (!isNullOrEmpty(CurrentPoints)) {
                    InGamePlayProfileModel.InGamePlayProfileUpdatePoints(UserAccountID, SeasonID, CurrentPoints, function (response) {
                        res.send(response);
                    });
                } else {
                    res.send({
                        InvalidCurrentPoints: true
                    });
                }
            } else {
                res.send({
                    InvalidSeasonID: true
                });
            }
        } else {
            res.send({
                InvalidUserAccountID: true
            });
        }
    });
}