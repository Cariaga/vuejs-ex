/*
var nexmo = new Nexmo({
  apiKey: "34958c75",
  apiSecret: "VnTUCGBvp3yr2onE",
  /* applicationId: APP_ID,
   privateKey: PRIVATE_KEY_PATH,*/
/*}, {
  debug: true
});

app.get('/SMS/:recipient/:message', function (req, res) {
  let sender = "825080825012";
  let recipient = req.params.recipient.split(",");
  let message = req.params.message;


  if (message.length > 69) {
    console.log("Message Too Long " + message);
  } else {
    for (i = 0; i < recipient.length; i++) {
      console.log(recipient[i]);

      nexmo.message.sendSms(sender, recipient[i], message, {
          type: 'unicode'
        },
        (err, responseData) => {
          if (err) {
            console.log(err);
          } else {
            console.dir(responseData);
          }
        });
    }
  }

  res.end();
});*/


/*
function SendMail(To, From, Subject, html) {
  sendmail({
    from: 'no-reply@holdem1route-holdem1.4b63.pro-ap-southeast-2.openshiftapps.com',
    to: 'cariaga.info@gmail.com',
    subject: Subject,
    html: html,
  }, function (err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
  });
}*/


//is not a function possibly brakets nested another module.export or missing parameters
/*
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

//http://192.168.254.102:8080/Api/v1/UserAccount/Check/UserName/U2 - Username check
//http://192.168.254.102:8080/Api/v1/UserAccount/Check/UserAccountID/U2 - Username check
//http://localhost:8080/Api/v1/BlackList/Check/Blocked/UserAccountID/Account8/UserName/U8/ - inquire check blacklist
//http://192.168.254.102:8080/Api/v1/BlackList/Add/UserAccountID/Account1/Title/Title/Status/Status/Reason/Reason/ - blacklist add
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


//newer
//http://localhost:8080/Api/v1/SupportTicket/Request/UserAccountID/Account8/Title/Title/Reason/Reason/
//outdated
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
/*let DashBoardModel = require("./API/v1/DashBoard/DashBoardModel");
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

//http://192.168.254.102:8080/Api/v1/Notification/Search/Column/Title/Value/None - Notification *

//http://192.168.254.102:8080/Api/v1/IPList/Search/Column/PlayerUserAccountID/Value/Account8 - IP List

//http://192.168.254.102:8080/Api/v1/Transferhistory/Search/Column/Amount/Value/0 - Transfer Log

//http://192.168.254.102:8080/Api/v1/MemberList/Search/Column/UserName/Value/U8 - Member List

//http://192.168.254.102:8080/Api/v1/HeadOfficeList/Search/Column/Name/Value/U1 - Head Office List

//http://192.168.254.102:8080/Api/v1/Notification/Update/NotificationID/1/NotificationType/N1/Title/Nope/Description/Nope/Status/Pending/ - Notice update

//http://192.168.254.102:8080/Api/v1/Distributor/RegisterDistributor/UserAccountID/Account31/Name/Cheng/PhoneNumber/123/UserName/rascal/Password/cheng/Commission/50/HeadOfficeID/1 - register distributor



//add head office
//http://localhost:8080/Api/v1/HeadOffice/Add/UserAccountID/UserAccount2/Name/Name/PhoneNumber/PhoneNumber/UserName/UserName/Password/Password/Commission/3/
let HeadOfficeModel = require('./API/v1/HeadOffice/HeadOfficeModel');
HeadOfficeModel.RegisterHeadOffice('HeadOfficeID','UserAccountID','Name','PhoneNumber','Password','Commission',function(response){
  console.log(response);
});

//192.168.254.102:8080/Api/v1/Distributor/Add/UserAccountID/Account31/Name/Cheng/PhoneNumber/123/UserName/rascal/Password/cheng/Commission/50/HeadOfficeID/1
let DistributorModel = require("./API/v1/Distributor/DistributorModel");
DistributorModel.RegisterDistributor('Account31','Name','PhoneNumber','UserName','Password','50','1', function (response) {
  if (response != undefined) {
   console.log(response);
  }
});
//http://localhost:8080/Api/v1/Shop/Add/UserAccountID/UserAccountID/Name/Name/PhoneNumber/PhoneNumber/UserName/UserName/Password/Password/Commission/0/DistributorID/1/


//http://192.168.254.102:8080/Api/v1/Register/Add/ScreenName/ScreenName/UserName/UserName/Password/Password/Name/Name/SurName/SurName/Email/Email/PhoneNumber/PhoneNumber/BankName/BankName/SecurityCode/SecurityCode/AccountNumber/AccountNumber/AccountHolder/AccountHolder/ShopID/ShopID -- Register Player
let DBConnect = require("./API/v1/Register/RegisterModel");
DBConnect.RegisterAccount2('UserAccountID', 'AccessID', 'UserName','Password', 'ScreenName', 'ValidKey', 'Email', 'PhoneNumber', 'BankName', 'AccountNumber', 'SecurityCode', 'Valid', 'Expiration', 'AccountHolder', '1', function (response) {
  if (response != undefined) {
    // res.send(response);
    console.log('Done');
  } else {
    console.log('AddUserAccountFailed');
  }
});


//http://localhost:8080/Api/v1/Profile/UserAccountID/Account8/ - in gmae route profile for lobby

//http://localhost:8080/Api/v1/InGameNotice/  -In Game  Notice

//http://localhost:8080/Api/v1/InGameAdminSupport/ - In game Admin Support

//http://localhost:8080/Api/v1/InGameTransferHistory/UserAccountID/Account6/ - InGameTransferHistory

//http://192.168.254.102:8080/Api/v1/InGameDeposit/Request/UserAccountID/Account6/Name/DepositName/Amount/0/ - InGameDeposit

//http://localhost:8080/Api/v1/RoomConfiguration/Update/RoomID/RID1/RoomNotice/RoomNotice2/ - RoomNotice Update
//http://localhost:8080/Api/v1/InGameNoticeRoomNotice/RoomID/RID1/

//http://192.168.254.106:8080/Api/v1/SignOut/UserAccountID/Accon1/- logout

//http://localhost:8080/Api/v1/InGameNoticeRoomNotice/RoomID/RID1/ - RoomNotice

//http://192.168.254.106:8080/Api/v1/InGameScore/UserAccountID/Account8 - Win Rate

//http://localhost:8080/api/v1/InGameMoney/UserAccountID/Account8/ - Money

//http://192.168.254.106:8080/Api/v1/Dashboard/HeadOffice/Betting/Daily/ - daily betting

//http://192.168.254.106:8080/Api/v1/Dashboard/HeadOffice/Betting/Monthly/ - monthly betting

//http://192.168.254.106:8080/Api/v1/Dashboard/HeadOffice/Betting/Yearly/ - yearly betting

//http://192.168.254.106:8080/Api/v1/WithdrawHistoryList/Search/Column/name/Value/n2/StartDate/2018-09-14%2015:18:19/EndDate/2018-09-14%2015:18:19

//http://192.168.254.106:8080/Api/v1/DepositList/Search/Column/name/Value/n2/StartDate/2018-09-14%2015:18:19/EndDate/2018-09-14%2015:18:19

//http://localhost:8080/Api/v1/InGameRoom/Update/UserAccountID/Account8/CurrentRoomName/ctgkx/ -- current Room


///Api/v1/RoomConfiguration/Add/RoomID/:RoomID/GameType/:GameType/SmallBlind/:SmallBlind/Speed/:Speed/ -- add Room

//http://192.168.254.106:8080/Api/v1/TransferHistory/Search/Column/Status/Value/Approve/StartDate/2018-09-06%2015:04:03/EndDate/2018-09-06%2015:04:03

//http://localhost:8080/Api/v1/InGameSeason/Request/ - Generate UUID

//http://localhost:8080/Api/v1/InGamePlayChips/Add/UserAccountID/Account8/SeasonID/S1/Chips/20/ - in game Add Chips

//http://192.168.254.107:8080/Api/v1/InGameScore/UserAccountID/Account8/ - in game score
//http://localhost:8080/Api/v1/InGameTransferHistoryRequest/UserAccountIDSender/Account6/UserAccountIDReciver/Account11/Amount/0/Reason/transfer/ - Player Transfer Request

//http://192.168.254.107:8080/Api/v1/UserAccountID/Account8/SeasonID/S1/Rank/RK1/Score/0/Card/C2/BeforePoints/1/AfterPoints/1/WinPoints/1/ - player final card insert

//http://localhost:8080/Api/v1/InGameSeason/Clear/SeasonID/S2/ - in game clear points season

//http://192.168.254.107:8080/Api/v1/InGameRoomConfiguration/Request/UserAccountID/Account6 - in game room config

//http://192.168.254.106:8080/Api/v1/InGameSeasonPoints/SeasonID/0e032ae4-335b-4889-808e-3ff95e4cf7f4/
*/
[
  {
    "domain": null,
    "_events": {
      "close": [
        null,
        null
      ]
    },
    "_eventsCount": 3,
    "readyState": 1,
    "protocol": "",
    "_binaryType": "nodebuffer",
    "_closeFrameReceived": false,
    "_closeFrameSent": false,
    "_closeMessage": "",
    "_closeTimer": null,
    "_closeCode": 1006,
    "_extensions": {},
    "_isServer": true,
    "_receiver": {
      "_writableState": {
        "objectMode": false,
        "highWaterMark": 16384,
        "finalCalled": false,
        "needDrain": false,
        "ending": false,
        "ended": false,
        "finished": false,
        "destroyed": false,
        "decodeStrings": true,
        "defaultEncoding": "utf8",
        "length": 0,
        "writing": false,
        "corked": 0,
        "sync": false,
        "bufferProcessing": false,
        "writecb": null,
        "writelen": 0,
        "bufferedRequest": null,
        "lastBufferedRequest": null,
        "pendingcb": 0,
        "prefinished": false,
        "errorEmitted": false,
        "bufferedRequestCount": 0,
        "corkedRequestsFree": {
          "next": null,
          "entry": null
        }
      },
      "writable": true,
      "domain": null,
      "_events": {},
      "_eventsCount": 6,
      "_binaryType": "nodebuffer",
      "_extensions": {
        "$ref": "$[0][\"_extensions\"]"
      },
      "_maxPayload": 104857600,
      "_bufferedBytes": 0,
      "_buffers": [],
      "_compressed": false,
      "_payloadLength": 97,
      "_mask": {
        "type": "Buffer",
        "data": [
          0,
          143,
          148,
          147
        ]
      },
      "_fragmented": 0,
      "_masked": true,
      "_fin": true,
      "_opcode": 1,
      "_totalPayloadLength": 0,
      "_messageLength": 0,
      "_fragments": [],
      "_state": 0,
      "_loop": false
    },
    "_sender": {
      "_extensions": {
        "$ref": "$[0][\"_extensions\"]"
      },
      "_socket": {
        "connecting": false,
        "_hadError": false,
        "_handle": {
          "reading": true,
          "owner": {
            "$ref": "$[0][\"_sender\"][\"_socket\"]"
          },
          "onconnection": null,
          "writeQueueSize": 0,
          "_consumed": true
        },
        "_parent": null,
        "_host": null,
        "_readableState": {
          "objectMode": false,
          "highWaterMark": 16384,
          "buffer": {
            "head": null,
            "tail": null,
            "length": 0
          },
          "length": 0,
          "pipes": null,
          "pipesCount": 0,
          "flowing": true,
          "ended": false,
          "endEmitted": false,
          "reading": true,
          "sync": false,
          "needReadable": true,
          "emittedReadable": false,
          "readableListening": false,
          "resumeScheduled": false,
          "destroyed": false,
          "defaultEncoding": "utf8",
          "awaitDrain": 0,
          "readingMore": false,
          "decoder": null,
          "encoding": null
        },
        "readable": true,
        "domain": null,
        "_events": {
          "end": [
            null,
            null
          ],
          "error": [
            null,
            null
          ]
        },
        "_eventsCount": 7,
        "_writableState": {
          "objectMode": false,
          "highWaterMark": 16384,
          "finalCalled": false,
          "needDrain": false,
          "ending": false,
          "ended": false,
          "finished": false,
          "destroyed": false,
          "decodeStrings": false,
          "defaultEncoding": "utf8",
          "length": 0,
          "writing": false,
          "corked": 0,
          "sync": false,
          "bufferProcessing": false,
          "writecb": null,
          "writelen": 0,
          "bufferedRequest": null,
          "lastBufferedRequest": null,
          "pendingcb": 0,
          "prefinished": false,
          "errorEmitted": false,
          "bufferedRequestCount": 0,
          "corkedRequestsFree": {
            "next": null,
            "entry": null
          }
        },
        "writable": true,
        "allowHalfOpen": true,
        "_bytesDispatched": 6487,
        "_sockname": null,
        "_pendingData": null,
        "_pendingEncoding": "",
        "server": {
          "domain": null,
          "_events": {
            "request": [
              null,
              null
            ]
          },
          "_eventsCount": 5,
          "_connections": 2,
          "_handle": {
            "reading": false,
            "owner": {
              "$ref": "$[0][\"_sender\"][\"_socket\"][\"server\"]"
            },
            "onread": null,
            "writeQueueSize": 0
          },
          "_usingSlaves": false,
          "_slaves": [],
          "_unref": false,
          "allowHalfOpen": true,
          "pauseOnConnect": false,
          "httpAllowHalfOpen": false,
          "timeout": 120000,
          "keepAliveTimeout": 5000,
          "_pendingResponseData": 0,
          "maxHeadersCount": null,
          "_connectionKey": "6::::8080"
        },
        "_server": {
          "$ref": "$[0][\"_sender\"][\"_socket\"][\"server\"]"
        },
        "_idleTimeout": -1,
        "_idleNext": null,
        "_idlePrev": null,
        "_idleStart": 1474,
        "_destroyed": false,
        "parser": null,
        "_paused": false
      },
      "_firstFragment": true,
      "_compress": false,
      "_bufferedBytes": 0,
      "_deflating": false,
      "_queue": []
    },
    "_socket": {
      "$ref": "$[0][\"_sender\"][\"_socket\"]"
    },
    "UserAccountID": "486798fb-6be6-4c44-a0e6-e66b65f6fa0c",
    "InstanceID": "45eb6d6f-c4d5-4c30-98ee-dd3d5ae0eae3",
    "DepositNotice": "",
    "ParentUserAccountIDList": [
      "d31a6484-5249-4faa-b7d3-aa6f93419d8c",
      "f814f2a9-6aa9-4577-88c3-6a41d60b94a7",
      "1b3c78a4-dc09-4a71-b0fb-ad0440992b1e",
      "7fffe8d8-e65d-4990-9460-51e84ab9dc5e"
    ],
    "isLobby": true,
    "isLeadSocket": true,
    "UserName": "user3",
    "PlayerCommission": 4.5,
    "Money": 976166
  },
  {
    "domain": null,
    "_events": {
      "close": [
        null,
        null
      ]
    },
    "_eventsCount": 3,
    "readyState": 1,
    "protocol": "",
    "_binaryType": "nodebuffer",
    "_closeFrameReceived": false,
    "_closeFrameSent": false,
    "_closeMessage": "",
    "_closeTimer": null,
    "_closeCode": 1006,
    "_extensions": {},
    "_isServer": true,
    "_receiver": {
      "_writableState": {
        "objectMode": false,
        "highWaterMark": 16384,
        "finalCalled": false,
        "needDrain": false,
        "ending": false,
        "ended": false,
        "finished": false,
        "destroyed": false,
        "decodeStrings": true,
        "defaultEncoding": "utf8",
        "length": 0,
        "writing": false,
        "corked": 0,
        "sync": false,
        "bufferProcessing": false,
        "writecb": null,
        "writelen": 0,
        "bufferedRequest": null,
        "lastBufferedRequest": null,
        "pendingcb": 0,
        "prefinished": false,
        "errorEmitted": false,
        "bufferedRequestCount": 0,
        "corkedRequestsFree": {
          "next": null,
          "entry": null
        }
      },
      "writable": true,
      "domain": null,
      "_events": {},
      "_eventsCount": 6,
      "_binaryType": "nodebuffer",
      "_extensions": {
        "$ref": "$[1][\"_extensions\"]"
      },
      "_maxPayload": 104857600,
      "_bufferedBytes": 0,
      "_buffers": [],
      "_compressed": false,
      "_payloadLength": 97,
      "_mask": {
        "type": "Buffer",
        "data": [
          0,
          171,
          3,
          43
        ]
      },
      "_fragmented": 0,
      "_masked": true,
      "_fin": true,
      "_opcode": 1,
      "_totalPayloadLength": 0,
      "_messageLength": 0,
      "_fragments": [],
      "_state": 0,
      "_loop": false
    },
    "_sender": {
      "_extensions": {
        "$ref": "$[1][\"_extensions\"]"
      },
      "_socket": {
        "connecting": false,
        "_hadError": false,
        "_handle": {
          "reading": true,
          "owner": {
            "$ref": "$[1][\"_sender\"][\"_socket\"]"
          },
          "onconnection": null,
          "writeQueueSize": 0,
          "_consumed": true
        },
        "_parent": null,
        "_host": null,
        "_readableState": {
          "objectMode": false,
          "highWaterMark": 16384,
          "buffer": {
            "head": null,
            "tail": null,
            "length": 0
          },
          "length": 0,
          "pipes": null,
          "pipesCount": 0,
          "flowing": true,
          "ended": false,
          "endEmitted": false,
          "reading": true,
          "sync": false,
          "needReadable": true,
          "emittedReadable": false,
          "readableListening": false,
          "resumeScheduled": false,
          "destroyed": false,
          "defaultEncoding": "utf8",
          "awaitDrain": 0,
          "readingMore": false,
          "decoder": null,
          "encoding": null
        },
        "readable": true,
        "domain": null,
        "_events": {
          "end": [
            null,
            null
          ],
          "error": [
            null,
            null
          ]
        },
        "_eventsCount": 7,
        "_writableState": {
          "objectMode": false,
          "highWaterMark": 16384,
          "finalCalled": false,
          "needDrain": false,
          "ending": false,
          "ended": false,
          "finished": false,
          "destroyed": false,
          "decodeStrings": false,
          "defaultEncoding": "utf8",
          "length": 0,
          "writing": false,
          "corked": 0,
          "sync": false,
          "bufferProcessing": false,
          "writecb": null,
          "writelen": 0,
          "bufferedRequest": null,
          "lastBufferedRequest": null,
          "pendingcb": 0,
          "prefinished": false,
          "errorEmitted": false,
          "bufferedRequestCount": 0,
          "corkedRequestsFree": {
            "next": null,
            "entry": null
          }
        },
        "writable": true,
        "allowHalfOpen": true,
        "_bytesDispatched": 2581,
        "_sockname": null,
        "_pendingData": null,
        "_pendingEncoding": "",
        "server": {
          "$ref": "$[0][\"_sender\"][\"_socket\"][\"server\"]"
        },
        "_server": {
          "$ref": "$[0][\"_sender\"][\"_socket\"][\"server\"]"
        },
        "_idleTimeout": -1,
        "_idleNext": null,
        "_idlePrev": null,
        "_idleStart": 26965,
        "_destroyed": false,
        "parser": null,
        "_paused": false
      },
      "_firstFragment": true,
      "_compress": false,
      "_bufferedBytes": 0,
      "_deflating": false,
      "_queue": []
    },
    "_socket": {
      "$ref": "$[1][\"_sender\"][\"_socket\"]"
    },
    "UserAccountID": "8c874921-e188-49f0-96c4-71bff23647a5",
    "InstanceID": "0844eab7-43eb-420d-9781-380c070774fe",
    "DepositNotice": "",
    "ParentUserAccountIDList": [
      "d31a6484-5249-4faa-b7d3-aa6f93419d8c",
      "7b338109-2401-4aa9-8735-b3ccbf80a058",
      "17abd2cf-9835-4b82-abae-bcde8dcc67ff",
      "0a8cac4a-4fbb-4994-93a1-1dae96cb89c9"
    ],
    "isLobby": true,
    "isLeadSocket": false,
    "PlayerCommission": 4.5,
    "UserName": "user1",
    "Money": 943768,
    "Rooms": []
  }
]