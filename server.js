// server.js
"use strict";
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

let DBConnect = require("./API/SharedController/DBConnect");

/*
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
*/

function test() {
  let RegisterModel = require('./API/v1/Register/RegisterModel');
  RegisterModel.RegisterAccount('UserAccountID' + Math.random(), 'AccessID', 'UserName', 'Password', 'ValidKey', 'Email', 'PhoneNumber', 'BankName', 'AccountNumber', 'SecurityCode', 'Valid', 'Expiration', function (response) {
    console.log("OK");
  });
}
//--testing for season based authentication END
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
app.get('/', function (req, res) {
  res.sendStatus(200);
});
//--Login End

var cache = require('express-redis-cache')({
  host: process.env.REDIS_PORT_6379_TCP_ADDR||'localhost', port: process.env.REDIS_PORT_6379_TCP_PORT||6379,no_ready_check: true, auth_pass: 'eastcoast'
  });


  
  const Redis = require('ioredis');
  const redisClient = new Redis({ enableOfflineQueue: false, host: process.env.REDIS_PORT_6379_TCP_ADDR||'localhost', port: process.env.REDIS_PORT_6379_TCP_PORT||6379 });
  
  const { RateLimiterRedis, RateLimiterMemory } = require('rate-limiter-flexible');


  const opts = {
    storeClient: redisClient,
    points: 6, // Number of points
    duration: 5, // Per second(s)
  };
   
  const rateLimiter = new RateLimiterMemory(opts);

  const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.connection.remoteAddress)
      .then(() => {
        next();
      })
      .catch((rejRes) => {
        res.status(429).send('Too Many Requests');
      });
  };


app.get('/Api/', /*Security.globalBruteforce.prevent,*/ rateLimiterMiddleware,/*cache.route({ expire: 5  }),*/function (req, res) {
  res.send('pick version');
  //setTimeout(function(){res.send('pick version');}, 10000);
});
/*
app.get('/Api/v1', Security.globalBruteforce.prevent,cache.route({ expire: 100  }),function (req, res) {
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
  var query = "SELECT `Money` FROM sampledb.players WHERE `UserAccountID` = '" + _UserAccountID + "';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      ws.Money = parseInt(response[0].Money);
      //console.log(response[0]);
    }
  });




  // Update Player variables Listing upon inisialization of a same useraccount to match the oldest index useraccount


  // console.log("url: ", ws);

  ws.onmessage = function (event) {
    //console.log(event.data);


    if (IsJsonString(event.data)) {
      totalSocketBytes +=sizeof(event.data);
      let Object = JSON.parse(event.data);
      
      console.log(Object);
      
      if (Object.Type == "Transfer") { //event leave room
        //console.log("LeaveRoom "+ Object.RoomID);
        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            if (client.UserAccountID == Object.UserAccountID) {
                  client.Money = parseInt(client.Money) - parseInt(Object.TransferAmount); //add back the money to the player
            }
          }
        });
      }

      if (Object.Type == "LeaveRoom") { //event leave room
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
      } else if (Object.Type == "Bet") { //bet event occured 
        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            if (client.UserAccountID == Object.UserAccountID) { //we sync all same account bet value
              console.log("Socket Bet");
              for (var i = 0; i < client.Rooms.length; ++i) {
                if (client.Rooms[i].RoomID == Object.RoomID) {
                  if (parseInt(client.Rooms[i].BuyIn) - parseInt(Object.BetAmount) >= 0) {
                    client.Rooms[i].BuyIn = parseInt(client.Rooms[i].BuyIn) - parseInt(Object.BetAmount);
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
      } else if (Object.Type == "Win") { //Win event occured 
        wss.clients.forEach((client) => {
          if (client.readyState == 1) {
            if (client.UserAccountID == Object.UserAccountID) { //we sync all same account win value
              console.log("Socket Won");
              for (var i = 0; i < client.Rooms.length; ++i) {
                if (client.Rooms[i].RoomID == Object.RoomID) {
                  if (parseInt(client.Rooms[i].BuyIn) + parseInt(Object.WinAmount) >= 0) {
                    client.Rooms[i].BuyIn = parseInt(client.Rooms[i].BuyIn) + parseInt(Object.WinAmount);
                  }
                }
              }
            }
          }
        });
      } else if (Object.Type == "BuyIn") { //identify object type
        var BuyInRoom = Object;
        //console.log(BuyInRoom);
        wss.clients.forEach((client) => {
          if (client.UserAccountID == Object.UserAccountID) {
            //  console.log("Buyin Money "+ Object.BuyIn);
            if (client.Rooms == undefined) { //when empty must inisialize only then the one bellow it can push
              client.Rooms = [];
            }
            if (client.Rooms.length == 0) { //must be if
              client.Rooms.push({
                RoomID: Object.RoomID,
                BuyIn: Object.BuyIn
              });
              //console.log(client.Rooms);
              client.Money = parseInt(client.Money) - parseInt(Object.BuyIn);
            } else {

              if (client.Money - Object.BuyIn) {
                var NotFound = true;
                for (var i = 0; i < client.Rooms.length; ++i) {
                  if (client.Rooms[i].RoomID == Object.RoomID) { //Match Found Update Instead
                    console.log("Match Found Update Instead");
                    client.Money = parseInt(client.Money) - parseInt(Object.BuyIn);
                    client.Rooms[i].BuyIn =parseInt(client.Rooms[i].BuyIn) + parseInt(Object.BuyIn);
                    //console.log(client.Rooms[i].BuyIn + Object.BuyIn);
                    NotFound = false;
                    // break;
                  }
                }
                if (NotFound == true) { // nothing found so we add it instead
                  client.Rooms.push({
                    RoomID: Object.RoomID,
                    BuyIn: Object.BuyIn
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
      }
    } else {
      //possibly a diffrent message type
      console.log("some message " + event.data);
    }

  }

  ws.onerror = function (event) {

    console.debug("WebSocket Error message received:", event);
  };
  ws.onclose = function (event) {
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
    ConnectedUsers--;
    console.log('Client disconnected ' + ConnectedUsers);
  };
});

setInterval(() => {
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
      let result = stringify({

        UserAccountID: client.UserAccountID,
        Money: client.Money,
        Rooms: client.Rooms,
        CountSameAccount: count

      }, null, 0);
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
}, 1000);

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
var beautify = require('json-beautify');
console.log('Server running on http://%s:%s', ip, port);
console.log("--------process informationz  for openshift---------");
console.log(beautify(process.env, null, 2, 100));
console.log("-----------------");
console.log("MysqlHost :"+process.env.MYSQL_SERVICE_HOST || 'localhost'); //output the service if service host is undefined
console.log("Mysql Port :"+process.env.MYSQL_SERVICE_PORT || 3306);

console.log("MariaHost :"+process.env.MARIADB_SERVICE_HOST || 'localhost'); //output the service if service host is undefined
console.log("MariaDB Port :"+process.env.MARIADB_SERVICE_PORT || 3306);


console.log("Redis :"+process.env.REDIS_PORT_6379_TCP_ADDR);
console.log("Redis Port :"+process.env.REDIS_PORT_6379_TCP_PORT);

var requestStats = require('request-stats');


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
  console.log(`Blocked for ${time}ms, operation started here:`, stack)
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

module.exports = routes;
module.exports = app;