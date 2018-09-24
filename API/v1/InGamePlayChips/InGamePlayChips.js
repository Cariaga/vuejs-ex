let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGamePlayChipsModel = require("./InGamePlayChipsModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
module.exports = function (app) {
    app.get('/Api/v1/InGamePlayChips/Add/UserAccountID/:UserAccountID/SeasonID/:SeasonID/Chips/:Chips/', function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let SeasonID = req.params.SeasonID;
        let Chips = req.params.Chips;
        if(!isNullOrEmpty(UserAccountID)){
            if(!isNullOrEmpty(UserAccountID)){
                if(!isNullOrEmpty(Chips)){
                    InGamePlayChipsModel.isSeasonEnded(UserAccountID,SeasonID,function(response){
                        if(response==false){
                            InGamePlayChipsModel.PlayerPoints(UserAccountID,function(response){
                                let currentPlayerPoints = response[0].CurrentPoints;//points in lobby
                                console.log(currentPlayerPoints);
                                if(parseInt(currentPlayerPoints)-parseInt(Chips)>=0){

                                    InGamePlayChipsModel.PlayerSeasonChips(UserAccountID,SeasonID,function(response){
                                        let SeasonCurrentPoints = response[0].CurrentPoints; //Current Season Points
                                        let NewSeasonPoints = parseInt(Chips)+parseInt(SeasonCurrentPoints);
                                        
                                        let NewPlayerPoints = parseInt(currentPlayerPoints)-parseInt(Chips);
                                        InGamePlayChipsModel.PlayerPointsUpdate(UserAccountID,NewPlayerPoints,function(response){
                                            if(response!=undefined){
                                                InGamePlayChipsModel.PlayerNewPointsInSeason(UserAccountID,SeasonID,NewSeasonPoints, function (response) {// new season Points
                                                    res.send(response);
                                                    });
                                            }
                                        });
                                    });
                                }else{
                                    res.send({NoMorePoints:true});
                                }
                            });
                        }else{
                            res.send({SeasonEnded:true});
                        }
                    });
                }
            }
        }
    });
}