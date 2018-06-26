// server.js

// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var fs = require('fs')
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var mongoose = require('mongoose'); // mongoose for mongodb
var Schema = mongoose.Schema;
var database = require('./config/database'); //load the database config
var request = require('request');
var isNullOrEmpty = require('is-null-or-empty');
const mysql = require('mysql2');
var Sequelize = require('sequelize');
var beautify = require("json-beautify");
require("./routes/test")(app);
var Models = require("./Models/Models");
// configuration =================
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('combined')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


// connect to MongoDB database
mongoose.connect(database.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//to enable CORS required for json request get put post and http cross
//https must be enabled
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const  sequelize = new Sequelize('sampledb', 'user', 'user', {
  host:'172.30.166.206',
  port: 3306,
  dialect: 'mysql'
});





//--API START
app.get('/Api/', function (req, res) {
  res.send('pick version');
});
//API version END
//--API START
app.get('/Api/v1', function (req, res) {
  res.send('Api v1 version');
});
//--API version START

//---SupportTicket ROUTING START
app.get('/Api/v1/SupportTicket/Add/:UserAccountID/:Title/:Description/:Reason/:Time/:Date/:Status', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let Reason = req.params.Reason;
  let Time = req.params.Time;
  let Date = req.params.Date;
  let Status = req.params.Status;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(Title)&&!isNullOrEmpty(Description)&&!isNullOrEmpty(Reason)&&!isNullOrEmpty(Time)&&!isNullOrEmpty(Status)){

  }
});
app.get('/Api/v1/SupportTicket/Update/:UserAccountID/:Title/:Description/:Reason/:Time/:Date/:Status', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let Reason = req.params.Reason;
  let Time = req.params.Time;
  let Date = req.params.Date;
  let Status = req.params.Status;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(Title)&&!isNullOrEmpty(Description)&&!isNullOrEmpty(Reason)&&!isNullOrEmpty(Time)&&!isNullOrEmpty(Status)){

  }
});
app.get('/Api/v1/SupportTicket', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }

  res.send("SupportTicket "+Offset+" "+ Limit+" "+Sort);
});
//---SupportTicket ROUTING END
//---Notification ROUTING START
app.get('/Api/v1/Notification/Add/:NotificationType/:Title/:Description/:Time/:Date', function (req, res) {
  let NotificationType = req.params.NotificationType;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let Time = req.params.Time;
  let Date = req.params.Date;
  var item1 = Models.Notification.build({
    UserAccountID:UserAccountID,
    Title:Title,
    Description:Description,
    Time:Time,
    Date:Date
  });
  Models.Notification.sync({alter : true});
  item1.save().catch(error => {
    // mhhh, wth!
    console.log("error inserting");
  });
});

app.get('/Api/v1/Notification/Update/:NotificationID/:NotificationType/:Title/:Description/:Time/:Date', function (req, res) {
  let NotificationType = req.params.NotificationType;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let Time = req.params.Time;
  let Date = req.params.Date;
  if(!isNullOrEmpty(NotificationType)&&!isNullOrEmpty(Title)&&!isNullOrEmpty(Description)&&!isNullOrEmpty(Time)&&!isNullOrEmpty(Date)){
    
  }
});

app.get('/Api/v1/Notification', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  res.send("Notification "+Offset+" "+ Limit+" "+Sort);
});
//---Notification ROUTING END
//---BlackList ROUTING START
app.get('/Api/v1/BlackList/Add/:UserAccountID/:Title/:Description/:ReportDate/:ReleaseDate/', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let ReportDate = req.params.ReportDate;
  let ReleaseDate = req.params.ReleaseDate;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(Title)&&!isNullOrEmpty(Description)&&!isNullOrEmpty(ReportDate)&&!isNullOrEmpty(ReleaseDate)){
    var item1 = Models.BlackList.build({
      UserAccountID:UserAccountID,
      Title:Title,
      Description:Description,
      ReportDate:ReportDate,
      ReleaseDate:ReleaseDate
    });
    Models.BlackList.sync({alter : true});
    item1.save().catch(error => {
      // mhhh, wth!
      console.log("error inserting");
    });
  }
});

