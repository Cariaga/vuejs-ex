var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');
module.exports.AddLoginHistory = function(UserName,Password, IP, DeviceName, DeviceRam, DeviceCpu,callback){
    let _UserAccountID = "";
    let _UserName = UserName;
    let _Password = Password;
    let _IP = IP;
    let _DeviceName = DeviceName;
    let _DeviceRam = DeviceRam;
    let _DeviceCpu = DeviceCpu;
    let query =
    "SELECT UserAccountID,Verified,RegisteredDateTime FROM sampledb.useraccounts where UserName='"+_UserName+"'and Password='"+_Password+"';);"
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });

    let query2 =
    "INSERT INTO `sampledb`.`loginhistories` (`IP`, `UserAccountID`, `DeviceName`, `DeviceRam`, `DeviceCpu`, `LoginDateTime`) "+
    "VALUES ('"+_UserAccountID+"','"+_IP+"','"+_DeviceName+"','"+_DeviceRam+"','"+_DeviceCpu+"',now());"
    DBConnect.DBConnect(query2, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });

    async.waterfall([Q1], function (err, response) {
        console.log("UserAccount ID" + response);
        /*DBConnect.DBConnect(query2, function (response) {

            if (response != undefined) {
                console.log(response);
                callback(response);
              } else {
                //callback(undefined);
              }
          });*/
      });
      function Q1(callback) {
        DBConnect.DBConnect(query, function (response) {
          if (response != undefined) {
            console.log(response);
         
            callback(null,response);
          } else {
           // callback(undefined);
          }
        });
      }
}