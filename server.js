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

var sequelize = new Sequelize('sampledb', 'user', 'user', {
  host:'172.30.166.206',
  port: 3306,
  dialect: 'mysql'
});
//we have Dedicated Headoffice,distributer,shop tables because if we used account type we would have a many to many relationship issue and alot of inner joins queries
var HeadOffice =sequelize.define('sampledb', {
  HeadOfficeID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  UserAccountID:Sequelize.STRING,//my account
  Name:Sequelize.STRING,
  Description:Sequelize.STRING,
});



var Distributor =sequelize.define('sampledb', {
  DistributorID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//my account
  HeadOfficeID:Sequelize.STRING,//FK Multiple DistributerID is referenced to A HeadOfficeID
  Name:Sequelize.STRING,
});



var Shop =sequelize.define('sampledb', {
  ShopsID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//my account
  DistributorID:Sequelize.STRING,//FK Multiple ShopsID is referenced to A DistributorID
  Name:Sequelize.STRING,
	Description:Sequelize.STRING,
});




var Player =sequelize.define('sampledb', {
  PlayersID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//my account
  ShopsID:Sequelize.STRING,//FK Multiple PlayersID is referenced to A ShopsID
  ScreenName:Sequelize.STRING,
	Name:Sequelize.STRING,
	Surname:Sequelize.STRING,
	CurrentRoomName:Sequelize.STRING,
});



