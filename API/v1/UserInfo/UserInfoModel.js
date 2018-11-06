var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Email
 * @param {*} PhoneNumber
 * @param {*} TelephoneNumber
 * @param {*} callback
 */
/*
module.exports.UserInfoUpdate = function UserInfoUpdate(UserAccountID, Email, PhoneNumber, TelephoneNumber, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @Email=${Email};` +
    `SET @PhoneNumber=${PhoneNumber};` +
    `SET @TelephoneNumber=${TelephoneNumber};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}*/
/*
module.exports.UserInfoUserAccountID = function UserInfoUserAccountID(UserAccountID, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}*/
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
/*
module.exports.UserInfoUserAccountID = function UserInfoUserAccountID(UserAccountID, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}*/
/*
module.exports.UserInfoUpdateEmail = function UserInfoUpdateEmail(UserAccountID, Email, callback) { // Verification With UserAccountID // Forcing Account To be Verified // Via UserAccountID
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @Email=${Email};` +
    "UPDATE `sampledb`.`accesscontrol` "+
    "SET UserAccountID = @UserAccountID, Email = @Email "+
    "WHERE UserAccountID = @UserAccountID;";

    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}*/
/*
module.exports.AddUserInfo = function AddUserInfo(UserAccountID, Email, PhoneNumber, TelephoneNumber, callback) {

  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @Email=${Email};` +
    `SET @PhoneNumber=${PhoneNumber};` +
    `SET @TelephoneNumber=${TelephoneNumber};` +
    "INSERT INTO `sampledb`.`userinfos` (`UserAccountID`, `Email`, `PhoneNumber`, `TelephoneNumber`) "+
    "VALUES (@UserAccountID, @Email, @PhoneNumber, @TelephoneNumber);";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}*/