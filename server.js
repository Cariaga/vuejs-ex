// server.js
"use strict";

//ServerMode
let ServerMode = "Debug";

// set up ========================
var helmet = require('helmet');
//var sqlinjection = require('sql-injection');// disable because it blocks token access
var express = require('express');
const routes = require('express').Router();
//var Nexmo = require('nexmo');
var app = express(); // create our app w/ express
app.use(helmet());
var fs = require('fs')
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var beautify = require("json-beautify");
//const sendmail = require('sendmail')();
const url = require('url');
const stringify = require('json-stringify');

const Enumerable = require('linq');
var cors = require('cors');
const W1 = require("walletone");
const busboy = require('express-busboy');
const notifyRouter = busboy.extend(express.Router());
//var Redis = require('ioredis');
var GlobalFunctions = require('./API/SharedController/GlobalFunctions');
/* redis io is buggy
var redis = new Redis(new Redis({ enableOfflineQueue: false,
  no_ready_check: true,
  auth_pass: 'eastcoast',
  host: process.env.REDIS_PORT_6379_TCP_ADDR||'localhost',
   port: process.env.REDIS_PORT_6379_TCP_PORT||6379//,
 
  // name: 'mymaster',
  // no_ready_check: true,
  // auth_pass:'eastcoast'
  }));*/

var beautify = require('json-beautify');
//app.use(sqlinjection);// disable because it blocks token access
//to enable CORS required for json request get put post and http cross
//https must be enabled

/*
var cache = require('express-redis-cache')();

var ExpressBrute = require('express-brute'),
	RedisStore = require('express-brute-redis');
  var store = new RedisStore({
    host: 'localhost',
    port: 6379
  });

*/

let secretKey = "484639536c5d766e767c5734474f455a5b344337305348635f5966";
let merchantId = "190887657209";
let defaultData = {
  WMI_SUCCESS_URL: 'https://tester-holdem-server.4b63.pro-ap-southeast-2.openshiftapps.com/success/',
  WMI_FAIL_URL: 'https://tester-holdem-server.4b63.pro-ap-southeast-2.openshiftapps.com/fail/',
};
const w1 = new W1(secretKey, merchantId, defaultData);
let successHandler = (data, callback) => {
  // data === req.body    
  // save payment info in db e.t.c    
  // callback() or return promise
  //console.log("Should be called "+beautify(data,null ,2 ,100));
  if(data.WMI_ORDER_STATE=="Accepted"){
    console.log("----Accepted Payment Process here -------");
    console.log("PayAmount "+data.WMI_PAYMENT_AMOUNT);
    console.log("Reciver UUID "+data.UserAccountID);//custom parameter
    let query = "UPDATE `sampledb`.`players` as p1  SET p1.`Money` = p1.`Money`+"+parseInt(data.WMI_PAYMENT_AMOUNT)+" WHERE (p1.`UserAccountID` = \'"+data.UserAccountID+"\')";
    console.log(query);
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){

      }
    });
  }
  callback();
};
let errorHandler = (err, meta) => {
console.log("failed "+err);
  // you can save something to a file, db e.t.c.
  // operation must be synchronous or in the background 
};

