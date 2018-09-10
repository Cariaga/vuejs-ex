let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let PlayerFinalCardModel = require("../PlayerFinalCard/PlayerFinalCardModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var http = require('http');
module.exports = function (app) {
    app.get('/UserAccountID/:UserAccountID/SeasonID/:SeasonID/Rank/:Rank/Score/:Score/Card/:Card/DateTime/:DateTime/BeforePoints/:BeforePoints/AfterPoints/:AfterPoints/WinPoints/:WinPoints/', function (req, res) {
        let = req.params.UserAccountID
        let = req.params.SeasonID
        let = req.params.Rank
        let = req.params.Score
        let = req.params.Card
        let = req.params.DateTime
        let = req.params.BeforePoints
        let = req.params.AfterPoints
        let = req.params.WinPoints

        if (!isNullOrEmpty(UserAccountID)) {
            if (!isNullOrEmpty(SeasonID)) {
                if (!isNullOrEmpty(Rank)) {
                    if (!isNullOrEmpty(Score)) {
                        if (!isNullOrEmpty(Card)) {
                            if (!isNullOrEmpty(DateTime)) {
                                if (!isNullOrEmpty(BeforePoints)) {
                                    if (!isNullOrEmpty(AfterPoints)) {
                                        if (!isNullOrEmpty(WinPoints)) {

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
                                DateTimeMissing: true
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
    });
}