app.get('/Api/v1/BlackList/Update/:BlackListID/:UserAccountID/:Title/:Description/:ReportDate/:ReleaseDate/', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let ReportDate = req.params.ReportDate;
  let ReleaseDate = req.params.ReleaseDate;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(Title)&&!isNullOrEmpty(Description)&&!isNullOrEmpty(ReportDate)&&!isNullOrEmpty(ReleaseDate)){

  }
});
app.get('/Api/v1/BlackList', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  res.send("BlackList "+Offset+" "+ Limit+" "+Sort);
});
//---BlackList ROUTING END
//---LoginHistory ROUTING START
app.get('/Api/v1/LoginHistory/Add/:UserAccountID/:IP/:DeviceName/:DeviceRam/:DeviceCpu/:Time/:Date', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let IP = req.params.IP;
  let DeviceName = req.params.DeviceName;
  let DeviceRam = req.params.DeviceRam;
  let DeviceCpu = req.params.DeviceCpu;
  let Time = req.params.Time;
  let Date = req.params.Date;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(IP)&&!isNullOrEmpty(DeviceName)&&!isNullOrEmpty(DeviceRam)&&!isNullOrEmpty(DeviceCpu)&&!isNullOrEmpty(Time)&&!isNullOrEmpty(Date)){
    var item1 = Models.LoginHistory.build({
      UserAccountID:UserAccountID,
      IP:IP,
      DeviceName:DeviceName,
      DeviceRam:DeviceRam,
      DeviceCpu:DeviceCpu,
      Time:Time,
      Date:Date
    });
    Models.LoginHistory.sync({alter : true});
    item1.save().catch(error => {
      // mhhh, wth!
      console.log("error inserting");
    });
  }
});
app.get('/Api/v1/LoginHistory', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  res.send("LoginHistory "+Offset+" "+ Limit+" "+Sort);
});
//---LoginHistory ROUTING END
//---BankInformation ROUTING START
app.get('/Api/v1/BankInformation/Add/:UserAccountID/:BankName/:SecurityCode/:Expiration/:Time/:Date', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let BankName = req.params.BankName;
  let SecurityCode = req.params.SecurityCode;
  let Expiration = req.params.Expiration;
  let Time = req.params.Time;
  let Date = req.params.Date;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(BankName)&&!isNullOrEmpty(SecurityCode)&&!isNullOrEmpty(Expiration)&&!isNullOrEmpty(Time)&&!isNullOrEmpty(Date)){
    var item1 = Models.BankInformation.build({
      UserAccountID:UserAccountID,
      BankName:BankName,
      SecurityCode:SecurityCode,
      Expiration:Expiration,
      Time:Time,
      Date:Date
    });
    Models.BankInformation.sync({alter : true});
    item1.save().catch(error => {
      // mhhh, wth!
      console.log("error inserting");
    });
  }
});
app.get('/Api/v1/BankInformation', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  res.send("BankInformation "+Offset+" "+ Limit+" "+Sort);
});
//---BankInformation ROUTING END
//---WithdrawHistory ROUTING START
app.get('/Api/v1/WithdrawHistory/Add/:UserAccountID/:Amount/:BankNameUsed/:SecurityCodeUsed/:Status/:RequestedDATE/:ApprovedDATE/:RejectedDATE/:ProcessingDATE/:RequestedTIME/:ApprovedTIME/:RejectedTIME/:ProcessingTIME', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Amount = req.params.Amount;
  let BankNameUsed = req.params.BankNameUsed;
  let Status = req.params.Status;
  let RequestedDATE = req.params.RequestedDATE;
  let ApprovedDATE = req.params.ApprovedDATE;
  let RejectedDATE = req.params.RejectedDATE;
  let ProcessingDATE = req.params.ProcessingDATE;
  let RequestedTIME = req.params.RequestedTIME;
  let RejectedTIME = req.params.RejectedTIME;
  let ProcessingTIME = req.params.ProcessingTIME;
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(Amount)&&
  !isNullOrEmpty(BankNameUsed)&&
  !isNullOrEmpty(Status)&&
  !isNullOrEmpty(RequestedDATE)&&
  !isNullOrEmpty(ApprovedDATE)&&
  !isNullOrEmpty(RejectedDATE)&&
  !isNullOrEmpty(ProcessingDATE)&&
  !isNullOrEmpty(RequestedTIME)&&
  !isNullOrEmpty(RejectedTIME)&&
  !isNullOrEmpty(ProcessingTIME)){
    var item1 = Models.WithdrawHistory.build({
    UserAccountID:UserAccountID,
    Amount:Amount, 
    BankNameUsed:BankNameUsed, 
    Status:Status,
    RequestedDATE:RequestedDATE,
    ApprovedDATE:ApprovedDATE,
    RejectedDATE:RejectedDATE,
    ProcessingDATE:ProcessingDATE, 
    RequestedTIME:RequestedTIME,
    RejectedTIME:RejectedTIME,
    ProcessingTIME:ProcessingTIME, 
    });
    Models.WithdrawHistory.sync({alter : true});
    item1.save().catch(error => {
      // mhhh, wth!
      console.log("error inserting");
    });
  }
});
app.get('/Api/v1/WithdrawHistory/Update/:WithdrawHistoryID/:UserAccountID/:Amount/:BankNameUsed/:SecurityCodeUsed/:Status/:RequestedDATE/:ApprovedDATE/:RejectedDATE/:ProcessingDATE/:RequestedTIME/:ApprovedTIME/:RejectedTIME/:ProcessingTIME', function (req, res) {
  let WithdrawHistoryID = req.params.WithdrawHistoryID;
  let UserAccountID = req.params.UserAccountID;
  let Amount = req.params.Amount;
  let BankNameUsed = req.params.BankNameUsed;
  let SecurityCodeUsed = req.params.SecurityCodeUsed;
  let Status = req.params.Status;
  let RequestedDATE = req.params.RequestedDATE;
  let ApprovedDATE = req.params.ApprovedDATE;
  let RejectedDATE = req.params.RejectedDATE;
  let ProcessingDATE = req.params.ProcessingDATE;
  let RequestedTIME = req.params.RequestedTIME;
  let RejectedTIME = req.params.RejectedTIME;
  let ProcessingTIME = req.params.ProcessingTIME;
});
app.get('/Api/v1/WithdrawHistory', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  res.send("WithdrawHistory "+Offset+" "+ Limit+" "+Sort);
});
//---WithdrawHistory ROUTING END
//---DepositHistory ROUTING START
app.get('/Api/v1/DepositHistory/Add/:UserAccountID/:Amount/:BankNameUsed/:SecurityCodeUsed/:Status/:RequestedDATE/:ApprovedDATE/:RejectedDATE/:ProcessingDATE/:RequestedTIME/:ApprovedTIME/:RejectedTIME/:ProcessingTIME', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Amount = req.params.Amount;
  let BankNameUsed = req.params.BankNameUsed;
  let SecurityCodeUsed = req.params.SecurityCodeUsed;
  let Status = req.params.Status;
  let RequestedDATE = req.params.RequestedDATE;
  let ApprovedDATE = req.params.ApprovedDATE;
  let RejectedDATE = req.params.RejectedDATE;
  let ProcessingDATE = req.params.ProcessingDATE;
  let RequestedTIME = req.params.RequestedTIME;
  let RejectedTIME = req.params.RejectedTIME;
  let ProcessingTIME = req.params.ProcessingTIME;
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(Amount)&&
  !isNullOrEmpty(BankNameUsed)&&
  !isNullOrEmpty(SecurityCodeUsed)&&
  !isNullOrEmpty(Status)&&
  !isNullOrEmpty(RequestedDATE)&&
  !isNullOrEmpty(ApprovedDATE)&&
  !isNullOrEmpty(RejectedDATE)&&
  !isNullOrEmpty(ProcessingDATE)&&
  !isNullOrEmpty(RequestedTIME)&&
  !isNullOrEmpty(RejectedTIME)&&
  !isNullOrEmpty(ProcessingTIME)){
    var item1 = Models.DepositHistory.build({
      UserAccountID:UserAccountID,
      Amount:Amount, 
      BankNameUsed:BankNameUsed,
      SecurityCodeUsed:SecurityCodeUsed,
      Status:Status,
      RequestedDATE:RequestedDATE,
      ApprovedDATE:ApprovedDATE,
      RejectedDATE:RejectedDATE,
      ProcessingDATE:ProcessingDATE, 
      RequestedTIME:RequestedTIME,
      RejectedTIME:RejectedTIME,
      ProcessingTIME:ProcessingTIME, 
    });
    Models.DepositHistory.sync({alter : true});
    item1.save().catch(error => {
      // mhhh, wth!
      console.log("error inserting");
    });
  }
});
app.get('/Api/v1/DepositHistory/Update/:BankHistoryID/:UserAccountID/:Amount/:BankNameUsed/:SecurityCodeUsed/:Status/:RequestedDATE/:ApprovedDATE/:RejectedDATE/:ProcessingDATE/:RequestedTIME/:ApprovedTIME/:RejectedTIME/:ProcessingTIME', function (req, res) {
  let DepositHistoryID = req.params.DepositHistoryID;
  let UserAccountID = req.params.UserAccountID;
  let Amount = req.params.Amount;
  let BankNameUsed = req.params.BankNameUsed;
  let SecurityCodeUsed = req.params.SecurityCodeUsed;
  let Status = req.params.Status;
  let RequestedDATE = req.params.RequestedDATE;
  let ApprovedDATE = req.params.ApprovedDATE;
  let RejectedDATE = req.params.RejectedDATE;
  let ProcessingDATE = req.params.ProcessingDATE;
  let RequestedTIME = req.params.RequestedTIME;
  let RejectedTIME = req.params.RejectedTIME;
  let ProcessingTIME = req.params.ProcessingTIME;
  
});

