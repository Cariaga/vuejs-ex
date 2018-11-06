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
//doing
module.exports.AddWithdrawHistory = function AddWithdrawHistory(UserTransactionID, UserAccountID, UserName, ContactNo, BankName, AccountNumber, ApplicationAmount, callback) {
  let _UserTransactionID = UserTransactionID;
  let _UserAccountID = UserAccountID;
  let _UserName = UserName;
  let _ContactNumber = ContactNo;
  let _BankName = BankName;
  let _AccountNumber = AccountNumber;
  let _ApplicationAmount = ApplicationAmount;

  let query =
  "INSERT INTO `sampledb`.`transactions` (`UserAccountID`,`UserTransactionID`, `Amount`, `TransactionType`)"+
  "VALUES (\'"+_UserAccountID+"\',\'"+_UserTransactionID+"\', "+_ApplicationAmount+", \'withdraw\');";

  let query2 =
  "INSERT INTO `sampledb`.`transactioninfo` (`UserTransactionID`,`AccountHolder`, `RequestedDateTime`)"+
  "VALUES (\'"+_UserTransactionID+"\',\'"+_UserName+"\', now());";

  let query3 =
  "INSERT INTO `sampledb`.`withdraw` (`UserTransactionID` ,`ContactNumber`, `BankName`, `AccountNumber`,`RemainingAmount`,`ExistingAmount`) "+
  " VALUES (\'"+_UserTransactionID+"\', \'"+_ContactNumber+"\',\'"+_BankName+"\', \'"+_AccountNumber+"\', 0 , 0);";

  var promise = new Promise(function(resolve, reject) {
    DBConnect.DBConnect(query, function (response) {
       if (response != undefined) {
         resolve();
        } else {
          reject();
        }
      })
    });
    
    var promise2 = new Promise(function(resolve, reject) {
      DBConnect.DBConnect(query2, function (response) {
        if (response != undefined) {
          resolve();
        } else {
          reject();
        }
      })
    });
    
    var promise3 = new Promise(function(resolve, reject) {
      DBConnect.DBConnect(query3, function (response) {
        if (response != undefined) {
          resolve();
        } else {
          reject();
        }
       })
    });
   
   Promise.all([promise,promise2, promise3]).then(function() {
     console.log('insert withdraw successful');
     callback(true);
     }, function(){ //if promise or promise2 fail
     console.log('something went wrong')
     callback(undefined);
   });  
}

//SELECT *,P.Money-(select Amount from sampledb.transactions as T2 where T2.UserTransactionID='Transaction2' and  T.TransactionStatus='pending' and T.TransactionType='withdraw') as NewMoney FROM sampledb.transactions as T Join withdraw as W on W.UserTransactionID = T.UserTransactionID Join players as P on P.UserAccountID=T.UserAccountID where T.TransactionType='withdraw' and T.UserTransactionID='Transaction2' and T.TransactionStatus='pending';
