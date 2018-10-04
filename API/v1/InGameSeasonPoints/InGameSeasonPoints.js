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
    //UPDATE `sampledb`.`playerfinalcard` SET `WinPoints` = '500' WHERE (`SeasonID` = '0e032ae4-335b-4889-808e-3ff95e4cf7f4' and `UserAccountID`='Account8');

    //this is their points when they joined the season //note in the db their can only be one user account matching the season 1 user connot have two seasons
    //UPDATE `sampledb`.`playerfinalcard` SET `BeforePoints` = '500' WHERE (`SeasonID` = '0e032ae4-335b-4889-808e-3ff95e4cf7f4' and `UserAccountID`='Account8');


    //used for updating the user points when they buy in // note in the db their can only be one user account matching the season 1 user connot have two seasons
    ////UPDATE `sampledb`.`playerfinalcard` SET `CurrentPoints` = '0' WHERE (`SeasonID` = '0e032ae4-335b-4889-808e-3ff95e4cf7f4' and UserAccountID='Account8' and SeasonEnded is null);

    //to end a season
    //UPDATE `sampledb`.`playerfinalcard` SET `CurrentPoints` = '0', `SeasonEnded` = now() WHERE (`SeasonID` = '0e032ae4-335b-4889-808e-3ff95e4cf7f4');


    
}