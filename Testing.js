let DBCheck = require('./API/SharedController/DBCheck');
DBCheck.IsRoomIDExist('RID88',function(response){
  console.log("Done");
  console.log(response);
});

let DBCheck = require('./API/SharedController/DBCheck');
DBCheck.TryMinusCurrentPoints('Account8',20, function(response){
  console.log(response);
});
//
let DBCheck = require('./API/SharedController/DBCheck');
DBCheck.isSupportTicketIDExist('1', function(response){
  console.log(response);
});

let DBCheck = require('./API/SharedController/DBCheck');
DBCheck.isScreenNameExist('sc1', function(response){
  console.log(response);
});

let DBCheck = require('./API/SharedController/DBCheck');
DBCheck.isUserAccountVerifiedUserName('U1', function(response){
  console.log(response);
});

let DBCheck = require('./API/SharedController/DBCheck');
DBCheck.isUserAccountBlocked('Account1', function(response){
  console.log(response);
});

let DBCheck = require('./API/SharedController/DBCheck');
DBCheck.CheckUserAccountIDKey('Account1', 2, function(response){
  console.log(response);
});


// http://localhost:8080/Api/v1/RoomConfiguration/Add/RoomID/RID6/GameType/Holdem/SmallBlind/50/BigBlind/100/Speed/50

