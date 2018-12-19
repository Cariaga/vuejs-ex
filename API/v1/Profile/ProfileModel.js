var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.Profile = function Profile(UserAccountID, callback) {
    let _UserAccountID = UserAccountID;
    let query ="SELECT * FROM sampledb.player_profile where UserAccountID=\'"+_UserAccountID+"\';";
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
}
module.exports.InsertSettings = function InsertSettings(UserAccountID,DeviceUUID, callback) {
  let _UserAccountID = UserAccountID;
  let _DeviceUUID = DeviceUUID;
  let query ="INSERT INTO sampledb.profile_settings (DeviceUUID, UserAccountID, Avatar, FrontDeck, BackDeck, Felt, Background) VALUES('"+_DeviceUUID+"', '"+_UserAccountID+"', '1', '1', '1', '1', '1');";
  DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(false);
      }
    });
}

module.exports.ProfileSettingsUpdate = function ProfileSettingsUpdate(UserAccountID,DeviceUUID,BackDeck,Avatar,FrontDeck,Felt,Background, callback) {
  let _UserAccountID = UserAccountID;
  let _DeviceUUID = DeviceUUID;
  let _BackDeck = BackDeck;
  let _Avatar = Avatar;
  let _FrontDeck = FrontDeck;
  let _Felt = Felt;
  let _Background = Background;

  let query ="UPDATE `sampledb`.`profile_settings` SET `Avatar` = '"+_Avatar+"', `FrontDeck` = '"+_FrontDeck+"', `BackDeck` = '"+_BackDeck+"', `Felt` = '"+_Felt+"', `Background` = '"+_Background+"' where DeviceUUID='"+_DeviceUUID+"' and UserAccountID='"+_UserAccountID+"' limit 1";
  DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(false);
      }
    });
}


module.exports.isDeviceUUIDExist = function isDeviceUUIDExist(UserAccountID,DeviceUUID, callback) {
  let _UserAccountID = UserAccountID;
  let _DeviceUUID = DeviceUUID;
  let query ="SELECT Avatar,FrontDeck,BackDeck,Felt,Background FROM sampledb.profile_settings where DeviceUUID='"+_DeviceUUID+"' and UserAccountID='"+_UserAccountID+"';";
  DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(true);
      } else {
        callback(false);
      }
    });
}
module.exports.ProfileSettings = function ProfileSettings(UserAccountID,DeviceUUID, callback) {
  let _UserAccountID = UserAccountID;
  let _DeviceUUID = DeviceUUID;
  let query ="SELECT Avatar,FrontDeck,BackDeck,Felt,Background FROM sampledb.profile_settings where DeviceUUID='"+_DeviceUUID+"' and UserAccountID='"+_UserAccountID+"';";
  DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}