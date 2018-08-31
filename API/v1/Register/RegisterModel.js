var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.RegisterAccount = function RegisterAccount(UserAccountID, AccessID, UserName, Password, ValidKey, callback) {
    let query = 
    `SET @UserAccountID=${UserAccountID};`+
    `SET @AccessID=${AccessID};`+
    `SET @UserName=${UserName};`+
    `SET @Password=${Password};`+
    `SET @Verify=false`+
    `SET @ValidKey=${ValidKey};`+
    `SET @RegisteredDateTime=now();`+
    `SET @OnlineStatus='Offline'`+
    `SET @Verified=false`+
    `SET @Email=${Email};` +
    `SET @PhoneNumber=${PhoneNumber};` +
    "INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `Password`, `RegisteredDateTime`,`Verified`) "+
    "VALUES (@UserAccountID, @UserName, @Password, @RegisteredDateTime,@Verified);"+
    "INSERT INTO `sampledb`.`userinfos` (`UserAccountID`, `Email`, `PhoneNumber`)"+
    "VALUES (@UserAccountID, @Email, @PhoneNumber);"+
    "INSERT INTO `sampledb`.`bankinformations` (`UserAccountID`, `BankName`, `AccountNumber`, `SecurityCode`, `Valid`, `Expiration`, `DateTime`) "+
    "VALUES (@UserAccountID, @BankName, @AccountNumber, @SecurityCode, @Valid, @Expiration, @Time, @Date); ";
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(response);
      }else{
        callback(undefined);
      }
    });
  }