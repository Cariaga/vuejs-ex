// server.js
"use strict";
// set up ========================
var helmet = require('helmet');
var express = require('express');
const routes = require('express').Router();
var Nexmo = require('nexmo');

var session = require("express-session");
var cookieParser = require("cookie-parser");
var jwt = require('jsonwebtoken');

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
require('./API/v1/AccessControl/AccessControl')(app);
require('./API/v1/BankInformation/BankInformation')(app);
require('./API/v1/BlackList/BlackList')(app);
require('./API/v1/DepositHistory/DepositHistory')(app);
require('./API/v1/DepositList/DepositList')(app);
require('./API/v1/Distributor/Distributor')(app);
require('./API/v1/GameHistory/GameHistory')(app);
require('./API/v1/HandHistory/HandHistory')(app);
require('./API/v1/HandHistoryList/HandHistoryList')(app);
require('./API/v1/HeadOffice/HeadOffice')(app);
require('./API/v1/IPList/IPList')(app);
require('./API/v1/Login/Login')(app);
require('./API/v1/Login/LogOut')(app);
require('./API/v1/LoginHistory/LoginHistory')(app);
require('./API/v1/MemberBlackList/MemberBlackList')(app);
require('./API/v1/MemberList/MemberList')(app);
require('./API/v1/Notification/Nontification')(app);
require('./API/v1/OneOnOne/OnOnOne')(app);
require('./API/v1/Player/Player')(app);
require('./API/v1/Register/Register')(app);
require('./API/v1/RoomConfiguration/RoomConfiguration')(app);
require('./API/v1/Shop/Shop')(app);
require('./API/v1/SupportTicket/SupportTicket')(app);
require('./API/v1/TransferHistory/TransferHistory')(app);
require('./API/v1/UserAccount/UserAccount')(app);
require('./API/v1/UserInfo/UserInfo')(app);
require('./API/v1/UserSupportTicket/UserSupportTicket')(app);
require('./API/v1/Verification/Verification')(app);
require('./API/v1/WithdrawHistory/WithdrawHistory')(app);
require('./API/v1/WithdrawHistoryList/WithdrawHistoryList')(app);

// configuration =================
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
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

var auth = function (req, res, next) {
  if (req.session && req.session.UserName === "amy")
    return next();
  else
    return res.sendStatus(401);
};
//--testing for authetication API key START
app.post('/Api/v1/Content', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});
app.post('/Api/v1/authenticate', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com'
  }

  jwt.sign({
    user
  }, 'secretkey', {
    expiresIn: '2d'
  }, (err, token) => {
    res.json({
      token
    });
  });
});
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

//--testing for authetication API key END
//--testing for season based authentication START
// Login endpoint
app.post('/authenticate', function (req, res) {
  if (!req.body.UserName) {
    res.send('login failed');
  } else if (req.body.UserName === "amy") {
    req.session.UserName = "amy";
    res.send("login success!");
  }
});
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

