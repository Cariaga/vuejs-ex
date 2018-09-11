var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');
/**
 *
 *
 * @param {*} LoginHistoryID
 * @param {*} UserAccountID
 * @param {*} IP
 * @param {*} DeviceName
 * @param {*} DeviceRam
 * @param {*} DeviceCpu
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
/*
module.exports.LoginHistoryUpdate = function LoginHistoryUpdate(LoginHistoryID, UserAccountID, IP, DeviceName, DeviceRam, DeviceCpu, LoginDateTime, callback) {
  let query =
    `SET @LoginHistoryID=${LoginHistoryID};` +
    `SET @UserAccountID=${UserAccountID};` +
    `SET @IP=${IP};` +
    `SET @DeviceName=${DeviceName};` +
    `SET @DeviceRam=${DeviceRam};` +
    `SET @DeviceCpu=${DeviceCpu};` +
    `SET @LoginDateTime=${LoginDateTime};` +
    "UPDATE `sampledb`.`loginhistories`"+
    "SET IP = @IP, UserAccountID = @UserAccountID, DeviceName = @DeviceName, DeviceRam = @DeviceRam, DeviceCpu = @DeviceCpu, LoginDateTime = @LoginDateTime "+
    "WHERE LoginHistoryID = @LoginHistoryID;";
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
 * @param {*} IP
 * @param {*} DeviceName
 * @param {*} DeviceRam
 * @param {*} DeviceCpu
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
module.exports.AddLoginHistory = function AddLoginHistory(UserAccountID, IP, DeviceName, DeviceRam, DeviceCpu, LoginDateTime, callback) { //accessed by /Login
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @IP=${IP};` +
    `SET @DeviceName=${DeviceName};` +
    `SET @DeviceRam=${DeviceRam};` +
    `SET @DeviceCpu=${DeviceCpu};` +
    `SET @LoginDateTime=${LoginDateTime};` 
    "INSERT INTO `sampledb`.`loginhistories` (`IP`, `UserAccountID`, `DeviceName`, `DeviceRam`, `DeviceCpu`, `LoginDateTime`) "+
    "VALUES (@IP, @UserAccountID, @DeviceName, @DeviceRam, @DeviceCpu, @LoginDateTime);";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*var item1 = Models.LoginHistory.build({
    UserAccountID: UserAccountID,
    IP: IP,
    DeviceName: DeviceName,
    DeviceRam: DeviceRam,
    DeviceCpu: DeviceCpu,
    Time: Time,
    Date: Date
  });
  Models.LoginHistory.sync({
    alter: true
  }); //force recreates deletes old table
  item1.save()
    .then(Success => {
      callback("Inserted");
    })
    .catch(error => {
      console.log("error inserting " + error);
      callback(undefined);
    });*/
}