app.get('/Api/v1/DepositHistory', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  res.send("DepositHistory "+Offset+" "+ Limit+" "+Sort);
});
//---DepositHistory ROUTING END
//---GameHistory ROUTING START
app.get('/Api/v1/GameHistory/Add/:UserAccountID/:RoundID/:RoomID/:Rank/:Score/:Card/:Time/:Date/:BeforePoints/:AfterPoints/', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let RoundID = req.params.RoundID;
  let RoomID = req.params.RoomID;
  let Rank = req.params.Rank;
  let Score = req.params.Score;
  let Card = req.params.Card;
  let Time = req.params.Time;
  let Date = req.params.Date;
  let BeforePoints = req.params.BeforePoints;
  let AfterPoints = req.params.AfterPoints;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(RoundID)&&!isNullOrEmpty(RoomID)&&!isNullOrEmpty(Rank)&&!isNullOrEmpty(Score)&&!isNullOrEmpty(Card)&&!isNullOrEmpty(Time)&&!isNullOrEmpty(Date)&&!isNullOrEmpty(BeforePoints)&&!isNullOrEmpty(AfterPoints)){
    var item1 = Models.GameHistory.build({
      UserAccountID:UserAccountID,
      RoundID:RoundID,
      RoomID:RoomID,
      Rank:Rank,
      Score:Score,
      Card:Card,
      Time:Time,
      Date:Date,
      BeforePoints:BeforePoints,
      AfterPoints:AfterPoints
    });
    Models.GameHistory.sync({alter : true});
    item1.save().catch(error => {
      // mhhh, wth!
      console.log("error inserting");
    });
  }
});
app.get('/Api/v1/GameHistory', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  res.send("GameHistory "+Offset+" "+ Limit+" "+Sort);
});
//---GameHistory ROUTING END
//---UserInfo ROUTING START
app.get('/Api/v1/UserInfo/Add/:UserAccountID/:Email/:PhoneNumber/:TelephoneNumber', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Email = req.params.Email;
  let PhoneNumber = req.params.PhoneNumber;
  let TelephoneNumber = req.params.TelephoneNumber;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(Email)&&!isNullOrEmpty(PhoneNumber)&&!isNullOrEmpty(TelephoneNumber)){
    var item1 = Models.UserInfo.build({
      UserAccountID:UserAccountID,
      Email:Email,
      PhoneNumber:PhoneNumber,
      TelephoneNumber:TelephoneNumber
    });
    Models.UserInfo.sync({alter : true});
    item1.save().catch(error => {
      // mhhh, wth!
      console.log("error inserting");
    });
  }
});
app.get('/Api/v1/UserInfo/Update/:UserAccountID/:Email/:PhoneNumber/:TelephoneNumber', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Email = req.params.Email;
  let PhoneNumber = req.params.PhoneNumber;
  let TelephoneNumber = req.params.TelephoneNumber;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(Email)&&!isNullOrEmpty(PhoneNumber)&&!isNullOrEmpty(TelephoneNumber)){
    
  }
});
app.get('/Api/v1/UserInfo', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  res.send("UserInfo "+Offset+" "+ Limit+" "+Sort);
});
//---UserInfo ROUTING END
//---AccessControl ROUTING START
app.get('/Api/v1/AccessControl/Add/:AccessID/:AccessName/:AccessTags', function (req, res) {
  let AccessID = req.params.AccessID;
  let AccessName = req.params.AccessName;
  let AccessTags = req.params.AccessTags;
  if(!isNullOrEmpty(AccessID)&&!isNullOrEmpty(AccessName)&&!isNullOrEmpty(AccessTags)){
    //Setting up the config
    var item1 = Models.AccessControl.build({
      AccessID:AccessID,
      AccessName:AccessName,
      AccessTags:AccessTags
    });
    Models.AccessControl.sync({alter : true});
    item1.save().catch(error => {
      // mhhh, wth!
      console.log("error inserting");
    });
  }
});
app.get('/Api/v1/AccessControl/Update/:AccessID/:AccessName/:AccessTags', function (req, res) {
  let AccessID = req.params.AccessID;
  let AccessName = req.params.AccessName;
  let AccessTags = req.params.AccessTags;
  if(!isNullOrEmpty(AccessID)&&!isNullOrEmpty(AccessName)&&!isNullOrEmpty(AccessTags)){

  }
});
app.get('/Api/v1/AccessControl', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  res.send("AccessControl "+Offset+" "+ Limit+" "+Sort);
});
//---AccessControl ROUTING END
//---UserAccount ROUTING START
app.get('/Api/v1/UserAccount/Add/:UserAccountID/:AccessID/:UserName/:Password/:Verify/:ValidKey/:RegisteredDate/:RegisteredTime', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let AccessID = req.params.AccessID;
  let UserName = req.params.UserName;
  let Password = req.params.Password;
  let Verify = req.params.Verify;
  let ValidKey = req.params.ValidKey;
  let RegisteredDate = req.params.RegisteredDate;
  let RegisteredTime = req.params.RegisteredTime;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(AccessID)&&!isNullOrEmpty(UserName)&&!isNullOrEmpty(Password)&&!isNullOrEmpty(Verify)&&!isNullOrEmpty(ValidKey)&&!isNullOrEmpty(RegisteredDate)&&!isNullOrEmpty(RegisteredTime)){
    var item1 = Models.UserAccount.build({
      UserAccountID:UserAccountID,
      AccessID:AccessID,
      UserName:UserName,
      Password:Password,
      Verify:Verify,
      ValidKey:ValidKey,
      RegisteredDate:RegisteredDate,
      RegisteredTime:RegisteredTime
    });
    Models.UserAccount.sync({alter : true});
    item1.save().catch(error => {
      // mhhh, wth!
      console.log("error inserting");
    });
  }
});
app.get('/Api/v1/UserAccount', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  res.send("UserAccount "+Offset+" "+ Limit+" "+Sort);
});
//---UserAccount ROUTING START
//---Player ROUTING START
app.get('/Api/v1/Player/Add/:UserAccountID/:ShopID/:ScreenName/:Name/:Surname/:CurrentRoomName', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let ShopID = req.params.ShopID;
  let ScreenName = req.params.ScreenName;
  let Name = req.params.Name;
  let Surname = req.params.Surname;
  let CurrentRoomName = req.params.CurrentRoomName;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(ShopID)&&!isNullOrEmpty(ScreenName)&&!isNullOrEmpty(Name)&&!isNullOrEmpty(Surname)&&!isNullOrEmpty(CurrentRoomName)){
    //Setting up the config
    var item1 = Models.Player.build({
      UserAccountID:UserAccountID,
      ShopID:ShopID,
      ScreenName:ScreenName,
      Name:Name,
      Surname:Surname,
      CurrentRoomName:CurrentRoomName
    });
    Models.Player.sync({alter : true});
    item1.save().catch(error => {
      // mhhh, wth!
      console.log("error inserting");
    });
    
  }
});
app.get('/Api/v1/Player/Update/:UserAccountID/:ShopID/:ScreenName/:Name/:Surname/:CurrentRoomName', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let ShopID = req.params.ShopID;
  let ScreenName = req.params.ScreenName;
  let Name = req.params.Name;
  let Surname = req.params.Surname;
  let CurrentRoomName = req.params.CurrentRoomName;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(ShopID)&&!isNullOrEmpty(ScreenName)&&!isNullOrEmpty(Name)&&!isNullOrEmpty(Surname)&&!isNullOrEmpty(CurrentRoomName)){
    
  }
});
app.get('/Api1/Player', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    res.send("Player "+Offset+" "+ Limit+" "+Sort);
  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){
    res.send("Player "+Offset+" "+ Limit+" "+Sort);
  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    res.send("Player "+Offset+" "+ Limit+" "+Sort);
  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){
    res.send("Player "+Offset+" "+ Limit+" "+Sort);
  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){
    res.send("Player "+Offset+" "+ Limit+" "+Sort);
  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){
    res.send("Player "+Offset+" "+ Limit+" "+Sort);
  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    res.send("Player "+Offset+" "+ Limit+" "+Sort);
  }
 
});
//---Player ROUTING START
//---Shop ROUTING START
app.get('/Api/v1/Shop/Add/:UserAccountID/:DistributorID/:Description/', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let DistributorID = req.params.DistributorID;
  let Description = req.params.Description;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(DistributorID)&&!isNullOrEmpty(Description)){
    var item1 = Models.Shop.build({
      UserAccountID:UserAccountID,
      DistributorID:DistributorID,
      Description:Description
    });
    Models.Shop.sync({alter : true});
    item1.save().catch(error => {
      // mhhh, wth!
      console.log("error inserting");
    });
  }
});