// Get content endpoint
app.get('/content', auth, function (req, res) {
  res.send("You can only see this after you've logged in.");
});
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
const db = require('./API/SharedController/DBConnect');
db.DBConnect('select * From UserAccounts',function(response){
  console.log(response);
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
//--Account Type Check End

app.get('/Api/v1/RawQuery/:RawQuery', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let RawQuery = req.params.RawQuery;
/*
  const connection = mysql.createConnection({
    host: '172.30.166.206',
    user: 'user',
    password: 'user',
    port: process.env.OPENSHIFT_MYSQL_DB_PORT,
    database: 'sampledb'
  });
  connection.connect();
  // simple query
  connection.query(RawQuery,
    function (err, results, fields) {
      console.log(err);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
      res.send(beautify(results, null, 2, 100));
    });
  connection.end();*/
});

//--Login End

app.get('/Api/', function (req, res) {
  res.send('pick version');
});
app.get('/Api/v1', function (req, res) {
  res.send('Api v1 version');
});
//---POKER ROUTING START
app.get('/Api/v1/Poker/:Hand/', (req, res) => {
  let PlayerHand = req.params.Hand;
  let ArrayHand = JSON.parse("[" + PlayerHand + "]"); // to array

  let cmb = Combinatorics.combination(ArrayHand, 7); //5 for holdem 7 for omha
  let AllCombinations = [];
  let a;
  while (a = cmb.next()) {
    AllCombinations.push(a);
  }
  let EvaluatedHand = [];
  for (let i = 0; i < AllCombinations.length; ++i) {
    EvaluatedHand.push(new PokerHand(AllCombinations[i].join().replace(/\,/ig, " "))); //join = tostring() // replacing "," to " " and i = ignore case sensitive, g = global
  }
  let bestScore = sortBy(EvaluatedHand, 'score');
  res.send(bestScore);
});
app.get('/Api/v1/Omaha/:Hand/', (req, res) => {
  let PlayerHand = req.params.Hand;
  let ArrayHand = JSON.parse("[" + PlayerHand + "]"); // to array

  let cmb = Combinatorics.combination(ArrayHand, 7); //5 for holdem 7 for omha
  let AllCombinations = [];
  let a;
  while (a = cmb.next()) {
    AllCombinations.push(a);
  }
  let EvaluatedHand = [];
  for (let i = 0; i < AllCombinations.length; ++i) {
    EvaluatedHand.push(new PokerHand(AllCombinations[i].join().replace(/\,/ig, " "))); //join = tostring() // replacing "," to " " and i = ignore case sensitive, g = global
  }
  let bestScore = sortBy(EvaluatedHand, 'score');
  res.send(bestScore);
});
/*
app.get('/SupportTicket/Request', function (req, res) {
  
  let UserAccountID = req.query.UserAccountID;
  let Title = req.query.Title;
  let Description = req.query.Description;
  let Reason = req.query.Reason;
  let Time = '';
  let Date = '';
  let Status = 'Pending';
  getCurrentTime(function(response){
    Time=response;
  });
  getCurrentDate(function(response){
    Date= response;
  });
  console.log("Time : "+Time);
  console.log("Date : "+Date);
  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(Title)){
      if(!isNullOrEmpty(Description)){
        if(!isNullOrEmpty(Reason)){
          if(!isNullOrEmpty(Time)){
            if(!isNullOrEmpty(Date)){
              if(!isNullOrEmpty(Status)){
                AddSupportTicket(UserAccountID,Title,Description,Reason,Time,Date,Status,function(response) {
                  res.send(response);
                });
              }
            }else{
              res.send({DateMissing:true});
            }
          }else{
            res.send({TimeMissing:true});
          }
        }else{
          res.send({ReasonMissing:true});
        }
      }else{
        res.send({DescriptionMissing:true});
      }
    }else{
      res.send({TitleMissing:true});
    }
  }else{
    res.send({UserAccountIDMissing:true});
  }
});
*/
/*
app.get('/DepositHistory', function (req, res) {
  //DepositHistory?UserName=4dshg5D4d&Password=sdgsdrhGHSD46&Amount=132&BankNameUsed=BankNameUsed&SecurityCodeUsed=SecurityCodeUsed
   let UserName = req.query.UserName;
   let Password = req.query.Password;
   let Amount = req.query.Amount;
   let BankNameUsed = req.query.BankNameUsed;
   let SecurityCodeUsed = req.query.SecurityCodeUsed;
   let Status = 'Pending';//must be have default
   let RequestedDATE = '';//runtime assigned
   let ApprovedDATE = undefined;//must be undefined
   let RejectedDATE = undefined;//must be undefined
   let ProcessingDATE =undefined;//must be undefined
   let RequestedTIME = '';//runtime assigned here
   let ApprovedTIME = undefined;//must be undefined
   let RejectedTIME = undefined;//must be undefined
   let ProcessingTIME = undefined;//must be undefined
   if(!isNullOrEmpty(UserName)){
    console.log("UserName :"+UserName);
    if(!isNullOrEmpty(Amount)&&Amount>0){
        isUserNameExist(UserName,function(response3){
          let obj = response3;
          let UserAccountID = obj[0].UserAccountID;//runtime assigned by Username
            console.log("UserAccountID: "+UserAccountID);
          if(!isNullOrEmpty(obj)&&obj!=undefined){
          
            async.waterfall([TimeCheck,DateCheck],function(err,result){
              if(!isNullOrEmpty(UserAccountID)&&
              !isNullOrEmpty(Amount)&&
              !isNullOrEmpty(BankNameUsed)&&
              !isNullOrEmpty(SecurityCodeUsed)&&
              !isNullOrEmpty(Status)&&
              !isNullOrEmpty(RequestedDATE)&&
              !isNullOrEmpty(RequestedTIME)){
                AddDepositHistory(UserAccountID,
                  Amount,
                  BankNameUsed,
                  SecurityCodeUsed,
                  Status,
                  RequestedDATE,
                  ApprovedDATE,
                  RejectedDATE,
                  ProcessingDATE,
                  RequestedTIME,
                  ApprovedTIME,
                  RejectedTIME,
                  ProcessingTIME,function(response) {
                    let Data = { IsInvalidUserName:false,IsUserNameNotFound:false,IsInvalidBankInformation:false,IsInvalidAmount:false, ResponseCode:1 };
                    res.send(Data);
                });
              }
              else{
                let Data = { IsInvalidUserName:false,IsUserNameNotFound:false,IsInvalidBankInformation:true,IsInvalidAmount:false, ResponseCode:2 };
                res.send(Data);
                }
            });
              function TimeCheck(callback){
              getCurrentTime(function(response){
                  callback(null,response);
                });
              }
              function DateCheck(arg0,callback2){
            
                let Time = arg0;
                getCurrentDate(function(response){
                    let Date = response;
                    RequestedTIME = Time;
                    RequestedDATE = Date;
                  
                    callback2(null,response);
                });
              }
          }else{
            let Data = {  IsInvalidUserName:true,IsUserNameNotFound:true,IsInvalidBankInformation:true,IsInvalidAmount:false, ResponseCode:3 };
            res.send(Data);
          }
        });
    }else{
      let Data = { IsInvalidUserName:false,IsUserNameNotFound:false,IsInvalidBankInformation:true,IsInvalidAmount:true, ResponseCode:4 };
      res.send(Data);
    }
  }else{
    let Data = {  IsInvalidUserName:true,IsUserNameNotFound:true,IsInvalidBankInformation:true,IsInvalidAmount:false, ResponseCode:5 };
    res.send(Data);
   }
 });
 */
// listen (start app with node server.js) ======================================
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = routes;
module.exports = app;