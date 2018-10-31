let InGamePlayProfileModel = require('./InGamePlayProfileModel');
let DBCheck = require("../../SharedController/DBCheck");
let http = require('http');
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
    app.get('/Api/v1/InGamePlayProfile/UserAccountID/:UserAccountID/SeasonID/:SeasonID/',Security.verifyToken, function (req, res) {
        /*should return the points for that current season of a player*/
        /*their current points for the season will be cleared and moved to their account after the end of a season only on going season for the room is retrivable*/
        let UserAccountID = req.params.UserAccountID;
        let SeasonID = req.params.SeasonID;
        if (!isNullOrEmpty(UserAccountID)) {
            if (!isNullOrEmpty(SeasonID)) {
                DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                    if (response == true) {
                        InGamePlayProfileModel.InGamePlayProfile(UserAccountID, SeasonID, function (response) {
                            if(response!=undefined){
                                res.send(response);
                            }else{
                                let status = 404;
                                res.status(status).end(http.STATUS_CODES[status]);
                            }
                        });
                    } else {
                        let status = 404;
                        res.status(status).end(http.STATUS_CODES[status]);
                    }
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

    app.get('/Api/v1/InGamePlayProfile/Update/UserAccountID/:UserAccountID/SeasonID/:SeasonID/CurrentPoints/:CurrentPoints',Security.verifyToken, function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let SeasonID = req.params.SeasonID;
        let CurrentPoints = parseInt(req.params.CurrentPoints);
        if (!isNullOrEmpty(UserAccountID)) {
            if (!isNullOrEmpty(SeasonID)) {
                if (!isNullOrEmpty(CurrentPoints)) {
                    DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                        if (response == true) {
                            InGamePlayProfileModel.InGamePlayProfileUpdatePoints(UserAccountID, SeasonID, CurrentPoints, function (response) {
                                res.send(response);
                            });
                        } else {
                            let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);
                        }
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