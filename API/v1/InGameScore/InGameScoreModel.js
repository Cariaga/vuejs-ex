var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.WinRate = function WinRate(UserAccountID, callback) {
    let _UserAccountID = UserAccountID;
    let query =
        "SELECT WinRate FROM sampledb.in_game_score where UserAccountID='" + _UserAccountID + "';";

    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    });
}