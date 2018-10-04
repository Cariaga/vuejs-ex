let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameSeasonPointsModel = require("./InGameSeasonPointsModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var http = require('http');
module.exports = function (app) {
    //SELECT UserAccountID,SeasonID,CurrentPoints FROM sampledb.playerfinalcard where SeasonID='0e032ae4-335b-4889-808e-3ff95e4cf7f4';
    
    app.get('/Api/v1/InGameSeasonPointsModel/SeasonID/:SeasonID/', function (req, res) {
        let SeasonID = req.params.SeasonID;
        InGameSeasonPointsModel.InGameSeasonPoints(SeasonID,function(response){
            if(response!=undefined){
                res.send(response);
            }else{
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        })
    });

    //when the season ends we update their won points
    app.get('/Api/v1/InGameSeasonPoints/Won/SeasonID/:SeasonID/UserAccountID/:UserAccountID/WinPoints/:WinPoints', function (req, res) {
        let SeasonID = req.params.SeasonID;
        let UserAccountID = req.params.UserAccountID;
        let WinPoints = req.params.WinPoints;
        InGameSeasonPointsModel.InGameSeasonPointsWon(SeasonID, UserAccountID, WinPoints, function(response){
            if(response!=undefined){
                res.send(response);
            }else{
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        })
    });


    //this is their points when they joined the season 
    //note in the db their can only be one user account matching the season 1 user connot have two seasons
    app.get('/Api/v1/InGameSeasonPoints/Join/SeasonID/:SeasonID/UserAccountID/:UserAccountID/BeforePoints/:BeforePoints', function (req, res) {
        let SeasonID = req.params.SeasonID;
        let UserAccountID = req.params.UserAccountID;
        let BeforePoints = req.params.BeforePoints;
        InGameSeasonPointsModel.InGameSeasonPointsJoin(SeasonID, UserAccountID, BeforePoints, function(response){
            if(response!=undefined){
                res.send(response);
            }else{
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        })
    });

    //used for updating the user points when they buy in 
    // note in the db their can only be one user account matching the season 1 user connot have two seasons
        
    app.get('/Api/v1/InGameSeasonPoints/BuyIn/SeasonID/:SeasonID/UserAccountID/:UserAccountID/CurrentPoints/:CurrentPoints', function (req, res) {
        let SeasonID = req.params.SeasonID;
        let UserAccountID = req.params.UserAccountID;
        let CurrentPoints = req.params.CurrentPoints;
        InGameSeasonPointsModel.InGameSeasonPointsBuyIn(SeasonID, UserAccountID, CurrentPoints, function(response){
            if(response!=undefined){
                res.send(response);
            }else{
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        })
    });

    //to end a season
    app.get('/Api/v1/InGameSeasonPoints/SeasonEnd/SeasonID/:SeasonID/CurrentPoints/:CurrentPoints', function (req, res) {
        let SeasonID = req.params.SeasonID;
        let CurrentPoints = req.params.CurrentPoints;
        InGameSeasonPointsModel.InGameSeasonPointsEnd(SeasonID, CurrentPoints,function(response){
            if(response!=undefined){
                res.send(response);
            }else{
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        })
    });







    
}