notifyRouter.post('/', w1.notify(successHandler, errorHandler));
app.use('/notification', notifyRouter);
app.use(function (req, res, next) {
  
  // Website you wish to allow to connect
  var allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:8020', 'http://127.0.0.1:8080', 'http://127.0.0.1:9000', 'http://localhost:9000', 'http://localhost:8080'];
  var origin = req.headers.origin;
  res.header("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,OPTIONS');
  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Headers', 'Content-Type', 'X-Auth-Token');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.options('*', cors());//to support webgl request and resolve post routing to option 
//app.options('/Api/v1/Game/Login/', cors());// alternativly better than the app * 


// configuration =================


app.use(express.static('AdminSocket'));
//app.use(express.static('WalletOne'));

//app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/Webgl'));

app.use(morgan('combined')); // log every request to the console
app.use(bodyParser.urlencoded({
  'extended': 'true'
})); // parse application/x-www-form-urlencoded


app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


/*app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));
*/





//===========API===========

let Security = require("./API/SharedController/Security");
let Management = require("./API/SharedController/Management");
require('./API/v1/ServerManagement/ServerManagement')(app);
require('./API/v1/Photon/Photon')(app);

let DBConnect = require("./API/SharedController/DBConnect");
let DBGlobal = require("./API/SharedController/DBGlobal");
let DBCheck = require('./API/SharedController/DBCheck');
let ConnectionMode=require('./API/SharedController/ConnectionMode');
require('./API/v1/AccessControl/AccessControl')(app);

require('./API/v1/BankInformation/BankInformation')(app);
require('./API/v1/BlackList/BlackList')(app);
require('./API/v1/ConnectingUsers/ConnectingUsers')(app);
require('./API/v1/DashBoard/DashBoard')(app);
require('./API/v1/DepositHistory/DepositHistory')(app);
require('./API/v1/DepositList/DepositList')(app);
require('./API/v1/Distributor/Distributor')(app);
require('./API/v1/GameHistory/GameHistory')(app);
require('./API/v1/GameLogList/GameLogList')(app);
require('./API/v1/HandHistory/HandHistory')(app);
require('./API/v1/HandHistoryList/HandHistoryList')(app);
require('./API/v1/InGameMoney/InGameMoney')(app);
require('./API/v1/HeadOffice/HeadOffice')(app);
require('./API/v1/HeadOfficeList/HeadOfficeList')(app);
require('./API/v1/InGameAdminSupport/InGameAdminSupport')(app);
require('./API/v1/InGameAdminAnswer/InGameAdminAnswer')(app);
require('./API/v1/InGameDeposit/InGameDeposit')(app);

require('./API/v1/InGameNotice/InGameNotice')(app);
require('./API/v1/InGamePlayChips/InGamePlayChips')(app);

require('./API/v1/InGamePlayProfile/InGamePlayProfile')(app);
require('./API/v1/InGamePlayRoomNotice/InGamePlayRoomNotice')(app);
require('./API/v1/InGameRoom/InGameRoom')(app);
require('./API/v1/InGameScreenName/InGameScreenName')(app);
require('./API/v1/InGameSeasonPoints/InGameSeasonPoints')(app);
require('./API/v1/InGameTransferHistory/InGameTransferHistory')(app);
require('./API/v1/InGameTransferRequest/InGameTransferRequest')(app);
require('./API/v1/InGameNotice/InGameNotice')(app);
require('./API/v1/InGameWithdraw/InGameWithdraw')(app);
require('./API/v1/IPList/IPList')(app);
require('./API/v1/Login/Login')(app);
require('./API/v1/Login/LogOut')(app);
require('./API/v1/LoginHistory/LoginHistory')(app);
require('./API/v1/MemberBlackList/MemberBlackList')(app);
require('./API/v1/MemberList/MemberList')(app);
require('./API/v1/Notification/Notification')(app);
require('./API/v1/OneOnOne/OneOnOne')(app);
require('./API/v1/Pagination/Pagination')(app);
require('./API/v1/Player/Player')(app);
require('./API/v1/InGameFinalCard/InGameFinalCard')(app);
require('./API/v1/PlayerFinalCard/PlayerFinalCard')(app); //Deprected
require('./API/v1/Poker/Poker')(app);
require('./API/v1/Profile/Profile')(app);
require('./API/v1/Register/Register')(app);
require('./API/v1/RoomConfiguration/RoomConfiguration')(app);
require('./API/v1/Shop/Shop')(app);
require('./API/v1/SubUserAccount/SubUserAccount')(app);
require('./API/v1/SupportTicket/SupportTicket')(app);
require('./API/v1/TransferHistory/TransferHistory')(app);
require('./API/v1/UserAccount/UserAccount')(app);
require('./API/v1/UserInfo/UserInfo')(app);
require('./API/v1/InGameUserSupportTicket/InGameUserSupportTicket')(app);
require('./API/v1/Verification/Verification')(app);
require('./API/v1/WithdrawHistory/WithdrawHistory')(app);
require('./API/v1/WithdrawHistoryList/WithdrawHistoryList')(app);
require('./API/v1/TransactionHistory/TransactionHistory')(app);
require('./API/v1/InGameScore/InGameScore')(app);
require('./API/v1/InGameSeason/InGameSeason')(app);
require('./API/v1/InGameRoomConfiguration/InGameRoomConfiguration')(app);
require('./API/v1/InGamePlayerWins/InGamePlayerWins')(app);
require('./API/v1/InGameBuyIn/InGameBuyIn')(app);
require('./API/v1/Sales/Sales')(app);
require('./API/v1/UserProfit/UserProfit')(app);
require('./API/v1/CalculateManagement/CalculateManagement')(app);


require('./API/v1/OperatingHeadOffice/OperatingHeadOffice')(app);
var uuidv4 = require('uuid/v4');
function test() {
  let RegisterModel = require('./API/v1/Register/RegisterModel');
  RegisterModel.RegisterAccount('UserAccountID' + Math.random(), 'AccessID', 'UserName', 'Password', 'ValidKey', 'Email', 'PhoneNumber', 'BankName', 'AccountNumber', 'SecurityCode', 'Valid', 'Expiration', function (response) {
    console.log("OK");
  });
}
//--testing for season based authentication END

//--Login End
app.get('/',function (req, res) {
  //redis.set('foo', 'bar');
  res.sendStatus(200);
});

app.get('/Api/',Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),/*Security.cache,*/function (req, res) {
  console.log("test");

  console.log("tester2");

  res.send('pick version');
  /*redis.get('foo', function (err, result) {
    console.log(result);
  });*/
  //setTimeout(function(){res.send('pick version');}, 10000);
});
app.get('/GameVersion/',Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),/*Security.cache,*/function (req, res) {
  console.log("Game Version Retrived");
  DBConnect.DBConnect("Select GameVersion from Gameconfiguration",function(response){
    if(response!=undefined){
      res.send(response[0]);
    }else{
      res.sendStatus(404);
    }
     
  });
  //setTimeout(function(){res.send('pick version');}, 10000);
});
app.get('/SideNotice/',Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),/*Security.cache,*/function (req, res) {

  DBConnect.DBConnect("SELECT notice as Notice, title as Title, `Date` as `Date`, enddate as EndDate FROM sampledb.sidenotice where EndDate>Now() order by id limit 1 ",function(response){
    if(response!=undefined){
      res.send(response);
    }else{
      res.sendStatus(404);
    }
     
  });
  //setTimeout(function(){res.send('pick version');}, 10000);
});

