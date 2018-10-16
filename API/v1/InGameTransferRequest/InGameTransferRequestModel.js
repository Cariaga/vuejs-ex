var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
// if the player has points the player can add and subtract transfer to other player
//must update both the reciving/sender current player points 
module.exports.InGameTransferRequest = function InGameTransferRequest(UserAccountIDReceiver, UserAccountIDSender, Amount, SubtractAmount, AddAmount, NewAmount, UserName, callback) {
  let _UserAccountIDReceiver = UserAccountIDReceiver;
  let _UserAccountIDSender = UserAccountIDSender;
  let _Amount = Amount;
  let _SubtractAmount = SubtractAmount;
  let _AddAmount = AddAmount;
  let _NewAmount = NewAmount;
  let _UserName = UserName;


  function RequestTransferHistory() {
    let query =
    "INSERT INTO `sampledb`.`transferhistories` (`TransferHistoryUUID`, `UserAccountIDReceiver`, `UserAccountIDSender`, `Amount`, `Status`, `Reason`, `TransferedDateTime`) "+
    "VALUES (UUID(),'"+_UserAccountIDReceiver+"','"+_UserAccountIDSender+"','"+_Amount+"','pending','transfer',now()) ";
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
  

  function PlayerNewMoneySubtract() {
    let query =
    "select (SELECT Money FROM sampledb.players where UserAccountID='"+_UserAccountIDReceiver+"') - "+_SubtractAmount+" as NewMoney";
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

  function PlayerNewMoneyAdd() {
    let query =
    "select (SELECT Money FROM sampledb.players where UserAccountID='"+_UserAccountID+"') + "+_AddAmount+" as NewMoney";
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

  function UpdatePlayerMoney() {
    let query =
    "UPDATE `sampledb`.`players` SET `Money` = '"+_NewAmount+"' WHERE (`UserAccountID` = '"+_UserAccountID+"');";
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

  function UserNameUserAccount() {
    let query =
    "SELECT UserAccountID FROM `sampledb`.`useraccounts` WHERE UserName = '"+_UserName+"' ";
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
    let result = await RequestTransferHistory();
    let result1 = await PlayerNewMoneySubtract();
    let result2 = await PlayerNewMoneyAdd();
    let result3 = await UpdatePlayerMoney();
    let result4 = await UserNameUserAccount();
    let finalresult = [result, result1, result2, result3, result4];
    callback(finalresult);
  }
  RunAsync();
}





module.exports.RequestTransferHistory = function RequestTransferHistory(UserAccountIDReceiver, UserAccountIDSender, Amount,callback) {
    let _UserAccountIDReceiver = UserAccountIDReceiver;
    let _UserAccountIDSender = UserAccountIDSender;
    let _Amount = Amount;
    let query = 
    "INSERT INTO `sampledb`.`transferhistories` (`TransferHistoryUUID`, `UserAccountIDReceiver`, `UserAccountIDSender`, `Amount`, `Status`, `Reason`, `TransferedDateTime`) "+
    "VALUES (UUID(),'"+_UserAccountIDReceiver+"','"+_UserAccountIDSender+"','"+_Amount+"','pending','transfer',now()) ";
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          console.log(response);
          callback(response);
        } else {
          callback(undefined);
        }
      });
  }
  module.exports.PlayerNewMoneySubtract = function PlayerNewMoneySubtract(UserAccountID, SubtractAmount,callback) {
    let _UserAccountIDReceiver = UserAccountID;
    let _SubtractAmount = SubtractAmount;
    let query = 
    "select (SELECT Money FROM sampledb.players where UserAccountID='"+_UserAccountIDReceiver+"') - "+_SubtractAmount+" as NewMoney";
    console.log(query);
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          callback(response[0]);
        } else {
          callback(undefined);
        }
      });
  }
  module.exports.PlayerNewMoneyAdd = function PlayerNewMoneyAdd(UserAccountID, AddAmount,callback) {
    let _UserAccountID = UserAccountID;
    let _AddAmount = AddAmount;
    let query = 
    "select (SELECT Money FROM sampledb.players where UserAccountID='"+_UserAccountID+"') + "+_AddAmount+" as NewMoney";
    console.log(query);
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
         
          callback(response[0]);
        } else {
          callback(undefined);
        }
      });
  }
  module.exports.UpdatePlayerMoney = function UpdatePlayerMoney(UserAccountID, NewAmount,callback) {
    let _UserAccountID = UserAccountID;
    let _NewAmount = NewAmount;
    let query = 
    "UPDATE `sampledb`.`players` SET `Money` = '"+_NewAmount+"' WHERE (`UserAccountID` = '"+_UserAccountID+"');";
    console.log(query);
      DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
          callback(response);
        } else {
          callback(undefined);
        }
      });
  }

  module.exports.UserNameUserAccount = function UserNameUserAccount(UserName, callback){
    let _UserName = UserName;
    let query = 
    "SELECT UserAccountID FROM `sampledb`.`useraccounts` WHERE UserName = '"+_UserName+"' ";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }
  
