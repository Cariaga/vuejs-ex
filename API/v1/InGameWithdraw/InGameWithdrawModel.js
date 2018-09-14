
var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
module.exports.RequestWithdraw = function RequestWithdraw(UserAccountID, Amount, Bank, AccountNumber, Name, WithdrawPassword, ContactNumber, callback) {
    let _UserAccountID = UserAccountID;
    let _Amount = Amount;
    let _Bank = Bank;
    let _AccountNumber = AccountNumber;
    let _Name = Name;
    let _WithdrawPassword = WithdrawPassword;
    let _ContactNumber = ContactNumber;
    let _UserTransactionID= uuidv4();
    function WithdrawInsert(){
      return new Promise(resolve => {
        let query =
      "INSERT INTO `sampledb`.`withdraw` (`UserTransactionID`, `ContactNumber`, `BankName`, `AccountNumber`) "+
      " VALUES ('"+_UserTransactionID+"', '"+_ContactNumber+"', '"+_Bank+"', '"+_AccountNumber+"');";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
      });
    }
    function WithdrawInsert(){
      return new Promise(resolve => {
        let query =
      "INSERT INTO `sampledb`.`withdraw` (`UserTransactionID`, `ContactNumber`, `BankName`, `AccountNumber`) "+
      " VALUES ('"+_UserTransactionID+"', '"+_ContactNumber+"', '"+_Bank+"', '"+_AccountNumber+"');";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
      });
    }
  }