app.get('/Pay/UserAccountID/:UserAccountID/Amount/:Amount/',function(req,res){
  let Amount =  req.params.Amount;
  let UserAccountID =  req.params.UserAccountID;
// Create form data
  let fields = w1.getFormFields({
    WMI_PAYMENT_AMOUNT: Amount,
    WMI_CURRENCY_ID: '840',
    WMI_DESCRIPTION: 'Recharge',
    WMI_CUSTOMER_EMAIL: 'user@example.com',
    WMI_AUTO_LOCATION: "1",
    UserAccountID:UserAccountID
    // ...and other options
  });
  w1.setAlgorithm('md5');
  
  var createInput = function(name, value){
    return '<input name="' + name + '" value="' + value + '" type="hidden">';
  };
  let result = "";
  for(var i =0;i<fields.Length;++i){
    result+=createInput(fields[i].name,fields[i].value);
  }
  res.send('<body onload="document.frm1.submit()"> <form method="POST" action="https://wl.walletone.com/checkout/checkout/Index" accept-charset="UTF-8" name="frm1">' + result + '</form> </body>');
});




app.get('/success',function(req,res,next){
  res.sendStatus(200);
});
app.get('/fail',function(req,res){
});

var redis = require("redis"),
    client = redis.createClient({ host: process.env.REDIS_PORT_6379_TCP_ADDR,password:"eastcoast"});
 
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
 
client.on("error", function (err) {
    console.log("Error " + err);
});
 
client.set("string key",process.env.DESCRIPTION, redis.print);
client.get("string key", function(err, reply) {
  // reply is null when the key is missing
  console.log(reply);
  client.quit();
});



/*
app.get('/Api/v1', Management.RouteCalled,Security.rateLimiterMiddleware,cache.route({ expire: 100  }),function (req, res) {
  res.send('Api v1 version');
});*/
//---POKER ROUTING START


let totalSocketBytes=0;
var sizeof = require('object-sizeof');
const SocketServer = require('ws').Server;
const server = app
  .listen(8080, () => console.log(`Listening on ${ 8080 }`));

const wss = new SocketServer({
  server
});
let ConnectedUsers = 0;


