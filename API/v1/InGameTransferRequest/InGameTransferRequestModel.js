let DBConnect = require("../../SharedController/DBConnect");
// if the player has points the player can add and subtract transfer to other player
//must update both the reciving/sender current player points 
module.exports.RequestTransferHistory = function RequestTransferHistory(UserAccountIDReceiver, UserAccountIDSender, Amount, Reason,callback) {
    let _UserAccountIDReceiver = UserAccountIDReceiver;
    let _UserAccountIDSender = UserAccountIDSender;
    let _Amount = Amount;
    let _Reason = Reason;
    let query = 
    "INSERT INTO `sampledb`.`transferhistories` (`TransferHistoryUUID`, `UserAccountIDReceiver`, `UserAccountIDSender`, `Amount`, `Status`, `Reason`, `TransferedDateTime`) "+
    "VALUES (UUID(),'"+_UserAccountIDReceiver+"','"+_UserAccountIDSender+"','"+_Amount+"','pending','"+_Reason+"',now()) ";
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
  module.exports.UpdatePlayerMoney = function PlayerNewMoneyAdd(UserAccountID, NewAmount,callback) {
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