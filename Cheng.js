// http://localhost:8080/Api/v1/RoomConfiguration/Add/RoomID/RID6/GameType/Holdem/SmallBlind/50/BigBlind/100/Speed/50
// http://localhost:8080/Api/v1/GameHistory/Add/RoomID/RID2/SeasonID/S5/
let RoomConfigurationModel = require('./API/v1/RoomConfiguration/RoomConfigurationModel');
RoomConfigurationModel.AddRoomConfiguration('RID88', 'Holdem', '11', '22', 'Fast', function (response) {
  console.log("done");
});

let DBCheck = require('./API/SharedController/DBCheck');
DBCheck.IsRoomIDExist('RID88',function(response){
  console.log("Done");
  console.log(response);
});

// http://192.168.254.106:8080/Api/v1/Notification/Add/NotificationType/Sample/Title/ChipsAhoy/Description/FreeChips/Status/Pending
let NotificationModel = require ('./API/v1/Notification/NotificationModel');
NotificationModel.AddNotification('Notif', 'NotificationSample', 'Nothing', 'Stable', function (response) {
  console.log("done");
});

// http://192.168.254.106:8080/Api/v1/SupportTicket/Add/UserAccountID/Account6/Title/Buggy/Description/Bug/Reason/Deposit%20Error/Answer/no%20money/Status/Pending
let SupportTicketModel = require ('./API/v1/SupportTicket/SupportTicketModel');
SupportTicketModel.AddSupportTicket('Account6', 'Buggy', 'Bug', 'Deposit Error', 'no money', 'Pending', function (response) {
  console.log("done");
});

let SupportTicketModel = require ('./API/v1/SupportTicket/SupportTicketModel');
SupportTicketModel.SupportTicketUpdate('6','no money','Pending', function(response){
  console.log("done");
});


// http://localhost:8080/Api/v1/HandHistory/Add/UserAccountID/Account1/MoveHand/Call/SeasonID/S2/

//http://localhost:8080/Api/v1/Login/UserName/U8/Password/U8/IP/IP/DeviceName/DeviceName/DeviceRam/DeviceRam/DeviceCpu/DeviceCpu/


let LoginHistoryModel = require ('./API/v1/Login/LoginHistoryModel');
LoginHistoryModel.LoginAccount('U6', 'U6', function (response) {

  console.log(response);
});

let WithdrawHistoryModel = require('./API/v1/WithdrawHistory/WithdrawHistoryModel');
WithdrawHistoryModel.AddWithdrawHistory('Transaction3', 'asd', '11', 'bdo', '1512', '0', '1', '2', function (response) {
  console.log("done");
});

// http://localhost:8080/Api/v1/HandHistory/Add/UserAccountID/Account1/MoveHand/Call/SeasonID/S2/



let LogOutModel = require("./API/v1/Login/LogOutModel");
LogOutModel.LogOutUserAccount('Account8',function(response){
  let status = 200;
  //res.status(status).end(http.STATUS_CODES[status]);
  console.log(response);
});


//http://localhost:8080/Api/v1/Player/UserAccountID/Account8
let PlayerModel  = require('./API/v1/Player/PlayerModel');
PlayerModel.PlayerInformation('Account8',function(response){
  console.log(response);
});

// http://192.168.254.106:8080/Api/v1/TransactionHistory/UserTransactionID/Transaction2/TransactionStatus/OnGoing/

let TransactionHistoryModel = require('./API/v1/TransactionHistory/TransactionHistoryModel');
TransactionHistoryModel.UpdateTransactionStatus('Transaction2', 'pending',function(response){
  console.log(response);
});


http://localhost:8080/Api/v1/IPList/
let IPListModel = require("./API/v1/IPList/IPListModel");
IPListModel.IPList(undefined,undefined, function (response) {
  console.log(response);
});

let GameLogListModel = require("./API/v1/GameLogList/GameLogListModel");
GameLogListModel.GameLogList(undefined,undefined, function (response) {});
