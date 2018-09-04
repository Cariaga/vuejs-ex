var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');
module.exports.AddLoginHistory = function(UserAccountID, IP, DeviceName, DeviceRam, DeviceCpu, DateTime,callback){
    let _UserAccountID = UserAccountID;
let _IP = IP;
let _DeviceName = DeviceName;
let _DeviceRam = DeviceRam;
let _DeviceCpu = DeviceCpu;
let _DateTime = DateTime;
    let query =
    "INSERT INTO `sampledb`.`loginhistories` (`IP`, `UserAccountID`, `DeviceName`, `DeviceRam`, `DeviceCpu`, `LoginDateTime`) "+
    "VALUES ('"+_UserAccountID+"','"+_IP+"','"+_DeviceName+"','"+_DeviceRam+"','"+_DeviceCpu+"','"+_DateTime+"');"
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}