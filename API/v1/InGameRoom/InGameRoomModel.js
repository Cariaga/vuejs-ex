var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.InGameRoomPlayerCurrentRoom = function InGameRoomPlayerCurrentRoom(UserAccountID,CurrentRoomName, callback) {
    let _UserAccountID = UserAccountID;
    let _CurrentRoomName = CurrentRoomName;
    let query ="UPDATE `sampledb`.`players` SET `CurrentRoomName` = \'"+_CurrentRoomName+"\' WHERE (`UserAccountID` = \'"+_UserAccountID+"\');";
    console.log(query);
    DBConnect.DBConnect(query, function (response) {
      //console.log(response);
        if (response != undefined) {
        
          callback(response);
        } else {
          callback(undefined);
        }
      });
}