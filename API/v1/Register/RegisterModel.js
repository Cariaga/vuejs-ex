var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.RegisterAccount = function RegisterAccount(UserAccountID, AccessID, UserName, Password, ValidKey,Email,PhoneNumber,BankName,AccountNumber,SecurityCode,Valid,Expiration, callback) {
  let _UserAccountID = UserAccountID;
  let _AccessID = AccessID;
  let _UserName = UserName;
  let _Password = Password;
  let _ValidKey = ValidKey;
  let _Email = Email;
  let _PhoneNumber = PhoneNumber;
  let _BankName = BankName;
  let _AccountNumber = AccountNumber;
  let _SecurityCode = SecurityCode;
  let _Valid = Valid;
  let _Expiration = Expiration;
    let query = 
    "INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `Password`, `RegisteredDateTime`,`Verified`) "+
    "VALUES ('"+_UserAccountID+"','"+_UserName+"','"+_Password+"',now(),'"+_Verified+"');"+
    "INSERT INTO `sampledb`.`userinfos` (`UserAccountID`, `Email`, `PhoneNumber`)"+
    "VALUES ('"+_UserAccountID+"','"+_Email+"','"+_PhoneNumber+"');"+
    "INSERT INTO `sampledb`.`bankinformations` (`UserAccountID`, `BankName`, `AccountNumber`, `SecurityCode`, `Valid`, `Expiration`, `DateTime`) "+
    "VALUES ('"+_UserAccountID+"','"+_BankName+"','"+_AccountNumber+"','"+_SecurityCode+"','"+_Valid+"','"+_Expiration+"','"+_DateTime+"'); ";
    console.log(query);
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(response);
      }else{
        callback(undefined);
      }
    });
  }