// http://localhost:8080/Api/v1/GameHistory/Add/RoomID/RID2/SeasonID/S5/
let RoomConfigurationModel = require('./API/v1/RoomConfiguration/RoomConfigurationModel');
RoomConfigurationModel.AddRoomConfiguration('RID88', 'Holdem', '11', '22', 'Fast', function (response) {
  console.log("done");
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

// http://192.168.254.106:8080/Api/v1/SupportTicket/Update/SupportTicketID/3/Answer/with%20money/Status/Done
let SupportTicketModel = require ('./API/v1/SupportTicket/SupportTicketModel');
SupportTicketModel.SupportTicketUpdate('1','no money','Pending', function(response){
  console.log("done");
});

// 192.168.254.106:8080/Api/v1/SupportTicket/Request/UserAccountID/Account8/Title/Title/Description/Description/Reason/Reason
let SupportTicketModel = require ('./API/v1/SupportTicket/SupportTicketModel');
SupportTicketModel.RequestSupportTicket('Account6','Lag','Slowing of game','new room', function(response){
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

let DashBoardModel = require("./API/v1/DashBoard/DashBoardModel");
DashBoardModel.UserAccountOnline(function (response) {
  console.log(response);
});

//http://localhost:8080/Api/v1/Dashboard/NewUsers/
/*DashBoardModel.UserAccountRecentRegistered(function (response) {
  console.log(response);
});
*/


//http://localhost:8080/Api/v1/Dashboard/TotalDepositWithdrawProfit/
let DashBoardModel = require("./API/v1/DashBoard/DashBoardModel");
DashBoardModel.TotalRegisteredUsersToday(function (response) {
  console.log(response);
});

let DashBoardModel = require("./API/v1/DashBoard/DashBoardModel");
DashBoardModel.TransactionRecent(function (response) {
  console.log(response);
});


//http://localhost:8080/Api/v1/TransferHistory/Add/UserAccountIDReceiver/Account6/UserAccountIDSender/Account5/Amount/0/Reason/0/
let TransferHistoryModel = require('./API/v1/TransferHistory/TransferHistoryModel');
TransferHistoryModel.RequestTransferHistory('Account6', 'Account5', 0, "reason", function (response) {
  if (response != undefined) {
    console.log(response);
  } else {
    res.send([{
      TransferHistoryUpdateFailed: true
    }]);
  }
});
let TransferHistoryModel = require('./API/v1/TransferHistory/TransferHistoryModel');
TransferHistoryModel.TransferHistoryStatusUpdate('0d88c08f-b1a3-11e8-86b8-0a0027000004','Approved', function (response) {
  if (response != undefined) {
    console.log(response);
  } else {
    res.send([{
      TransferHistoryUpdateFailed: true
    }]);
  }
});
//http://localhost:8080/Api/v1/BlackList/Update/BlackListID/2/UserAccountID/Account6/Status/Released/
let BlackListModel = require("./API/v1/BlackList/BlackListModel");
BlackListModel.BlackListStatusUpdate('2', 'Account6', 'Released', function (response) {
  console.log("Status Set");
  if (response != undefined) {
    console.log(response);
  }
  });

  //front-end done

      //http://localhost:8080/Api/v1/Dashboard/TotalRegisteredUser
    let DashBoardModel = require("./API/v1/DashBoard/DashBoardModel");
    DashBoardModel.TotalRegisteredUsers(function (response) {
      console.log(response);
    });

    //http://localhost:8080/Api/v1/Dashboard/TotalTransactionRecent/
    let DashBoardModel = require("./API/v1/DashBoard/DashBoardModel");
    DashBoardModel.TotalTransactionRecent(function (response) {
      console.log(response);
    });

  //front-end done end
  
  //http://localhost:8080/Api/v1/Dashboard/TotalRegisteredUser
let DashBoardModel = require("./API/v1/DashBoard/DashBoardModel");
DashBoardModel.TotalRegisteredUsersToday(function (response) {
  console.log(response);
});

//http://localhost:8080/Api/v1/ConnectingUsers/
  let ConnectingUsersModel = require('./API/v1/ConnectingUsers/ConnectingUsersModel');
        ConnectingUsersModel.ConnectingUsers(function(response){
           console.log(response);
          });




        //Ingame only
//http://localhost:8080/Api/v1/UserAccount/SupportTicket/UserAccountID/Account6/Status/Pending
require('./API/v1/InGameUserSupportTicket/InGameUserSupportTicketModel').SupportTicketUserAccountID('Account6',function(response){
  console.log(response);
});

//With Season and UserAccountID
//http://localhost:8080/Api/v1/HandHistoryList/UserAccountID/Account1/SeasonID/S1/

//hand History
//http://localhost:8080/Api/v1/HandHistoryList/SeasonID/S1/
let HandHistoryListModel = require('./API/v1/HandHistoryList/HandHistoryListModel');
HandHistoryListModel.HandHistorySeasonID(SeasonID, function (response) {
  if (response != undefined) {
    res.send(beautify(response, null, 2, 100));
  } else {
    res.send({
      HandHistoryFailed: true
    });
  }
});

//http://localhost:8080/Api/v1/Pagination/
let PaginationModel = require('./API/v1/Pagination');
PaginationModel.PaginationCount(function(response){
    console.log(response);
});
let PlayerFinalCardModel = require("./API/v1/PlayerFinalCard/PlayerFinalCardModel");
PlayerFinalCardModel.AddPlayerFinalCard('Account8', 'S2', 'RK2', '0', 'C3', '1996-05-31 00:00:00', '200', '0', '0',function(response){
 // console.log(response);
});

//http://192.168.254.102:8080/Api/v1/OneOnOne/Search/Column/UserName/Value/U8 - One on One

//http://192.168.254.102:8080/Api/v1/GameLogList/Search/Column/SeasonID/Value/S1 - Game Log

//http://192.168.254.102:8080/Api/v1/DepositList/Search/Column/Name/Value/n1 - Deposit List

//http://192.168.254.102:8080/Api/v1/WithdrawHistoryList/Search/Column/ShopID/Value/1 - WithdrawHistoryList

//http://192.168.254.102:8080/Api/v1/Notification/Search/Column/Title/Value/None - Notification

//http://192.168.254.102:8080/Api/v1/IPList/Search/Column/PlayerUserAccountID/Value/Account8 - IP List

//http://192.168.254.102:8080/Api/v1/Transferhistory/Search/Column/Amount/Value/0 - Transfer Log

//http://192.168.254.102:8080/Api/v1/MemberList/Search/Column/UserName/Value/U8 - Member List

//http://192.168.254.102:8080/Api/v1/HeadOfficeList/Search/Column/Name/Value/U1 - Head Office List

//http://192.168.254.102:8080/Api/v1/Notification/Update/NotificationID/1/NotificationType/N1/Title/Nope/Description/Nope/Status/Pending/ - Notice update

//http://192.168.254.102:8080/Api/v1/Distributor/RegisterDistributor/UserAccountID/Account31/Name/Cheng/PhoneNumber/123/UserName/rascal/Password/cheng/Commission/50/HeadOfficeID/H1 - register distributor


//add head office
//http://localhost:8080/Api/v1/HeadOffice/Add/UserAccountID/UserAccount2/Name/Name/PhoneNumber/PhoneNumber/UserName/UserName/Password/Password/Commission/3/
let HeadOfficeModel = require('./API/v1/HeadOffice/HeadOfficeModel');
HeadOfficeModel.RegisterHeadOffice('HeadOfficeID','UserAccountID','Name','PhoneNumber','Password','Commission',function(response){
  console.log(response);
});

let DistributorModel = require("./API/v1/Distributor/DistributorModel");
DistributorModel.RegisterDistributor(UserAccountID,Name,PhoneNumber,UserName,Password,Commission,HeadOfficeID, function (response) {
  if (response != undefined) {
    res.send(response);
  } else {
    res.send({
      RegisterDistributorFailed: true
    });
  }
});