app.get('/Api/v1/Shop/Update/:ShopID/:UserAccountID/:DistributorID/:Description/', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let DistributorID = req.params.DistributorID;
  let Description = req.params.Description;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(DistributorID)&&!isNullOrEmpty(Description)){

  }
});

app.get('/Api/v1/Shop', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  res.send("Shop "+Offset+" "+ Limit+" "+Sort);
});
//---Shop ROUTING END
//---Distributor ROUTING START
app.get('/Api/v1/Distributor/Add/:UserAccountID/:HeadOfficeID/:Name/', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let HeadOfficeID = req.params.HeadOfficeID;
  let Name = req.params.Name;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(HeadOfficeID)&&!isNullOrEmpty(Name)){
    var item1 = Models.Distributor.build({
      UserAccountID:UserAccountID,
      HeadOfficeID:HeadOfficeID,
      Name:Name
    });
    Models.Distributor.sync({alter : true});
    item1.save().catch(error => {
      // mhhh, wth!
      console.log("error inserting");
    });
  }
});
app.get('/Api/v1/Distributor/Update/:DistributerID/:UserAccountID/:HeadOfficeID/:Name/', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let HeadOfficeID = req.params.HeadOfficeID;
  let Name = req.params.Name;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(HeadOfficeID)&&!isNullOrEmpty(Name)){

  }
});
app.get('/Api/v1/Distributor', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  res.send("Distributor "+Offset+" "+ Limit+" "+Sort);
});
//---Distributor ROUTING END
//---HeadOffice ROUTING START
app.get('/Api/v1/HeadOffice/Add/:UserAccountID/:Name/:Description/', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Name = req.params.Name;
  let Description = req.params.Description;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(HeadOfficeID)&&!isNullOrEmpty(Description)){
    var item1 = Models.HeadOffice.build({
      UserAccountID:UserAccountID,
      Name:Name,
      Description:Description
    });
    Models.HeadOffice.sync({alter : true});
    item1.save().catch(error => {
      // mhhh, wth!
      console.log("error inserting");
    });
  }
});
app.get('/Api/v1/HeadOffice/Update/:HeadOfficeID/:UserAccountID/:Name/:Description/', function (req, res) {
  let HeadOfficeID = req.params.HeadOfficeID;
  let UserAccountID = req.params.UserAccountID;
  let Description = req.params.Description;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(HeadOfficeID)&&!isNullOrEmpty(Description)){

  }
});
app.get('/Api/v1/HeadOffice', function (req, res) {
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){

  }
  if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

  }

  res.send("HeadOffice "+Offset+" "+ Limit+" "+Sort);
});
//---HeadOffice ROUTING END


