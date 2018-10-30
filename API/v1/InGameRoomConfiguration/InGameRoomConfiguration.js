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
let UUID = require('uuid');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
    app.get('/Api/v1/InGameRoomConfiguration/Request/UserAccountID/:UserAccountID',Security.verifyToken, function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        if (!isNullOrEmpty(UserAccountID)) {
            DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                if (response == true) {
                    function getRandomInt(min, max) {
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    }
                    function GenerateUUID() {
                        res.send(UUID());
                      }
                      setTimeout(GenerateUUID, getRandomInt(10,200));
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