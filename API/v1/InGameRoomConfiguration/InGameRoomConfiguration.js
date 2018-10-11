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
                    let RoomID=  UUID();//1 pass to check 
                    DBCheck.IsRoomIDExist(RoomID, function (response) {
                        if (response == false) {
                            res.send(UUID());
                        } else {
                            res.send(UUID());//2 pass to check again
                           /* let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);*/
                        }
                    });
                }else{
                    let status = 404;
                    res.status(status).end(http.STATUS_CODES[status]);
                }
            });
        } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
        }
    });
}