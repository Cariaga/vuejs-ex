var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.RegisterAccount = function RegisterAccount(UserAccountID, AccessID, UserName, Password, ValidKey, Email, PhoneNumber, BankName, AccountNumber, SecurityCode, Valid, Expiration, callback) {
  let UserAccountID = UserAccountID;
  let AccessID = AccessID;
  let UserName = UserName;
  let Password = Password;
  let ValidKey = ValidKey;
  let Email = Email;
  let PhoneNumber = PhoneNumber;
  let BankName = BankName;
  let AccountNumber = AccountNumber;
  let SecurityCode = SecurityCode;
  let Valid = Valid;
  let Expiration = Expiration;
  let query =
    "INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `Password`, `RegisteredDateTime`,`Verified`) " +
    "VALUES ('" + UserAccountID + "','" + UserName + "','" + Password + "','" + RegisteredDateTime + "','" + Verified + "');" +
    "INSERT INTO `sampledb`.`userinfos` (`UserAccountID`, `Email`, `PhoneNumber`)" +
    "VALUES ('" + UserAccountID + "','" + Email + "','" + PhoneNumber + "');" +
    "INSERT INTO `sampledb`.`bankinformations` (`UserAccountID`, `BankName`, `AccountNumber`, `SecurityCode`, `Valid`, `Expiration`, `DateTime`) " +
    "VALUES ('" + UserAccountID + "','" + BankName + "','" + AccountNumber + "','" + SecurityCode + "','" + Valid + "','" + Expiration + "','" + DateTime + "'); ";
  console.log(query);
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}