function LatestAndUnique(distinctlist, LookUp) {
  return Enumerable.from(distinctlist).first(x => x.UserAccountID == LookUp);
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
wss.on('connection', (ws, req) => {
  ConnectedUsers++;
  console.log('Client connected ' + ConnectedUsers);
  const parameters = url.parse(req.url, true);
  var UserAccountID = parameters.query.UserAccountID;
  
  ws.UserAccountID = UserAccountID;
  ws.InstanceID = uuidv4();
  ws.DepositNotice = "";
  ws.ParentUserAccountIDList=[];
  ws.isLobby=true;
  ws.WinPoints = 0;
  ws.PlayerCommission = 0;
  
  //ws.Rooms=[];

//--------Start Player Checking First Socket
  ws.isLeadSocket=true;//becomes false instead if an  existing player same account is found
  wss.clients.forEach((client) => {
    if (client.UserAccountID ==UserAccountID&& ws.InstanceID!=client.InstanceID) {//makes sure i'm not checking my self and check if anothor same account exist
     ws.isLeadSocket=false;
      //console.log(client.UserAccountID); 
    }
  });

//-------End Player Checking First Socket


  //Get Commission of Player the login sends commision also but need to decide which is better 
  







  //Get 
  GetBasicInformation(UserAccountID,function(BasicInformation){
    ws.UserName = BasicInformation.UserName;
    ws.WinPoints = BasicInformation.WinPoints;
    ws.PlayerCommission = BasicInformation.PlayerCommission;

    var query2 = "UPDATE `sampledb`.`useraccounts` SET `OnlineStatus` = 'Online' WHERE (`UserAccountID` = \'"+_UserAccountID+"\');";
    DBConnect.DBConnect(query2, function (response) {
      if (response != undefined) {
        
      }
    });
    
  });


  /* Screen Name not Done move to UserAccountID Basic Information
  DBCheck.UserAccountIDScreenName(UserAccountID,function(response){
    if(response!=undefined){
      ws.ScreenName = response[0]["ScreenName"];
    }else{
      console.log("Websocket Set Up Error 3");
    }
  });*/



  //--inisialization to Same Account instances // similar to all buffer
  var SyncRoomVar = undefined;


  wss.clients.forEach((client) => {
    if (SyncRoomVar == undefined && client.UserAccountID == ws.UserAccountID) { //matching user account connecting to a diffrent application instance
      SyncRoomVar = client.Rooms;
      //console.log(client.UserAccountID); 
    }
   
  });
  if (SyncRoomVar != undefined) {

    ws.Rooms = SyncRoomVar;
    SyncRoomVar = undefined;
  }
  //console.log(ws.Money);
  
  var _UserAccountID = UserAccountID;
  var query = "SELECT `Money` FROM sampledb.players WHERE `UserAccountID` = \'" + _UserAccountID + "\';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      ws.Money = parseInt(response[0].Money);
      ParentListOfPlayer();
      //console.log(response[0]);
    }
  });

  function ParentListOfPlayer(){
    var ParentsUserAccountsQuery = "SELECT ParentUserAccountID FROM sampledb.player_treebranch_indirect where PlayerUserAccountID=\'"+UserAccountID+"\';";
    //console.log(ParentsUserAccountsQuery);
    DBConnect.DBConnect(ParentsUserAccountsQuery, function (response) {
      if (response != undefined) {
        let ParentUserAccountIDList = response.map(x=>x.ParentUserAccountID); 
        ws.ParentUserAccountIDList = ParentUserAccountIDList;
      //  console.log("Ok "+ParentUserAccountIDList.length);
      }
    });
  }

  
  // Update Player variables Listing upon inisialization of a same useraccount to match the oldest index useraccount
  // console.log("url: ", ws);
  //Developer note : it seams direct editing of db money won't affect the real money of the player but it dose work without problem with an actual deposit  which is good
  //editing the money in the db shouln't happend without updating the socket aswell
  ws.onmessage = function (event) {
    //clients.size to get the length of the sockets connections

    //console.log(event.data);
    if (IsJsonString(event.data)) {

      totalSocketBytes +=sizeof(event.data);
      let Object = JSON.parse(event.data);
      //console.log(Object);
   
         /*admin related */
      if (Object.Type == "NotifyPlayerDeposit") {
        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            if (client.UserAccountID == Object.MessageReceiver) {
                  client.DepositNotice = Object.DepositNotice; 
                  let DepositUUID = Object.DepositUUID;
                  if(DepositUUID!=""){
                    console.log("Deposit UUID"+DepositUUID);

                    var query2 = "SELECT Amount FROM sampledb.transactions where TransactionStatus='approved' and TransactionType='deposit' and UserTransactionID=\'"+DepositUUID+"\';";

                    console.log(query2);
                    DBConnect.DBConnect(query2, function (response) {
                      if (response != undefined) {

                        client.Money = (parseInt(client.Money)+parseInt(response[0].Amount));
                        console.log("New Client Money "+(parseInt(client.Money)+parseInt(response[0].Amount)));
                      }else{
                        console.log('May have executed before the api route of aproval');
                      }
                    });

                  }else{
                    console.log("UUID EMpty");
                  }
                 // console.log("Amount Deposit Approved "+Object.DepositUUID);
                 // console.log(Object.DepositNotice);

            }
          }
        });
      }


      /*player related */
       
      else if (Object.Type == "NotifyPlayerDepositReceived") {
        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            if (client.UserAccountID == Object.UserAccountID) {
                  client.DepositNotice = ""; 
                  InvokeRepeat();//force update list right away
                 // console.log(Object.DepositNotice);

            }
          }
        });
      }
      else if (Object.Type == "NotifyPlayerTrasferReceived") {
        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            if (client.UserAccountID == Object.UserAccountID) {
                  client.TransferNotice = ""; //clear when player confirms transfer
                  InvokeRepeat();//force update list right away
                 // console.log(Object.DepositNotice);

            }
          }
        });
      }
      else if (Object.Type == "Transfer") { //event trasfer room
        console.log("Transfered Money "+ Object.TransferAmount/*JSON.stringify(Object,null,2)*/);
        //console.log("LeaveRoom "+ Object.RoomID);
        //self update money deduct 
        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            if (client.UserAccountID == Object.UserAccountID) {
                  console.log("UserAccountID Sender : "+client.UserAccountID+ " Matched "+Object.UserAccountID);
                  client.Money = parseInt(client.Money) - parseInt(Object.TransferAmount); //add back the money to the player
                  
                  
            }
          }
        });
        //Target Update add Money Reciver Money
        // slightly diffrent from above due to the reqirment of userName instead of UserAccountID
        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            if (client.UserName == Object.Target) {//target userName
                
                  client.Money = parseInt(client.Money) + parseInt(Object.TransferAmount); //add  the money to the player
                  client.TransferNotice ="Recieved Money  "+Object.TransferAmount;//the notification to the player
                  console.log("UserName Reciver : "+client.UserName+ " Matched "+Object.Target +" client.Money "+client.Money);
                  
            }
          }
        });
      }
      else if (Object.Type == "Withdraw") { //event withdraw room
        //console.log("LeaveRoom "+ Object.RoomID);
        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            if (client.UserAccountID == Object.UserAccountID) {
                  client.Money = parseInt(client.Money) - parseInt(Object.WithdrawAmount); //add back the money to the player
            }
          }
        });
      }

      else if (Object.Type == "RoomChanged") { //event withdraw room
        //console.log("LeaveRoom "+ Object.RoomID);
        /*room player count */
        let RoomNames=[];
        if(ws.Rooms!=undefined&&ws.Rooms.length>0){
          for(let i=0;i<ws.Rooms.length;++i){
         //   console.log("Room "+ws.Rooms[i].RoomID);
            RoomNames.push(ws.Rooms[i].RoomID);
          }
        }

        /*lobby same account count */
          var countSameAccountInLobby=0;
          wss.clients.forEach((client) => {
            if (client.readyState == 1) {
              if (client.UserAccountID == Object.UserAccountID) {
                if(client.isLobby==true){
                  countSameAccountInLobby++;
           
                }
              }
            }
          });
          if(countSameAccountInLobby>0){//just put one when we find one player in lobby
            RoomNames.push("Lobby");
          }
        //new

        var query3 = "UPDATE `sampledb`.`players` SET `CurrentRoomName` = \'"+RoomNames+"\' WHERE (`UserAccountID` = \'"+_UserAccountID+"\');";
        console.log("RoomChange "+Object.RoomName);
       // console.log(Json.stringify(ws.Rooms,));
     

        DBConnect.DBConnect(query3, function (response) {
          if (response != undefined) {
            
            //console.log(response[0]);
          }
        });


        //old
       /* wss.clients.forEach((client) => {

          if (client.readyState == 1) {
            if (client.UserAccountID == ws.UserAccountID) {

              var _UserAccountID = Object.UserAccountID;

              var query3 = "UPDATE `sampledb`.`players` SET `CurrentRoomName` = \'"+Object.RoomName+"\' WHERE (`UserAccountID` = \'"+_UserAccountID+"\');";
              console.log("RoomChange "+Object.RoomName);
              DBConnect.DBConnect(query3, function (response) {
                if (response != undefined) {
                  
                  //console.log(response[0]);
                }
              });
            }
          }
        });*/
      }
      else if (Object.Type == "LeaveRoom") { //event leave room
        ws.isLobby=true;
        //console.log("LeaveRoom "+ Object.RoomID);
        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            if (client.UserAccountID == Object.UserAccountID) {
              if(client.Rooms!=undefined){
                var filtered = client.Rooms.filter(function (value) { //the oldest user account with the roomID // the oldest is basically the first item we find from 0 to N.. 
                  return value.RoomID == Object.RoomID;
                });
                if (filtered.length > 0) {
                  if (filtered[0].BuyIn != undefined) { // LeaveRoom the oldest is basically the first item we find from 0 to N.. 
                    client.Money = parseInt(client.Money) + parseInt(filtered[0].BuyIn); //add back the money to the player
  
                    var NewArrayfiltered = client.Rooms.filter(function (value) {
                      return value.RoomID !== Object.RoomID;
                    });
  
                    client.Rooms = NewArrayfiltered;
                  }
                } else {
                  console.log("LeaveRoom but and last Player");
                }
              }
            }
          }
        });
        
      }

      else if (Object.Type == "ComputedBet") {
        console.log("ComputedBet "+parseInt(Object.BetAmount));
        console.log("Commission "+ws.PlayerCommission);
        let result = GlobalFunctions.ComputeRakePlayer(parseInt(Object.BetAmount),parseFloat( ws.PlayerCommission)).playerRake;
        let ConvertedBet = (parseInt(Object.BetAmount)-result);
        console.log("ConvertedBet :" +ConvertedBet);
        ws.send(stringify({
          Response: "ConvertedBet",
          ConvertedBet:ConvertedBet,
        }, null, 0));
      }
     
      else if (Object.Type == "Bet") { //bet event occured 
        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            if (client.UserAccountID == Object.UserAccountID&&client.isLeadSocket==true) { //we sync all same account bet value only updates one lead must exist in all instances
              console.log("Socket Bet");
         
              for (var i = 0; i < client.Rooms.length; ++i) {
                if (client.Rooms[i].RoomID == Object.RoomID) {
                  if (parseInt(client.Rooms[i].BuyIn) - parseInt(Object.BetAmount) >= 0) {
                    client.Rooms[i].BuyIn = parseInt(client.Rooms[i].BuyIn) - parseInt(Object.BetAmount);

                   /* ws.send(stringify({
                      Response: "Something"
                    }, null, 0));*/

                    var NewRooms = client.Rooms;// lead room

                    wss.clients.forEach((client2) => {
                      if(client2.UserAccountID==ws.UserAccountID){
                        client2.Rooms = NewRooms;//copy lead to children
                      }
                    });

                  } else {
                    ws.send(stringify({
                      Response: "NotEnoughMoney"
                    }, null, 0)); //pops up only to the local player trying to bet
                    //target.send();
                    console.log("Tried to bet with no money");
                  }
                }
              }
            }
          }
        });
        
        
        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            for(let i=0;i<ws.ParentUserAccountIDList.length;++i){
              if(ws.ParentUserAccountIDList.includes(client.UserAccountID)){
                console.log("Parent To Notify "+client.UserAccountID);
                client.send(stringify({
                  Response: "PlayerBet"
                }, null, 0));
              }
            }
          }
        });

     

      } else if (Object.Type == "Win") { //Win event occured 
        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            if (client.UserAccountID == Object.UserAccountID&&client.isLeadSocket==true) { //we sync all same account win value only updates one lead must exist in all instances
              console.log("Socket Won");
              for (var i = 0; i < client.Rooms.length; ++i) {
                if (client.Rooms[i].RoomID == Object.RoomID) {
                  if (parseInt(client.Rooms[i].BuyIn) + parseInt(Object.WinAmount) >= 0) {
                    client.Rooms[i].BuyIn = parseInt(client.Rooms[i].BuyIn) + parseInt(Object.WinAmount);
                    
                  }
                }
              }
              var NewRooms = client.Rooms;//the lead room
              wss.clients.forEach((client2) => {
                if(client2.UserAccountID==ws.UserAccountID){
                  client2.Rooms = NewRooms;//copy lead to children
                }
              });
              console.log("Winz");
            }

            if(client.UserAccountID==ws.UserAccountID){//only add to te same Account but diffrent instances
              client.WinPoints++;//add Win Points to All Same Player no need to filter lead
            }
          

          }
        });
      } else if (Object.Type == "BuyIn") { //identify object type
        ws.isLobby=false;

        var BuyInRoom = Object;
        //console.log(BuyInRoom);
        wss.clients.forEach((client) => {
          //existing buyin
          if (client.UserAccountID == Object.UserAccountID&&client.isLeadSocket==true) {//the lead role must always be passed when it leaves if not this code wont execute
            //  console.log("Buyin Money "+ Object.BuyIn);
            if (client.Rooms == undefined) { //when empty must inisialize only then the one bellow it can push
              client.Rooms = [];
            }
            if (client.Rooms.length == 0) { //when no child or parent in room same account instances
              client.Rooms.push({
                RoomID: Object.RoomID,
                BuyIn: Object.BuyIn,
                InstanceID:ws.InstanceID
              });
              //console.log(client.Rooms);
              client.Money = parseInt(client.Money) - parseInt(Object.BuyIn);
              
            } else {
              // new buyin update or insert
              if (client.Money - Object.BuyIn>0) {//the top must be an isleadScoket
                var NotFound = true;
                var NewRooms = [];//the new rooms from is lead above

                for (var i = 0; i < client.Rooms.length; ++i) {//updates the lead accout
                  if (client.Rooms[i].RoomID == Object.RoomID&&client.UserAccountID==ws.UserAccountID) { //Match Found Update Instead
                    console.log("Match Found Update Instead");
                    client.Money = (parseInt(client.Money) - parseInt(Object.BuyIn));
                    client.Rooms[i].BuyIn =(parseInt(client.Rooms[i].BuyIn) + parseInt(Object.BuyIn));
                    //console.log(client.Rooms[i].BuyIn + Object.BuyIn);
                    NotFound = false;
                    // break;
                  }
                }

                NewRooms= client.Rooms;//pass the new value to childrens

                wss.clients.forEach((client) => {
                  if(client.UserAccountID==ws.UserAccountID){
                    client.Rooms = NewRooms;
                  }
                
                });
                if (NotFound == true) { // nothing found so we add it instead
                  client.Rooms.push({
                    RoomID: Object.RoomID,
                    BuyIn: Object.BuyIn,
                    InstanceID:ws.InstanceID
                  });
                  //console.log(client.Rooms);
                  client.Money = parseInt(client.Money) - parseInt(Object.BuyIn);
                }
              } else {
                console.log("Not Enough Money");
              }

            }
          }
        });
        console.log("Buyin : " + BuyInRoom);

        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            for(let i=0;i<ws.ParentUserAccountIDList.length;++i){
              if(ws.ParentUserAccountIDList.includes(client.UserAccountID)){
                console.log("Parent To Notify "+client.UserAccountID);
                client.send(stringify({
                  Response: "PlayerBuyIn"
                }, null, 0));
              }
            }
          }
        });
      }
    } else {
      //possibly a diffrent message type
      console.log("some message : " + event.data);
    }

  }

  ws.onerror = function (event) {

    console.debug("WebSocket Error message received:", event);
  };
  ws.onclose = function (event) {
    let DisconnectedUserAccountID= event.target.UserAccountID;
    let DisconnectedInstanceID = event.target.InstanceID;

  

    //console.log("isLeadSocket Left "+event.target.isLeadSocket);

   


    if(event.target.isLeadSocket==true){//when Lead leaves

      console.log("--------Sudden Disconnected Lead--------");

    //  console.log("Lead Leave Total clients "+ wss.clients.size);
      if(wss.clients.size>0){//should always execute as  long as their are players
          console.log("Lead Leave with more than 1 client");
          let array = Array.from(wss.clients);
         // console.log("Array Rooms "+JSON.stringify(Jsoncycle.decycle(array),null,2));
         if(array.length!=undefined&&array.length>0){
          let LeadRooms =array[0].Rooms;// first index
          
          // console.log("Room :" +JSON.stringify(Jsoncycle.decycle(array[1].Rooms),null,2));

          //-------start new rooms asignment
            let NewLeadRooms =[];
            let NewLeadInstanceID = array[0].InstanceID;
            let OldBuyInOfOldLead =0;
            for(let i =0;i<LeadRooms.length;++i){
              if(DisconnectedInstanceID!=LeadRooms[i].InstanceID){
                NewLeadRooms.push(LeadRooms[i]);
              }
              else if(DisconnectedInstanceID==LeadRooms[i].InstanceID){
                console.log("Disconnected Money "+LeadRooms[i].BuyIn);
                OldBuyInOfOldLead = LeadRooms[i].BuyIn;
              }
            }
            console.log("OldBuyInOfOldLead "+OldBuyInOfOldLead);
           wss.clients.forEach((client) => {//add back the money
              if (client.readyState == 1) {
                  client.Money=client.Money+OldBuyInOfOldLead;
              }});


          //  console.log("Room :" +JSON.stringify(Jsoncycle.decycle(NewLeadRooms),null,2));
          //  wss.clients[0].isLeadSocket=true;//set as new lead
            console.log("New Lead Instance ID : "+NewLeadInstanceID);
            wss.clients.forEach((client) => {
              if (client.readyState == 1) {

                client.Rooms = NewLeadRooms;
                if(client.InstanceID==NewLeadInstanceID){
                  client.isLeadSocket=true;
                }
              }});
              //-------end new rooms asignment
         }else{
           console.log("No Rooms to migrate Safe because no same account is playing");
         }
      }else{
        console.log("Sudden Disconnected Client last player and also lead");
      }
    }else{
      console.log("----------Sudden Disconnected Non Lead------------");
      wss.clients.forEach((client) => {
        if(client.isLeadSocket==true){//we get the lead account it must exist 
          var rooms = client.Rooms;
          if(rooms!=undefined){
            for(let i =0;i<rooms.length;++i){
              if(rooms[i].InstanceID==DisconnectedInstanceID){
                client.Money = (client.Money)+ (rooms[i].BuyIn);
               // console.log((DisconnectedInstanceID)+"  Instance Exit with room " + (stringify(client.Rooms,null,0)));
              }
            }
          }
        }
      })

      //clearance check
   
    }



    wss.clients.forEach((client) => {
      if (client.readyState == 1) {
        if (client.UserAccountID == Object.UserAccountID) {
          if(client.Rooms!=undefined){
            var filtered = client.Rooms.filter(function (value) { //the oldest user account with the roomID // the oldest is basically the first item we find from 0 to N.. 
              return value.RoomID == Object.RoomID;
            });
            if (filtered[0].BuyIn != undefined) { //Onclose the oldest is basically the first item we find from 0 to N.. 
              client.Money = parseInt(client.Money) + parseInt(filtered[0].BuyIn); //add back the money to the player
  
              var NewArrayfiltered = client.Rooms.filter(function (value) {
                return value.RoomID !== Object.RoomID;
              });
  
              client.Rooms = NewArrayfiltered;
            }
          }
        }
      }
    });
    
    let CountSameAccount =0;
    wss.clients.forEach((client) => {
      if (client.readyState == 1) {
        if (client.UserAccountID == DisconnectedUserAccountID) {
          CountSameAccount++;
        }
      }
    });

    if(CountSameAccount==0){
      console.log("Last Instance Of : "+DisconnectedUserAccountID +" Disconnected");
      var query2 = "UPDATE `sampledb`.`useraccounts` SET `OnlineStatus` = 'Offline' WHERE (`UserAccountID` = \'"+_UserAccountID+"\');";
      function UpdateStatus(){
        DBConnect.DBConnect(query2, function (response) {
          if (response != undefined) {
          }
        });
      }
      UpdateStatus();
    }



   // console.log(JSON.stringify(jc.decycle(event.target.UserAccountID)));

    ConnectedUsers--;
    DeadInstanceIDCleanUp();//call clean up and update clients right away after a disconnect occurs
  //  console.log('Client disconnected ' + ConnectedUsers+" UserAccount That Disconnected : "+event.target.UserAccountID);
  };
});

