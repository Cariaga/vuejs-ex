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
}*/