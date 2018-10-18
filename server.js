// server.js
"use strict";
// set up ========================
var helmet = require('helmet');
//var sqlinjection = require('sql-injection');// disable because it blocks token access
var express = require('express');
const routes = require('express').Router();
var Nexmo = require('nexmo');
var Combinatorics = require('js-combinatorics');
const PokerHand = require('poker-hand-evaluator');
const sortBy = require('sort-array');
var app = express(); // create our app w/ express
app.use(helmet());
var fs = require('fs')
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var isNullOrEmpty = require('is-null-or-empty');
const mysql = require('mysql2');
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
const sendmail = require('sendmail')();

//app.use(sqlinjection);// disable because it blocks token access

// configuration =================
//app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
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

//to enable CORS required for json request get put post and http cross
//https must be enabled
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  var allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:8020', 'http://127.0.0.1:8080', 'http://127.0.0.1:9000', 'http://localhost:9000', 'http://localhost:8080'];
  var origin = req.headers.origin;
  res.header("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.header('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
/*app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));
*/

//===========API===========
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
require('./API/v1/InGameFinalCard/InGameFinalCard')(app);
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
require('./API/v1/PlayerFinalCard/PlayerFinalCard')(app);
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

let DBConnect = require("../vuejs-ex/API/SharedController/DBConnect");
function test(){
 let RegisterModel= require('./API/v1/Register/RegisterModel');
 RegisterModel.RegisterAccount('UserAccountID'+Math.random(),'AccessID','UserName','Password','ValidKey','Email','PhoneNumber','BankName','AccountNumber','SecurityCode','Valid','Expiration',function(response){
    console.log("OK");
  });
}
//--testing for season based authentication END

var nexmo = new Nexmo({
  apiKey: "34958c75",
  apiSecret: "VnTUCGBvp3yr2onE",
  /* applicationId: APP_ID,
   privateKey: PRIVATE_KEY_PATH,*/
}, {
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
});


/**
 *
 *
 * @param {*} To
 * @param {*} From
 * @param {*} Subject
 * @param {*} html
 */
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
}
app.get('/', function (req, res) {
  res.send("");
});
//--Login End


app.get('/Api/', function (req, res) {
  res.send('pick version');
});
app.get('/Api/v1', function (req, res) {
  res.send('Api v1 version');
});
//---POKER ROUTING START



const SocketServer = require('ws').Server;
const path = require('path');


//const INDEX = path.join(__dirname, 'index.html');

const server = app
  //.use((req, res) => res.sendFile("") )
  .listen(port, () => console.log(`Listening on ${ port }`));
const wss = new SocketServer({ server });
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));//if it never triggred even if the client times out its ok no acutal disconnection happend
});
setInterval(() => {
  
  wss.clients.forEach((client) => {
    if (client.readyState == WebSocket.OPEN) { 
      client.send(new Date().toTimeString());
    }
   
  });
}, 1000);

// listen (start app with node server.js) ======================================
server.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
module.exports = routes;
module.exports = app;