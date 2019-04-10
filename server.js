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
var request = require('request');
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


//app.use(express.static('AdminSocket'));
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

console.log("ConnectionMode : "+ConnectionMode.getMainAddressByProductionMode());


app.get('/success',function(req,res,next){
  res.sendStatus(200);
});

app.get('/fail',function(req,res){
});

const http = require('http');


//used by the socket from another server
app.get('/GetBasicInformation/UserAccountID/:UserAccountID',function(req,res){
  let UserAccountID = req.params.UserAccountID;
  res.setHeader('Content-Type', 'application/json');
  let Result = {};
  GetBasicInformation(UserAccountID,function(BasicInformation){
    Result.UserName = BasicInformation.UserName;
    Result.ScreenName = BasicInformation.Result;
    Result.Money = BasicInformation.Money;
    Result.WinPoints = BasicInformation.WinPoints;
    Result.PlayerCommission = BasicInformation.PlayerCommission;
    Result.ParentUserAccountID = BasicInformation.ParentUserAccountID;
//temporarly here to update 
    var query2 = "UPDATE `sampledb`.`useraccounts` SET `OnlineStatus` = 'Online' WHERE (`UserAccountID` = \'"+UserAccountID+"\');";
    DBConnect.DBConnect(query2, function (response) {
      if (response != undefined) {
        res.json(Result);
      }
    });
  });
});

function GetBasicInformation(UserAccountID,callback) {
  let BasicUserInformation ={};
  DBCheck.UserAccountIDBasicInformation(UserAccountID, function (response) {
    if (response != undefined) {
      //  ws.UserName = response[0]["UserName"];
      BasicUserInformation.UserName = response[0]["UserName"];
      BasicUserInformation.Money = response[0]["Money"];
      BasicUserInformation.ScreenName = response[0]["ScreenName"];
      BasicUserInformation.ParentUserAccountID = response[0]["ParentUserAccountID"];
      console.log("GetBasicInformation ParentUserAccountID : "+BasicUserInformation.ParentUserAccountID);
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

    /*  DBGlobal.getCommissionPercentages(UserAccountID, function (response) {
        if (response != undefined) {
          // let _playerToOHOCommission = response.playerToOHOCommission[0];
          //ws.PlayerCommission=response[0]['pCommission'];
          BasicUserInformation.PlayerCommission = response[0]['pCommission'];
         
          console.log("pCommisssion Socket :" + response[0]['pCommission']);
        }
        else {
          console.log("Websocket Set Up Error 1");
        }
      });*/

    }
    else {
      console.log("Websocket Set Up Error 3");
    }
  });
}
//this is accessed by the websocket to indicate online offline status of a player from the socket server
app.get('/Connection/Status/:Status/UserAccountID/:UserAccountID/',function(req,res){
  let UserAccountID = req.params.UserAccountID;
  let Status = req.params.Status;
  res.setHeader('Content-Type', 'application/json');
  var query2 = "UPDATE `sampledb`.`useraccounts` SET `OnlineStatus` = \'"+Status+"\' WHERE (`UserAccountID` = \'"+UserAccountID+"\');";
  DBConnect.DBConnect(query2, function (response) {
    if (response != undefined) {
      res.sendStatus(200);
    }else{
      console.log("------Failed to update Player Online Status on DB-------");
    }
  });
});
//this is accessed by the websocket to set the room names of a user account
app.get('/PlayerRooms/Rooms/:RoomNames/UserAccountID/:UserAccountID/',function(req,res){
  let UserAccountID = req.params.UserAccountID;
  let RoomNames = req.params.RoomNames;
  res.setHeader('Content-Type', 'application/json');
  var query3 = "UPDATE `sampledb`.`players` SET `CurrentRoomName` = \'"+RoomNames+"\' WHERE (`UserAccountID` = \'"+UserAccountID+"\');";
  console.log("RoomChange "+Object.RoomName);
 // console.log(Json.stringify(ws.Rooms,));
  DBConnect.DBConnect(query3, function (response) {
    if (response != undefined) {
      //console.log(response[0]);
      res.sendStatus(200);
    }else{
      console.log("------Failed to update rooms on db player-------");
    }
  });
});

//Check Approved validate used by socket for db confirmation
app.get('/DepositApproveCheck/UserTransactionID/:UserTransactionID/',function(req,res){
  let UserTransactionID = req.params.UserTransactionID;
 
  var query2 = "SELECT Amount FROM sampledb.transactions where TransactionStatus='approved' and TransactionType='deposit' and UserTransactionID=\'"+UserTransactionID+"\';";
  console.log(query2);
  DBConnect.DBConnect(query2, function (response) {
    if (response != undefined) {
      let ToSend = {UserTransactionID:UserTransactionID,Amount:response[0].Amount};
      console.log(ToSend);
      res.json(ToSend);
    }else{
      console.log('---------May have executed before the api route of aproval----------');
      res.sendStatus(403);
    }
  });
});


var redis = require("redis"),
    client = redis.createClient({ host: process.env.REDIS_PORT_6379_TCP_ADDR,password:"eastcoast"});
 
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
 
client.on("error", function (err) {
    console.log("Error " + err);
});

 var isProduction="";
 if( process.env.NODE_ENV=="production"){
  isProduction="production";
 }else{
   isProduction="";
 }
 
//important redis dosn't allow undefined so we delcare as empty or valued
client.set("string key",isProduction, redis.print);
client.get("string key", function(err, reply) {
  // reply is null when the key is missing
  console.log("Redis result :" + reply);
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

//console.log(beautify(process.env, null, 2, 100));

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