let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGamePlayChipsModel = require("./InGamePlayChipsModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) {
    app.get('/Api/v1/InGamePlayChips/Add/UserAccountID/:UserAccountID/SeasonID/:SeasonID/Chips/:Chips/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let SeasonID = req.params.SeasonID;
        let Chips = req.params.Chips;
        if (!isNullOrEmpty(UserAccountID)) {
            if (!isNullOrEmpty(UserAccountID)) {
                if (!isNullOrEmpty(Chips)) {
                    DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                        if (response == true) {
                            InGamePlayChipsModel.isSeasonEnded(UserAccountID, SeasonID, function (response) {
                                if (response == false) {
                                    InGamePlayChipsModel.PlayerPoints(UserAccountID, function (response) {
                                        let currentPlayerPoints = response[0].CurrentPoints; //points in lobby
                                        console.log(currentPlayerPoints);
                                        if (parseInt(currentPlayerPoints) - parseInt(Chips) >= 0) {
                                            InGamePlayChipsModel.PlayerSeasonChips(UserAccountID, SeasonID, function (response) {
                                                let SeasonCurrentPoints = response[0].CurrentPoints; //Current Season Points
                                                let NewSeasonPoints = parseInt(Chips) + parseInt(SeasonCurrentPoints);

                                                let NewPlayerPoints = parseInt(currentPlayerPoints) - parseInt(Chips);
                                                InGamePlayChipsModel.PlayerPointsUpdate(UserAccountID, NewPlayerPoints, function (response) {
                                                    if (response != undefined) {
                                                        InGamePlayChipsModel.PlayerNewPointsInSeason(UserAccountID, SeasonID, NewSeasonPoints, function (response) { // new season Points
                                                            if (response != undefined) {
                                                                res.send(response);
                                                            } else {
                                                                res.send({
                                                                    FailedPlayerNewPointsInSeason: true
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            });

                                        } else {
                                            res.send({
                                                NoMorePoints: true
                                            });
                                        }
                                    });
                                } else {
                                    //a season end will indicate both invalid account or season actually ended
                                    res.send({
                                        SeasonEnded: true
                                    });
                                }
                            });
                        } else {
                            let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);
                        }
                    });
                }
            }
        }
    });
}