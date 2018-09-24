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
                    InGamePlayChipsModel.PlayerPoints(UserAccountID,function(response){
                        let currentPlayerPoints = response[0].CurrentPoints;//points in lobby
                        if(currentPlayerPoints>0){
                            PlayerSeasonChips(UserAccountID,SeasonID,function(response){
                                let SeasonCurrentPoints = response[0].CurrentPoints; //Current Season Points
                                let NewPoints = currentPlayerPoints+SeasonCurrentPoints;
                                InGamePlayChipsModel.PlayerNewPointsInSeason(UserAccountID,SeasonID,NewPoints, function (response) {
                                    res.send(response);
                                    });
                            });
                        }else{
                            res.send({NoMorePoints:true});
                        }
                        
                    });
                    
                }
            }
        }
    });
}