//websocket constant InvokeRepeat
setInterval(() => {
  InvokeRepeat();
}, 500);
function GetBasicInformation(UserAccountID,callback) {
  let BasicUserInformation ={};
  DBCheck.UserAccountIDBasicInformation(UserAccountID, function (response) {
    if (response != undefined) {
      //  ws.UserName = response[0]["UserName"];
      BasicUserInformation.UserName = response[0]["UserName"];
      DBGlobal.getCommissionPercentages(UserAccountID, function (response) {
        if (response != undefined) {
          // let _playerToOHOCommission = response.playerToOHOCommission[0];
          //ws.PlayerCommission=response[0]['pCommission'];
          BasicUserInformation.PlayerCommission = response[0]['pCommission'];
          DBGlobal.InGamePlayerWins(UserAccountID, function (response) {
            if (response != undefined) {
              //   ws.WinPoints=response[0]['WinPoints'];
              BasicUserInformation.WinPoints = response[0]['WinPoints'];
              // console.log(stringify(response,null,2));
              console.log("PlayerWins Socket :" + response[0]['WinPoints']);
              callback(BasicUserInformation);
            }
            else {
              //if the user never won anything this will occur
              callback(BasicUserInformation);
            }
          });
          console.log("pCommisssion Socket :" + response[0]['pCommission']);
        }
        else {
          console.log("Websocket Set Up Error 1");
        }
      });
    }
    else {
      console.log("Websocket Set Up Error 3");
    }
  });
}

