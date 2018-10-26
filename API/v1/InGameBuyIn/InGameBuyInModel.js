var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
    //replaced byuses websocket now no need deprecated

    /*
module.exports.BuyInChips = function BuyInChips(UserAccountID, BuyInAmount, callback) {

   /* let _UserAccountID = UserAccountID;
    let _BuyInAmount = BuyInAmount;
    let query =
        "UPDATE `sampledb`.`player_profile` SET `Money` = Money -"+_BuyInAmount+" WHERE UserAccountID ='"+_UserAccountID+"';";
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            // console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    });
}
/*
module.exports.RoomMoney  = function RoomMoney(UserAccountID, BuyInAmount, callback) {
    let _UserAccountID = UserAccountID;
    let _BuyInAmount = BuyInAmount;
    let query =
        "INSERT INTO sampledb.buyinmoney (`UserAccountID`, `RoomMoney`, `RoomName`) VALUES ('"+_UserAccountID+"', "+_BuyInAmount+", (SELECT CurrentRoomName FROM sampledb.players WHERE UserAccountID = '"+_UserAccountID+"'));";
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            // console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    });
}*/