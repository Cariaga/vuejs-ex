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
let InGameRoomConfigurationModel = require('./InGameRoomConfigurationModel');
let http = require('http');
let UUID = require('uuid/v4');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) {
    /*generate a room this generates during the game start not during the join room a user account is needed */
    app.get('/Api/v1/InGameRoomConfiguration/Request/UserAccountID/:UserAccountID', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        if (!isNullOrEmpty(UserAccountID)) {
            //client generate the RoomID for speed instead of server
            DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                      //  res.send(UUID());
                        function GenerateUUID() {
                            var idGen = UUID();
                            console.log(""+idGen);
                            res.send(idGen);
                          }
                          setTimeout(GenerateUUID, getRandomInt(1,5));

                          function getRandomInt(min, max) {
                            min = Math.ceil(min);
                            max = Math.floor(max);
                            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
                          }

                   // if (response == false) {

                       

                   /* DBCheck.IsRoomIDExist(RoomID, function (response) {
                        if (response == false) {
                            function GenerateUUID() {
                                res.send(UUID());
                              }
                              setTimeout(GenerateUUID, 200);
                        } else {
                            function GenerateUUID() {
                                res.send(UUID());
                              }
                              setTimeout(GenerateUUID, 200);

                           // res.send(UUID());//2 pass to check again
                           /* let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);*/
                   // }*/
                   // });
              /*  }else{
                    let status = 404;
                    res.status(status).end(http.STATUS_CODES[status]);
                }*/
            });
        } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
        }
    });
}