function DeadInstanceIDCleanUp(){//accessed by a InvokeRepeat aswell
    //dead InstanceID clean Up which accessed by the onError of websocket
    wss.clients.forEach((client) => {

      let UserAccountID = client.UserAccountID;
  
      if(client.isLeadSocket==true){
        let InstanceID = client.InstanceID;//Lead InstanceID
   
      //  console.log("Lead InstanceID "+InstanceID);
        let LeadRooms = client.Rooms;//we get the oldest instanceid it is also likely tag as isLeadSocket
        
        var NewRooms = [];
   
        wss.clients.forEach((client2) => {
          
          let ChildInstanceID = client2.InstanceID;
          if(LeadRooms!=undefined){
            //this filters out dead InstanceID Across Active InstanceID 
            for(let i =0;i<LeadRooms.length;++i){
              if(ChildInstanceID == LeadRooms[i].InstanceID){
              
                NewRooms.push(LeadRooms[i]);
              }
  
            }
          }
        });
        var DeadInstanceAtRoom=[];
        if(LeadRooms!=undefined){
          for(let i2=0;i2<LeadRooms.length;++i2){
            let found =false;
            for(let j=0;j<NewRooms.length;++j){
              if(NewRooms[j].InstanceID==LeadRooms[i2].InstanceID){
                found=true;
                break;
              }
            }
            DeadInstanceAtRoom.push(LeadRooms[i2]);
          }
        }
  
        
        //copy new Rooms Instances
        wss.clients.forEach((client3) => {
          if(client3.UserAccountID==UserAccountID){
            client3.Rooms = NewRooms;
          }
        });
       // console.log("Expected new List  from lead " + stringify(NewRooms,null,0));
        if(DeadInstanceAtRoom.length>0){
       //   console.log("DeadInstanceAtRoom  from lead " + stringify(DeadInstanceAtRoom,null,0));
        }
    
      }
    });
}
function InvokeRepeat(){//this is also accessed by OnError of websocket just in case
 

  DeadInstanceIDCleanUp();


  let array = Array.from(wss.clients);
  var distinctlist = Enumerable.from(array);

  wss.clients.forEach((client) => {

    client.Money = parseInt(LatestAndUnique(distinctlist, client.UserAccountID).Money);
    // console.log("UserAccountID "+client.UserAccountID+" "+client.Money);
  });
  wss.clients.forEach((client) => {
    if (client.readyState == 1) {
      var count = 0;
      wss.clients.forEach((client2) => {
        if (client2.UserAccountID == client.UserAccountID) {
          count++;
        }
      });
      const ResponseData = {
        UserAccountID: client.UserAccountID,
        DepositNotice: client.DepositNotice,
        TransferNotice: client.TransferNotice,
        Money: client.Money,
        Rooms: client.Rooms,
        CountSameAccount: count,
        InstanceID: client.InstanceID,
        isLeadSocket: client.isLeadSocket,
        WinPoints:client.WinPoints
      };
      let result = stringify(ResponseData, null, 0);

      totalSocketBytes+=sizeof(result);
      client.send(result);
    }
    // console.log("UserAccountID "+client.UserAccountID+" "+client.Money);
  });

  // console.log(array.length);

  /*wss.clients.forEach((client) => {
      if(client.readyState==1){
     
        client.send(stringify({
          UserAccountID:client.UserAccountID,
          Money:client.Money
        },null,0));
      }
  });*/
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

var path = require('path');
var mime = require('mime');
var fs = require('fs');

app.get('/download/:Name', function(req, res){
  let requestfile = req.params.Name;
  res.download(__dirname + '/downloadable/'+requestfile);  
});


//Test Connection Important here to check if information provided is correct
//require('./API/SharedController/DBConnect').DBConnectTest();


// listen (start app with node server.js) ======================================
//server.listen(port, ip);// no loger needed

/*console.log('Server running on http://%s:%s', ip, port);
console.log("--------process informationz  for openshift---------");
console.log(beautify(process.env, null, 2, 100));
console.log("-----------------");
console.log("MysqlHost :"+process.env.MYSQL_SERVICE_HOST || 'localhost'); //output the service if service host is undefined
console.log("Mysql Port :"+process.env.MYSQL_SERVICE_PORT || 3306);

console.log("MariaHost :"+process.env.MARIADB_SERVICE_HOST || 'localhost'); //output the service if service host is undefined
console.log("MariaDB Port :"+process.env.MARIADB_SERVICE_PORT || 3306);


console.log("Redis :"+process.env.REDIS_PORT_6379_TCP_ADDR);
console.log("Redis Port :"+process.env.REDIS_PORT_6379_TCP_PORT);*/

var requestStats = require('request-stats');

console.log(beautify(process.env, null, 2, 100));

const pretty = require('prettysize');
var stats = requestStats(server);
var AllHttpBytes = 0;

stats.on('complete', function (details) {
  var size = details.req.bytes;
  AllHttpBytes+=size;
  console.log("Total Size of Each HTTP : " +pretty(AllHttpBytes)+ " Total Socket Size : " +pretty(totalSocketBytes));
});

let blocked = require('blocked');
blocked((time, stack) => {
  if(stack!=undefined){
    console.log(`Blocked for ${time}ms, operation started here:`, stack)
  }
 
},{threshold:4, trimFalsePositives:true});

/*
var stats = requestStats(app);

stats.on('complete', function (details) {
  var size = details.req.bytes;
  console.log(size);
});
stats.on('request', function (req) {
  // evey second, print stats
  var interval = setInterval(function () {
    var progress = req.progress()
    console.log(progress)
    if (progress.completed) clearInterval(interval)
  }, 1000)
})*/

/*this catches everything and prevent node application from compleatly shutting down */
process.on('uncaughtException', function (err) {


  console.log("Catch everything: "+err);

  if(ServerMode=="Debug"){
  /*send the error to the connected clients not needed in Server Production Mode*/
  wss.clients.forEach((client) => {
    if (client.readyState == 1) {
      var count = 0;
      wss.clients.forEach((client2) => {
        if (client2.UserAccountID == client.UserAccountID) {
          count++;
        }
      });
      const ResponseData = {
        ServerError:err,
      };
      let result = stringify(ResponseData, null, 0);
      totalSocketBytes+=sizeof(result);
      client.send(result);
    }
    // console.log("UserAccountID "+client.UserAccountID+" "+client.Money);
  });
  }
});


//to show all routes 
/*
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(r.route.path)
  }
})*/
module.exports = routes;
module.exports = app;