app.get('/testseq', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
 
//Setting up the config
var item1 = Models.Item.build({
  name:'Laptop',
  description: 'Acer 2340TL',
  qty: 23
});
Models.Item.sync({alter : true});
item1.save().catch(error => {
  // mhhh, wth!
  console.log("error inserting");
});


var result = Models.Item.findAll({
  where: {
    name: 'Laptop'
  }
}).then(function(result) {
  var Data = result.map(function(item) {
      return item;
  });
  
  res.send(beautify(Data, null, 2, 100));
});
});
// simple query

app.get('/testsql/:ip/', function (req, res) {
    var mysqlHost =req.params.ip;
    

  // create the connection to database
  //get the ip from services tab in openshift cluster ip
  const connection = mysql.createConnection({
    host     : '172.30.166.206',
    user     : 'user',
    password : 'user',
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
    database : 'sampledb'
  });
  connection.query(
    'SELECT 1',
    function(err, results, fields) {
      console.log(err);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
      res.send(results);
    }
  );
})

 
// with placeholder
/*connection.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function(err, results) {
    console.log(results);
  }
);*/











//connect to Mysql database
/*
var mysqlClient = mysql.createConnection(mysqlString);

mysqlClient.query('SELECT 1 as id, 103 as value UNION SELECT 2 as id, 556 as value', function(err, rows, fields) {
  if(err) console.log(err);
  console.log('The solution is: ', rows);
  mysqlClient.end();
});*/

