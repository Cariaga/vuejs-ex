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

    function Transactions(){
      let query = 
      "INSERT INTO `sampledb`.`transactions` (`UserTransactionID`, `UserAccountID`, `Amount`, `TransactionStatus`, `TransactionType`) VALUES ('"+_UserTransactionID+"', '"+_UserAccountID+"', '"+_Amount+"', 'pending', 'deposit');";
      return new Promise(resolve => {
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
    function TransactionInfos(){
      let query = 
      "INSERT INTO `sampledb`.`transactioninfo` (`UserTransactionID`, `RequestedDateTime`) VALUES ('"+_UserTransactionID+"', now());";
      return new Promise(resolve => {
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
    async function RunAsync() {
      console.log('calling');
      let finalresult = [{}];
      let result = await Transactions();
      let result2 = await TransactionInfos();
      //console.log(finalresult);
      callback(finalresult);
    }
    RunAsync();

   
  }