var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.InGamePlayProfile = function InGamePlayProfile(UserAccountID, SeasonID, callback) {
    let _UserAccountID = UserAccountID;
    let _SeasonID = SeasonID;
    let query =
        "SELECT UserAccountID,SeasonID,CurrentPoints FROM sampledb.playerfinalcard where UserAccountID = '" + _UserAccountID + "' and SeasonID = '" + _SeasonID + "';";
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            // console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    });
}
module.exports.InGamePlayProfileUpdatePoints = function InGamePlayProfileUpdatePoints(UserAccountID, SeasonID, CurrentPoints, callback) {
    let _UserAccountID = UserAccountID;
    let _SeasonID = SeasonID;
    let _CurrentPoints = CurrentPoints;
    let query =
        "UPDATE `sampledb`.`playerfinalcard` " +
        "SET CurrentPoints = '" + _CurrentPoints + "' " +
        "WHERE UserAccountID = '" + _UserAccountID + "' AND SeasonID = '" + _SeasonID + "' ";

    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            // console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    });
}