/*
mysqlClient.connect(function(err){
  if (err) console.log( "SOME ERROR :" +err);
});*/






app.get('/jsontest/', function (req, res) {
  
  res.send(JSON.stringify([{"userId": 1,"id": 1,"title": "delectus aut autem","completed": false},{"userId": 12,"id": 12,"title": "delectus aut autem2","completed": false}], null, 3));
})


/*
var db = Mongoose.connect(database.url, function(error){
    if(error) console.log(error);

        console.log("connection successful");
});*/

//parameter test
app.get('/users/:userId/', function (req, res) {
 
  res.send(req.params)
})
//testing db connection test for mongoose
app.get('/connectiontest/', function (req, res) {
 //mongoose.connection.readyState == 0; // not connected
//mongoose.connection.readyState == 1; // connected
  res.send("mongoose.connection.readyState : "+mongoose.connection.readyState)
})


app.get('/notification/', function (req, res) {
    var NotificationData =
    {
  "Notification": [
    {
      "Titles": "Event Coming",
      "Date": "10/10/2018",
      "Time": "12:00AM",
      "Description": "Some Event going"
    }
  ]
}
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(NotificationData, null, 3));
})

app.get('/register',function (req, res) {
  
  let UserName= req.query.UserName;
  let Password = req.query.Password;
  let Name = req.query.Name;
  let Surname = req.query.Surname;
  let Email= req.query.Email;
  if(!isNullOrEmpty(UserName)){
    if(!isNullOrEmpty(Password)){
      if(!isNullOrEmpty(Name)){
        if(!isNullOrEmpty(Surname)){
          if(!isNullOrEmpty(Email)){
            res.send("Valid");
          }else{
            res.send("Invalid");
          }
        }else{
          res.send("Invalid");
        }
      }else{
        res.send("Invalid");
      }
    }else{
      res.send("Invalid");
    }
  }else{
    res.send("Invalid");
  }
});

