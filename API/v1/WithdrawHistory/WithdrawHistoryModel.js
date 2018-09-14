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
 * @param {*} Amount
 * @param {*} BankNameUsed
 * @param {*} Status
 * @param {*} RequestedDATE
 * @param {*} ApprovedDATE
 * @param {*} RejectedDATE
 * @param {*} ProcessingDATE
 * @param {*} RequestedTIME
 * @param {*} ApprovedTIME
 * @param {*} RejectedTIME
 * @param {*} ProcessingTIME
 * @param {*} callback
 */
module.exports.AddWithdrawHistory = function AddWithdrawHistory(UserTransactionID, UserName, ContactNumber, BankName, AccountNumber, ApplicationAmount, ExistingAmount, RemainingAmount, callback) {
  let _UserTransactionID = UserTransactionID;
  let _UserName = UserName;
  let _ContactNumber = ContactNumber;
  let _BankName = BankName;
  let _AccountNumber = AccountNumber;
  let _ApplicationAmount = ApplicationAmount;
  let _ExistingAmount = ExistingAmount;
  let _RemainingAmount = RemainingAmount;
  let query =
  "INSERT INTO `sampledb`.`withdraw` (`UserTransactionID`, `UserName`, `ContactNumber`, `BankName`, `AccountNumber`, `ApplicationAmount`, `ExistingAmount`, `RemainingAmount`) "+
  "VALUES ('"+_UserTransactionID+"','"+_UserName+"','"+_ContactNumber+"','"+_BankName+"','"+_AccountNumber+"','"+_ApplicationAmount+"','"+_ExistingAmount+"','"+_RemainingAmount+"')";




  
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}