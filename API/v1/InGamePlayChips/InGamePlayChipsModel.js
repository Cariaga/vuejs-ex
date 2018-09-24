var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");


module.exports.PlayerPoints = function PlayerPoints(UserAccountID,SeasonID, callback) {
    let _UserAccountID = UserAccountID;
    let _SeasonID = SeasonID;
    let query =
        "SELECT CurrentPoints FROM sampledb.players where UserAccountID='"+_UserAccountID+"' and SeasonID='"+_SeasonID+"' and SeasonEnded is null";
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
           // console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    });
}

module.exports.PlayerPoints = function PlayerPoints(UserAccountID, callback) {
    let _UserAccountID = UserAccountID;
    let query =
        "SELECT CurrentPoints FROM sampledb.players where UserAccountID='"+_UserAccountID+"'";
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
           // console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    });
}
module.exports.PlayerSeasonChips = function PlayerSeasonChips(UserAccountID,SeasonID, callback) {
    let _UserAccountID = UserAccountID;
    let _SeasonID = SeasonID;
    let query =
        "SELECT UserAccountID,CurrentPoints FROM sampledb.playerfinalcard where UserAccountID='"+_UserAccountID+"' and SeasonID='"+_SeasonID+"';";
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
           // console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    });
}
module.exports.PlayerNewPointsInSeason = function PlayerNewPointsInSeason(UserAccountID,SeasonID,Points, callback) {
    let _UserAccountID = UserAccountID;
    let _SeasonID = SeasonID;
    let _Points = Points;
    let query = "";
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
           // console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    });
}