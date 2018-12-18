
var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
module.exports.RequestWithdraw2 = function RequestWithdraw2(UserAccountID, Amount, WithdrawPassword, callback) {
    let _UserAccountID = UserAccountID;
    let _Amount = parseInt(Amount);
    let _Bank = Bank;
    let _AccountNumber = AccountNumber;
    let _Name = Name;
    let _WithdrawPassword = WithdrawPassword;
    let _ContactNumber = ContactNumber;
    let _UserTransactionID= uuidv4();
    
    function TransactionsInsert(){
      return new Promise(resolve => {
        let query =
      "INSERT INTO `sampledb`.`transactions` (`UserTransactionID`, `UserAccountID`, `Amount`, `TransactionStatus`, `TransactionType`) "+
      " VALUES (\'"+_UserTransactionID+"\',\'"+_UserAccountID+"\', \'"+_Amount+"\', \'pending\', \'withdraw\'); ";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          resolve(undefined);
        }
      });
      });
    }
    function TransactionInfosInsert(){
      return new Promise((resolve,reject) => {
        let query =
      "INSERT INTO `sampledb`.`transactioninfo` (`UserTransactionID`, `AccountHolder`, `RequestedDateTime`) "+
      "VALUES (\'"+_UserTransactionID+"\', \'"+_Name+"\', now())";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          reject(undefined);
        }
      });
      });
    }
    function WithdrawInsert(){
      return new Promise((resolve,reject) => {
        let query =
      "INSERT INTO `sampledb`.`withdraw` (`UserTransactionID`, `ContactNumber`, `BankName`, `AccountNumber`) "+
      " VALUES (\'"+_UserTransactionID+"\', \'"+_ContactNumber+"\', \'"+_Bank+"\', \'"+_AccountNumber+"\');";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          reject(undefined);
        }
      });
      });
    }
    function UpdateMoney(){
      return new Promise((resolve,reject) => {
        let query ="UPDATE `sampledb`.`players` SET `Money` = (select Money-"+Amount+" as Money from players WHERE (`UserAccountID` = '"+_UserAccountID+"')) WHERE (`UserAccountID` = '"+_UserAccountID+"');";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          reject(undefined);
        }
      });
      });
    }
    async function RunAsync() {
      console.log('calling');
      let result = await TransactionsInsert();
      let result2 = await TransactionInfosInsert();
      let result3 = await WithdrawInsert();
      let result4 = await UpdateMoney();
      let finalresult = [result,result2,result3,result4];
      callback(finalresult);
    }
    RunAsync();
  }

  module.exports.RequestWithdraw = function RequestWithdraw(UserAccountID, Amount, Bank, AccountNumber, Name, WithdrawPassword, ContactNumber, callback) {
    let _UserAccountID = UserAccountID;
    let _Amount = parseInt(Amount);
    let _Bank = Bank;
    let _AccountNumber = AccountNumber;
    let _Name = Name;
    let _WithdrawPassword = WithdrawPassword;
    let _ContactNumber = ContactNumber;
    let _UserTransactionID= uuidv4();
    function TransactionsInsert(){
      return new Promise(resolve => {
        let query =
      "INSERT INTO `sampledb`.`transactions` (`UserTransactionID`, `UserAccountID`, `Amount`, `TransactionStatus`, `TransactionType`) "+
      " VALUES (\'"+_UserTransactionID+"\',\'"+_UserAccountID+"\', \'"+_Amount+"\', \'pending\', \'withdraw\'); ";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          resolve(undefined);
        }
      });
      });
    }
    function TransactionInfosInsert(){
      return new Promise((resolve,reject) => {
        let query =
      "INSERT INTO `sampledb`.`transactioninfo` (`UserTransactionID`, `AccountHolder`, `RequestedDateTime`) "+
      "VALUES (\'"+_UserTransactionID+"\', \'"+_Name+"\', now())";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          reject(undefined);
        }
      });
      });
    }
    function WithdrawInsert(){
      return new Promise((resolve,reject) => {
        let query =
      "INSERT INTO `sampledb`.`withdraw` (`UserTransactionID`, `ContactNumber`, `BankName`, `AccountNumber`) "+
      " VALUES (\'"+_UserTransactionID+"\', \'"+_ContactNumber+"\', \'"+_Bank+"\', \'"+_AccountNumber+"\');";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          reject(undefined);
        }
      });
      });
    }
    function UpdateMoney(){
      return new Promise((resolve,reject) => {
        let query ="UPDATE `sampledb`.`players` SET `Money` = (select Money-"+Amount+" as Money from players WHERE (`UserAccountID` = '"+_UserAccountID+"')) WHERE (`UserAccountID` = '"+_UserAccountID+"');";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          resolve(response);
        } else {
          reject(undefined);
        }
      });
      });
    }
    async function RunAsync() {
      console.log('calling');
      let result = await TransactionsInsert();
      let result2 = await TransactionInfosInsert();
      let result3 = await WithdrawInsert();
      let result4 = await UpdateMoney();
      let finalresult = [result,result2,result3,result4];
      callback(finalresult);
    }
    RunAsync();
  }