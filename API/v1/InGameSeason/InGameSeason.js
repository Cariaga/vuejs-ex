var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var isNullOrEmpty = require('is-null-or-empty');
let InGameSeasonModel = require('./InGameSeasonModel');
let http = require('http');
let UUID = require('uuid/v4');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
/*the FinalCard Current Points is the points to the current season only ones someone won it returns to zero */
module.exports = function (app) { //selection
    /*to request a season afer requesting a room the room must exist in order to start a season */
    app.get('/Api/v1/InGameSeason/Request/UserAccountID/:UserAccountID/RoomID/:RoomID/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,/*Security.cache.route({ expire: 5  }),*/ function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let RoomID = req.params.RoomID;
        if (!isNullOrEmpty(UserAccountID)) {
            if (!isNullOrEmpty(RoomID)) {
                let SeasonID = UUID();
                InGameSeasonModel.isRoomExist(RoomID,function(response){
                   
                    if(response==true){
                        console.log("RoomExist "+RoomID);
                        InGameSeasonModel.AddGameHistory(RoomID, SeasonID, function (response) {
                            if(response!=undefined){
                                res.send(SeasonID);
                            }else{
                                
                            }
                        });
                    }else{
                        console.log("Room Dosn't Exist");
                    }
                });
            }
        }
    });
    /*to offically end a season */
    /* */
    /*deprecated */
    app.post('/Api/v1/InGameSeason/SeasonEnd/SeasonID/:SeasonID/', Management.RouteCalled,Security.rateLimiterMiddleware, Security.verifyToken,/*Security.cache.route({ expire: 5  }),*/ function (req, res) {
        let SeasonID = req.params.SeasonID;
        if(!isNullOrEmpty(SeasonID)){
            let status = 200;
            res.status(status).end(http.STATUS_CODES[status]);
        }
    });
      /*deprecated */
    app.get('/Api/v1/InGameSeason/SeasonEnd/SeasonID/:SeasonID/', Security.verifyToken, /*Security.cache.route({ expire: 5  }),*/function (req, res) {
        let SeasonID = req.params.SeasonID;
        if(!isNullOrEmpty(SeasonID)){
            let status = 200;
            res.status(status).end(http.STATUS_CODES[status]);
        }
    });

   //app.get('/Api/v1/InGameSeason/Clear/SeasonID/:SeasonID/',/*Security.verifyToken,*/ function (req, res) {
   /*     let SeasonID = req.params.SeasonID;
        if (!isNullOrEmpty(SeasonID)) {
            InGameSeasonModel.InGameSeasonClear(SeasonID, function (response) {
                if (response != undefined) {
                    res.send({
                        InGameSeasonClear: SeasonID
                    });
                } else {
                    let status = 404;
                    res.status(status).end(http.STATUS_CODES[status]);
                }
            });

        } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
        }
    });*/

    
}