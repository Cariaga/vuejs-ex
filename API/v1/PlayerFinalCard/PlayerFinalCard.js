let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let PlayerFinalCardModel = require("../PlayerFinalCard/PlayerFinalCardModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
//Deprecated by InGameFinalCard
//newer version is ----------Api/v1/PlayerFinalCard/Update/Json--------
module.exports = function (app) {

   /* app.get('/Api/v1/UserAccountID/:UserAccountID/SeasonID/:SeasonID/Rank/:Rank/Score/:Score/Card/:Card/', function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let SeasonID = req.params.SeasonID;
        let Rank = req.params.Rank;
        let Score = req.params.Score;
        let Card = req.params.Card;
        if (!isNullOrEmpty(UserAccountID)) {
            if (!isNullOrEmpty(SeasonID)) {
                if (!isNullOrEmpty(Rank)) {
                    if (!isNullOrEmpty(Score)) {
                        if (!isNullOrEmpty(Card)) {
                            DBCheck.isUserAccountInSeasonIDExist(UserAccountID,SeasonID,function(response){
                                if(response==false){
                                    PlayerFinalCardModel.AddPlayerFinalCard2(UserAccountID, SeasonID, Rank, Score, Card, function (response) {
                                        res.send(response);
                                    });
                                }else{
                                    res.send({AccountAlreadyInSeason:true});
                                }
                            });
                        } else {
                            res.send({
                                SeasonIDMissing: true
                            })
                        }
                    } else {
                        res.send({
                            RankMissing: true
                        })
                    }
                } else {
                    res.send({
                        ScoreMissing: true
                    })
                }
            } else {
                res.send({
                    CardMissing: true
                })
            }
        }
    });*/


//newer version is ----------Api/v1/PlayerFinalCard/Update/Json--------
    /*
        app.get('/Api/v1/UserAccountID/:UserAccountID/SeasonID/:SeasonID/Rank/:Rank/Score/:Score/Card/:Card/BeforePoints/:BeforePoints/AfterPoints/:AfterPoints/WinPoints/:WinPoints/', function (req, res) {
            let UserAccountID = req.params.UserAccountID;
            let SeasonID = req.params.SeasonID;
            let Rank = req.params.Rank;
            let Score = req.params.Score;
            let Card = req.params.Card;
            let BeforePoints = req.params.BeforePoints;
            let AfterPoints = req.params.AfterPoints;
            let WinPoints = req.params.WinPoints;
            if (!isNullOrEmpty(UserAccountID)) {
                if (!isNullOrEmpty(SeasonID)) {
                    if (!isNullOrEmpty(Rank)) {
                        if (!isNullOrEmpty(Score)) {
                            if (!isNullOrEmpty(Card)) {
                                if (!isNullOrEmpty(BeforePoints)) {
                                    if (!isNullOrEmpty(AfterPoints)) {
                                        if (!isNullOrEmpty(WinPoints)) {
                                            PlayerFinalCardModel.AddPlayerFinalCard(UserAccountID, SeasonID, Rank, Score, Card, BeforePoints, AfterPoints, WinPoints, function (response) {
                                                res.send(response);
                                            });
                                        } else {
                                            res.send({
                                                SeasonIDMissing: true
                                            })
                                        }
                                    } else {
                                        res.send({
                                            RankMissing: true
                                        })
                                    }
                                } else {
                                    res.send({
                                        ScoreMissing: true
                                    })
                                }
                            } else {
                                res.send({
                                    CardMissing: true
                                })
                            }
                        } else {
                            res.send({
                                BeforePointsMissing: true
                            })
                        }
                    } else {
                        res.send({
                            AfterPointsMissing: true
                        })
                    }
                } else {
                    res.send({
                        WinPointsMissing: true
                    })
                }
            }
        });*/
}