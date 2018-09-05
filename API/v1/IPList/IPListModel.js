var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');

module.exports.IPList = function IPList(limit, offset, callback) {
    let _limit = limit;
    let _offset = offset;

    if (limit != undefined && offset != undefined) {
        let query = "SELECT PlayerUserAccountID, RegisteredDateTime, ScreenName, PlayerCurrentPoints, ShopID, DistributorID, HeadOfficeID, IP FROM sampledb.player_iplist LIMIT '" + _limit + "' OFFSET " + _offset;
        DBConnect.DBConnect(query, function (response) {
            if (response != undefined) {
                console.log(response);
                callback(response);
            } else {
                callback(undefined);
            }
        });
    } else if (limit == undefined && offset == undefined) {
        let query = "SELECT PlayerUserAccountID, RegisteredDateTime, ScreenName, PlayerCurrentPoints, ShopID, DistributorID, HeadOfficeID, IP FROM sampledb.player_iplist";
        DBConnect.DBConnect(query, function (response) {
            if (response != undefined) {
                console.log(response);
                callback(response);
            } else {
                callback(undefined);
            }
        })
    }
}