app.get('/login',function (req, res) {
  
  let UserName= req.query.UserName;
  let Password = req.query.Password;
  if(!isNullOrEmpty(UserName)){
    if(!isNullOrEmpty(Password)){
      res.send("Valid");
    }else{
      res.send("Invalid");
    }
  }else{
    res.send("Invalid");
  }
});

app.get('/deposit',function (req, res) {
  
  let DepositName= req.query.DepositName;
  let DepositAmount =req.query.DepositAmount;

  if(!isNullOrEmpty(DepositName)){
    if(!isNullOrEmpty(DepositAmount)){
      res.send("Valid");
    }else{
      res.send("Invalid");
    }
  }else{
    res.send("Invalid");
  }
});

app.get('/withdraw',function (req, res) {
  let Amount = req.query.Amount;
  let Bank = req.query.Bank;
  let AccountNumber = req.query.AccountNumber;
  let Name =req.query.Name ;
  let ContactNumber= req.query.ContactNumber;
  let WithdrawPassword = req.query.WithdrawPassword;

  if(!isNullOrEmpty(Amount)){
    if(!isNullOrEmpty(Bank)){
      if(!isNullOrEmpty(AccountNumber)){
        if(!isNullOrEmpty(Name)){
          if(!isNullOrEmpty(ContactNumber)){
            if(!isNullOrEmpty(WithdrawPassword)){
              res.send("Valid");
            }else{
              res.send("Invalid")
            }
          }else{
            res.send("Invalid");
          }
        }else{
          res.send("Invalid");
        }
      }else{
        res.send("Invalid");
      }
    }else{
      res.send("Invalid");
    }
  }else{
    res.send("Invalid");
  }

});

// listen (start app with node server.js) ======================================
app.listen(port, ip);
  console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