var UserAccount =sequelize.define('sampledb', {//the main schema
  UserID: {//PK
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//primary key to connect keys
  AccessID: Sequelize.STRING,//FK 1 account can have many access control
  UserName:  {
    type :Sequelize.STRING,
    allowNull: false,
    unique: true
  },
	Password:{
    type :Sequelize.STRING,
    allowNull: false,
  },
  Verify:  Sequelize.BOOLEAN,
  ValidKey: Sequelize.STRING,
  RegisteredDate:Sequelize.DATE,
	RegisteredTime: Sequelize.TIME,
});


var AccessControl =sequelize.define('sampledb', {//A flexible way of access control Account Privileges 
  AccessControlID: {//PK
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  AccessID: {
    type :Sequelize.STRING,
    allowNull: false,
    unique: true
  },//UK Fully Unique
  AccessName: Sequelize.STRING,
  AccessTags: Sequelize.STRING,// comma delimited tags for access
});



var UserInfo =sequelize.define('sampledb', {
  UserInfoID: {//PK
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//FK A user account can have multiple Information Type
  Email: {
    type :Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  PhoneNumber: Sequelize.STRING,
  TelephoneNumber: Sequelize.STRING
});



var GameHistory =sequelize.define('sampledb', {
  GameHistoryID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//FK Many UserAccount can have many GameHistoryID
  RoundID: Sequelize.STRING,// assigned by the room
	RoomID: Sequelize.STRING,// assigned by the room
	Rank: Sequelize.STRING,
	Score: Sequelize.INTEGER,
	Card: Sequelize.STRING,//card sequence
  Time: Sequelize.TIME,
  Date:Sequelize.DATE,
	BeforePoints:  Sequelize.INTEGER,
  AfterPoints: Sequelize.INTEGER
});



/*broken
var DepositHistory =sequelize.define('sampledb', {
  DepositHistoryID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserAccountID:Sequelize.STRING,//FK One Deposit UserAccountID can have many DepositHistory
  Amount:Sequelize.NUMBER,
  BankNameUsed:  Sequelize.STRING,
  SecurityCodeUsed: Sequelize.STRING,
  Status:Sequelize.STRING,//Current Status
  RequestedDATE: Sequelize.DATE,
  ApprovedDATE: Sequelize.DATE,
  ProcessingDATE: Sequelize.DATE,
  RequestedTIME: Sequelize.TIME,
  ApprovedTIME: Sequelize.TIME,
  RejectedTIME: Sequelize.TIME,
  ProcessingTIME: Sequelize.TIME,
});


var WithdrawHistory =sequelize.define('sampledb', {
  WithdrawHistoryID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  UserAccountID:Sequelize.STRING,//FK One WithdrawHistoryID Many UserAccountID
  Amount:Sequelize.NUMBER,
  BankNameUsed:  Sequelize.STRING,
  SecurityCodeUsed: Sequelize.STRING,
  Status:Sequelize.STRING,
  RequestedDATE: Sequelize.DATE,
  ApprovedDATE: Sequelize.DATE,
  RejectedDATE: Sequelize.DATE,
  ProcessingDATE: Sequelize.DATE,
  RequestedTIME: Sequelize.TIME,
  ApprovedTIME: Sequelize.TIME,
  RejectedTIME: Sequelize.TIME,
  ProcessingTIME: Sequelize.TIME,
});
*/
var BankInformation =sequelize.define('sampledb', {
  BankInformationID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//FK One BankInformationID Many UserAccountID
  BankName:  Sequelize.STRING,
  SecurityCode: Sequelize.STRING,
  Valid: Sequelize.STRING,
  Expiration: Sequelize.STRING,
  Time: Sequelize.TIME,//Time Added
  Date:Sequelize.DATE,//Date Added
});



var  LoginHistory =sequelize.define('sampledb', {
  LoginHistoryID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//FK
  IP:  Sequelize.STRING,
  DeviceName:Sequelize.STRING,
  DeviceRam:Sequelize.STRING,
  DeviceCpu:Sequelize.STRING,
  Time: Sequelize.TIME,
  Date:Sequelize.DATE
});

var BlackList =sequelize.define('sampledb', {
  BlackListID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//FK
  Title:  Sequelize.STRING,
  Description:  Sequelize.STRING,
  ReportDate:  Sequelize.DATE,
  ReleaseDate: Sequelize.DATE
});

var SupportTicket =sequelize.define('sampledb', {
  SupportTicketID: {//PK Can be used to Connect to A user Chat Room Name 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserAccountID:Sequelize.STRING,//FK
  Title: Sequelize.STRING,
  Description: Sequelize.STRING,
  Reason:Sequelize.STRING,
  Time: Sequelize.TIME,
  Date:Sequelize.DATE,
  Status: Sequelize.STRING
});

var Notification =sequelize.define('sampledb', {
  NotificationID: {//PK
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  NotificationType:  Sequelize.STRING,
  Title: Sequelize.STRING,
  Description:  Sequelize.STRING,
  Time: Sequelize.TIME,
  Date:Sequelize.DATE
});


 //model
 var Item = sequelize.define('Item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  name:Sequelize.STRING,
  description: Sequelize.STRING,
  qty: Sequelize.INTEGER
});
/*
//---SupportTicket ROUTING START
app.get('/Api/v1/SupportTicket/Add/:UserAccountID/:Title/:Description/:Reason/:Time/:Date/:Status', function (req, res) {

});
app.get('/Api/v1/SupportTicket/Update/:UserAccountID/:Title/:Description/:Reason/:Time/:Date/:Status', function (req, res) {

});
app.get('/Api/v1/SupportTicket?Offset?Limit?Sort/', function (req, res) {
  res.send("Un Implemented");
});



//---SupportTicket ROUTING END
//---Notification ROUTING START
app.get('/Api/v1/Notification/Add/:NotificationType/:Title/:Description/:Time/:Date', function (req, res) {

});

app.get('/Api/v1/Notification/Update/:NotificationID/:NotificationType/:Title/:Description/:Time/:Date', function (req, res) {

});

app.get('/Api/v1/Notification?Offset?Limit?Sort/', function (req, res) {

});
//---Notification ROUTING END
//---BlackList ROUTING START
app.get('/Api/v1/BlackList/Add/:UserAccountID/:Title/:Description/:ReportDate/:ReleaseDate/', function (req, res) {

});

app.get('/Api/v1/BlackList/Update/:BlackListID/:UserAccountID/:Title/:Description/:ReportDate/:ReleaseDate/', function (req, res) {

});

app.get('/Api/v1/BlackList?Offset?Limit?Sort/', function (req, res) {

});
//---BlackList ROUTING END
//---LoginHistory ROUTING START
app.get('/Api/v1/LoginHistory/Add/:UserAccountID/:IP/:DeviceName/:DeviceRam/:DeviceCpu/:Time/:Date', function (req, res) {

});
app.get('/Api/v1/LoginHistory?Offset?Limit?Sort/', function (req, res) {

});
//---LoginHistory ROUTING END
//---BankInformation ROUTING START
app.get('/Api/v1/BankInformation/Add/:UserAccountID/:BankName/:SecurityCode/:Expiration/:Time/:Date', function (req, res) {

});
app.get('/Api/v1/BankInformation?Offset?Limit?Sort/', function (req, res) {

});
//---BankInformation ROUTING END
//---WithdrawHistory ROUTING START
app.get('/Api/v1/WithdrawHistory/Add/:UserAccountID/:Amount/:BankNameUsed/:SecurityCodeUsed/:Status/:RequestedDATE/:ApprovedDATE/:RejectedDATE/:ProcessingDATE/:RequestedTIME/:ApprovedTIME/:RejectedTIME/:ProcessingTIME', function (req, res) {

});
app.get('/Api/v1/WithdrawHistory/Update/:WithdrawHistoryID/:UserAccountID/:Amount/:BankNameUsed/:SecurityCodeUsed/:Status/:RequestedDATE/:ApprovedDATE/:RejectedDATE/:ProcessingDATE/:RequestedTIME/:ApprovedTIME/:RejectedTIME/:ProcessingTIME', function (req, res) {

});
app.get('/Api/v1/WithdrawHistory?Offset?Limit?Sort/', function (req, res) {

});
//---WithdrawHistory ROUTING END
//---DepositHistory ROUTING START
app.get('/Api/v1/DepositHistory/Add/:UserAccountID/:Amount/:BankNameUsed/:SecurityCodeUsed/:Status/:RequestedDATE/:ApprovedDATE/:RejectedDATE/:ProcessingDATE/:RequestedTIME/:ApprovedTIME/:RejectedTIME/:ProcessingTIME', function (req, res) {

});
app.get('/Api/v1/DepositHistory/Update/:BankHistoryID/:UserAccountID/:Amount/:BankNameUsed/:SecurityCodeUsed/:Status/:RequestedDATE/:ApprovedDATE/:RejectedDATE/:ProcessingDATE/:RequestedTIME/:ApprovedTIME/:RejectedTIME/:ProcessingTIME', function (req, res) {

});

app.get('/Api/v1/DepositHistory?Offset?Limit?Sort/', function (req, res) {

});
//---DepositHistory ROUTING END
//---GameHistory ROUTING START
app.get('/Api/v1/GameHistory/Add/:UserAccountID/:RoundID/:RoomID/:Rank/:Score/:Card/:Time/:Date/:BeforePoints/:AfterPoints/', function (req, res) {

});
app.get('/Api/v1/GameHistory?Offset?Limit?Sort/', function (req, res) {

});
//---GameHistory ROUTING END
//---UserInfo ROUTING START
app.get('/Api/v1/UserInfo/Add/:UserAccountID/:Email/:PhoneNumber/:TelephoneNumber', function (req, res) {

});
app.get('/Api/v1/UserInfo/Update/:UserAccountID/:Email/:PhoneNumber/:TelephoneNumber', function (req, res) {

});
app.get('/Api/v1/UserInfo?Offset?Limit?Sort/', function (req, res) {

});
//---UserInfo ROUTING END
//---AccessControl ROUTING START
app.get('/Api/v1/AccessControl/Add/:AccessID/:AccessName/:AccessTags', function (req, res) {

});
app.get('/Api/v1/AccessControl/Update/:AccessID/:AccessName/:AccessTags', function (req, res) {

});
app.get('/Api/v1/AccessControl?Offset?Limit?Sort/', function (req, res) {

});
//---AccessControl ROUTING END
//---UserAccount ROUTING START
app.get('/Api/v1/UserAccount/Add/:UserAccountID/:AccessID/:UserName/:Password/:Verify/:ValidKey/:RegisteredDate/:RegisteredTime', function (req, res) {

});
app.get('/Api/v1/UserAccount?Offset?Limit?Sort/', function (req, res) {

});
//---UserAccount ROUTING START
//---Player ROUTING START
app.get('/Api/v1/Player/Add/:UserAccountID/:ShopID/:ScreenName/:Name/:Surname/:CurrentRoomName', function (req, res) {

});
app.get('/Api/v1/Player/Update/:UserAccountID/:ShopID/:ScreenName/:Name/:Surname/:CurrentRoomName', function (req, res) {

});
app.get('/Api1/Player?Offset?Limit?Sort/', function (req, res) {

});
//---Player ROUTING START
//---Shop ROUTING START
app.get('/Api/v1/Shop/Add/:UserAccountID/:DistributorID/:Description/', function (req, res) {

});

app.get('/Api/v1/Shop/Update/:ShopID/:UserAccountID/:DistributorID/:Description/', function (req, res) {

});

app.get('/Api/v1/Shop?Offset?Limit?Sort/', function (req, res) {

});
//---Shop ROUTING END
//---Distributor ROUTING START
app.get('/Api/v1/Distributor/Add/:UserAccountID/:HeadOfficeID/:Name/', function (req, res) {

});
app.get('/Api/v1/Distributor/Update/:DistributerID/:UserAccountID/:HeadOfficeID/:Name/', function (req, res) {

});
app.get('/Api/v1/Distributor?Offset?Limit?Sort/', function (req, res) {

});
//---Distributor ROUTING END
//---HeadOffice ROUTING START
app.get('/Api/v1/HeadOffice/Add/:UserAccountID/:Name/:Description/', function (req, res) {

});
app.get('/Api/v1/HeadOffice/Update/:HeadOfficeID/:UserAccountID/:Name/:Description/', function (req, res) {

});
app.get('/Api/v1/HeadOffice?Offset?Limit?Sort/', function (req, res) {

});
//---HeadOffice ROUTING END
*/

app.get('/testseq', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
 
//Setting up the config


/*

var item1 = Item.build({
  name:'Laptop',
  description: 'Acer 2340TL',
  qty: 23
});
Item.sync({alter : true});
item1.save().catch(error => {
  // mhhh, wth!
  console.log("error inserting");
});


var result = Item.findAll({
  where: {
    name: 'Laptop'
  }
}).then(function(result) {
  var Data = result.map(function(item) {
      return item;
  });
  
  res.send(beautify(Data, null, 2, 100));
});
*/

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
