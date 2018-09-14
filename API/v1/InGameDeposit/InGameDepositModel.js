var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.InGameDeposit = function InGameDeposit(UserAccountID,Name,Amount,callback) {
  let _UserAccountID =UserAccountID;
  let _Name =Name;
  let _Amount=Amount;
  let _UserTransactionID = uuidv4();

    
    let query = 
    "INSERT INTO `sampledb`.`transactions` (`UserTransactionID`, `UserAccountID`, `Amount`, `TransactionStatus`, `TransactionType`) VALUES ('"+_UserTransactionID+"', '"+_UserAccountID+"', '"+_Amount+"', 'pending', 'deposit');";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }