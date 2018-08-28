// server.js
"use strict";
// set up ========================
var helmet = require('helmet');
var express = require('express');
const routes = require('express').Router();
var Nexmo = require('nexmo');

var session = require("express-session");
var cookieParser =require("cookie-parser");
var jwt = require('jsonwebtoken');

var Combinatorics = require('js-combinatorics');
const PokerHand = require('poker-hand-evaluator');
const sortBy = require('sort-array');


var app = express(); // create our app w/ express
app.use(helmet());



//must init passport


var async = require("async");
var fs = require('fs')
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
/*var mongoose = require('mongoose'); // mongoose for mongodb
var Schema = mongoose.Schema;*/

var database = require('./config/database'); //load the database config
var request = require('request');
var isNullOrEmpty = require('is-null-or-empty');
const mysql = require('mysql2');
var Sequelize = require('sequelize');
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator');//email,mobile phone,isIP,isPostalCode,credit card

var moment = require('moment');

const Collection = require('linqjs');
const sendmail = require('sendmail')();

require("./routes/test")(app);
var Models = require("./Models/Models");
var Controller = require("./Controller/AccessControl")(app);

// configuration =================
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('combined')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json



var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


// connect to MongoDB database
/*mongoose.connect(database.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));*/

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

const  sequelize = new Sequelize('sampledb', 'user', 'user', {
  host:'172.30.166.206',
  port: 3306,
  dialect: 'mysql'
});

app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

var auth = function(req, res, next) {
  if (req.session && req.session.UserName === "amy")
    return next();
  else
    return res.sendStatus(401);
};



//--testing for authetication API key START
app.post('/Api/v1/Content', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
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

  jwt.sign({user}, 'secretkey', { expiresIn: '2d' }, (err, token) => {
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
  if(typeof bearerHeader !== 'undefined') {
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
  } else if(req.body.UserName === "amy") {
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
  }, {debug:true});

app.get('/SMS/:recipient/:message', function (req, res){
  let sender= "825080825012";
  let recipient = req.params.recipient.split(",");
  let message =req.params.message;

  
  if(message.length>69){
    console.log("Message Too Long "+message);
  }else{
    for (i = 0; i < recipient.length; i++) { 
      console.log(recipient[i]);
  
     nexmo.message.sendSms(sender, recipient[i], message,{type:'unicode'},
      (err,responseData)=>{
        if(err){
          console.log(err);
      }else{
        console.dir(responseData);
      }
    });
    }
  }
  //res.send("Sent all to " +recipient);
  //console.log(req.params.recipient);
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
function SendMail(To,From,Subject,html){
  sendmail({
    from: 'no-reply@holdem1route-holdem1.4b63.pro-ap-southeast-2.openshiftapps.com',
    to: 'cariaga.info@gmail.com',
    subject: Subject,
    html: html,
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});
}


//--Validation Start

/**
 *
 *
 * @param {*} Email
 * @param {*} callback
 */
function UserInfoEmailExist(Email,callback){
  Models.UserInfo.sync();
    let result = Models.UserInfo.findAll({ 
      where: {
        Email: Email//not null
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      console.log("Error "+result);
      callback(undefined);
    });
}

/**
 *
 *
 * @param {*} PhoneNumber
 * @param {*} callback
 */
function isPhoneNumberExist(PhoneNumber,callback){
  Models.UserInfo.sync();
    let result = Models.UserInfo.findAll({ 
      where: {
        PhoneNumber: PhoneNumber//not null

     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     

     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      console.log("Error "+result);
      callback(undefined);
    });
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
function isUserAccountBlocked(UserAccountID,callback){
  Models.BlackList.sync();
    let result = Models.BlackList.findAll({ 
      where: {
        UserAccountID: UserAccountID,//not null
        Status:"Blocked",
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      console.log(result);
      callback(undefined);
      //callback("Error "+result);
    });
}


/**
 *
 *
 * @param {*} UserName
 * @param {*} callback
 */
function isUserNameExist(UserName,callback){
  Models.UserAccount.sync();
    let result = Models.UserAccount.findAll({ 
      where: {
        UserName: UserName//not null
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
     // console.log(result);
      callback(undefined);
    });
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
function isUserAccountIDExist(UserAccountID,callback){
  Models.UserAccount.sync();
    let result = Models.UserAccount.findAll({ 
      where: {
        UserAccountID: UserAccountID//not null
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
     // console.log(result);
      callback(undefined);
    });
}

/**
 *
 *
 * @param {*} UserName
 * @param {*} callback
 */
function isUserAccountVerifiedUserName(UserName,callback){
  Models.UserAccount.sync();
    let result = Models.UserAccount.findAll({ 
      where: {
        UserName:UserName,
        Verify: true
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        console.log("isUserAccountVerified test");
        callback(Data);

      }else{
        callback(undefined);
      }
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      console.log(result);
      callback(undefined);
    });
}
// Not Done
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
function isUserAccountVerifiedUserAccountID(UserAccountID,callback){
  Models.UserAccount.sync();
}


/**
 *
 *
 * @param {*} HeadOfficeID
 * @param {*} callback
 */
function isHeadOfficeAlreadyExist(HeadOfficeID,callback){
  Models.HeadOffice.sync();
    let result = Models.HeadOffice.findAll({ 
      where: {
        HeadOfficeID:HeadOfficeID,
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      callback(result);
    });
}

/**
 *
 *
 * @param {*} DistributorID
 * @param {*} callback
 */
function isDistributorAlreadyExist(DistributorID,callback){
  Models.Distributor.sync();
    let result = Models.Distributor.findAll({ 
      where: {
        DistributorID:DistributorID,
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      console.log(result);
      callback(undefined);
    });
}


/**
 *
 *
 * @param {*} ShopID
 * @param {*} callback
 */
function isShopAlreadyExist(ShopID,callback){
  Models.Shop.sync();
    let result = Models.Shop.findAll({ 
      where: {
        ShopID:ShopID,
        
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      console.log(result);
      callback(undefined);
    });
}

/**
 *
 *
 * @param {*} PlayersID
 * @param {*} callback
 */
function isPlayerAlreadyExist(PlayersID,callback){
  Models.Player.sync();
    let result = Models.Player.findAll({ 
      where: {
        PlayersID:PlayersID,
        
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      console.log(result);
      callback(undefined);
    });
}


/**
 *
 *
 * @param {*} ScreenName
 * @param {*} callback
 */
function isScreenNameExist(ScreenName,callback){
  Models.Player.sync();
    let result = Models.Player.findAll({ 
      where: {
        ScreenName:ScreenName,
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
      
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      callback(result);
    });
}

//-- Account TypeCheck Start
//isShop this part of the system is an application layer checking rather than 1 database call for all 3 checks

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
function AccountType(UserAccountID,callback){
  let Data = {IsHeadOffice:false,IsDistributor:false,IsShop:false,IsPlayer:false};
  async.series([CheckIsHeadOffice,CheckIsDistributor,CheckIsShop,CheckIsPlayer],function(error,response){
    if(response!=undefined){
      callback(Data);
    }else{
      console.log("AccountType Failed");
      callback(undefined);
    }
   
  });

  function CheckIsHeadOffice(callback1){
    isHeadOfficeUserAccountIDExist(UserAccountID,function(response){
      if(!isNullOrEmpty(response)&&response!=undefined&&response.length>0){
        Data.IsHeadOffice=true;
        callback1(null,'1');
      }else{
        Data.IsHeadOffice=false;
        callback1(null,'1');
      }
    });
  }
  function CheckIsDistributor(callback2){
    isDistributorUserAccountIDExist(UserAccountID,function(response){
      if(!isNullOrEmpty(response)&&response!=undefined&&response.length>0){
        Data.IsDistributor=true;
        callback2(null,'2');
      }else{
        Data.IsDistributor=false;
        callback2(null,'2');
      }
    });
  }
  function CheckIsShop(callback3){
    isShopUserAccountIDExist(UserAccountID,function(response){
      if(!isNullOrEmpty(response)&&response!=undefined&&response.length>0){
        Data.IsShop=true;
        callback3(null,'3');
      }else{
        Data.IsShop=false;
        callback3(null,'3');
      }
    });
  }
  function CheckIsPlayer(callback4){
    isPlayerUserAccountIDExist(UserAccountID,function(response){
      if(!isNullOrEmpty(response)&&response!=undefined&&response.length>0){
        Data.IsPlayer=true;
        callback4(null,'4');
      }else{
        Data.IsPlayer=false;
        callback4(null,'4');
      }
    });
  }
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
function isHeadOfficeUserAccountIDExist(UserAccountID,callback){
  Models.HeadOffice.sync();
    let result = Models.HeadOffice.findAll({ 
      where: {
        UserAccountID:UserAccountID,
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      callback(result);
    });
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
function isDistributorUserAccountIDExist(UserAccountID,callback){
  Models.Distributor.sync();
    let result = Models.Distributor.findAll({ 
      where: {
        UserAccountID:UserAccountID,
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      console.log(result);
      callback(undefined);
    });
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
function isShopUserAccountIDExist(UserAccountID,callback){
  Models.Shop.sync();
    let result = Models.Shop.findAll({ 
      where: {
        UserAccountID:UserAccountID,
        
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      console.log(result);
      callback(undefined);
    });
}

function isPlayerUserAccountIDExist(UserAccountID,callback){
  Models.Player.sync();
    let result = Models.Player.findAll({ 
      where: {
        UserAccountID:UserAccountID,
        
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     
     // res.send(beautify(response, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      console.log(result);
      callback(undefined);
    });
}


//--Account Type Check End

app.get('/Api/v1/RawQuery/:RawQuery', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let RawQuery = req.params.RawQuery;

  const connection = mysql.createConnection({
    host     : '172.30.166.206',
    user     : 'user',
    password : 'user',
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
    database : 'sampledb'
  });
  connection.connect();
  // simple query
  connection.query(RawQuery,
    function(err, results, fields) {
      console.log(err);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
      res.send(beautify(results, null, 2, 100));
    });
    connection.end();
});


//--Account Child From Parent START
app.get('/Api/v1/Distributor/HeadOfficeID/:HeadOfficeID/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let HeadOfficeID = req.params.HeadOfficeID;
  if(!isNullOrEmpty(HeadOfficeID)){
    ChildDistributorsFromHeadOfficeID(HeadOfficeID,function(response){
      if(response!=undefined){
        res.send(beautify(response, null, 2, 100));
      }else{
        res.send([]);
      }
    });
  }else{
    res.send({HeadOfficeIDMissing:true});
  }
});
function ChildDistributorsFromHeadOfficeID(HeadOfficeID,callback){ // returns Distributor
  Models.Distributor.sync();
  let result = Models.Distributor.findAll({ 
    where: {
      HeadOfficeID:HeadOfficeID,
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
   
   // res.send(beautify(Data, null, 2, 100));
  }).catch(function(result) {//catching any then errors
    console.log(result);
    callback(undefined);
  });
}
/*
app.get('/Api/v1/Shop/DistributorID/:DistributorID/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let DistributorID = req.params.DistributorID;
  if(!isNullOrEmpty(DistributorID)){
    ChildShopsFromDistributorID(DistributorID,function(response){
      if(response!=undefined){
        res.send(beautify(response, null, 2, 100));
      }else{
        res.send([]);
      }
    });
  }else{
    res.send({DistributorIDMissing:true});
  }
});*/
function ChildShopsFromDistributorID(DistributorID,callback){//returns shops
  Models.Shop.sync();
  let result = Models.Shop.findAll({ 
    where: {
      DistributorID:DistributorID,
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
   
   // res.send(beautify(Data, null, 2, 100));
  }).catch(function(result) {//catching any then errors
    console.log(result);
    callback(undefined);
  });
}
/*
app.get('/Api/v1/Player/ShopID/:ShopID/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let ShopID = req.params.ShopID;
  if(!isNullOrEmpty(ShopID)){
    ChildPlayersFromShopID(ShopID,function(response){
      if(response!=undefined){
        res.send(beautify(response, null, 2, 100));
      }else{
        res.send([]);
      }
    });
  }else{
    res.send({ShopIDMissing:true});
  }
});*/
function ChildPlayersFromShopID(ShopID,callback){//returns players
  Models.Player.sync();
  let result = Models.Player.findAll({ 
    where: {
      ShopID:ShopID,
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
   // res.send(beautify(Data, null, 2, 100));
  }).catch(function(result) {//catching any then errors
    console.log(result);
    callback(undefined);
  });
}
//--Account Child From Parent End

//** Returns Current Date String*/

/**
 *
 *
 * @param {*} callback
 */
function getCurrentDate(callback){
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth(); 
  let yyyy = today.getFullYear();
  let FormatedDate = yyyy+'/'+mm+'/'+dd;
  callback(FormatedDate);
}
//** Returns Current Time String*/

/**
 *
 *
 * @param {*} callback
 */
function getCurrentTime(callback){
  let today = new Date();
  let Hours = today.getHours();
  let Minutes = today.getMinutes();
  let Seconds = today.getSeconds();
  let FormatedTime =Hours+":"+Minutes+":"+Seconds;
  callback(FormatedTime);
}


//--Validation End

//--Login Start

app.get('/registerheadoffice',function(req,res){
  res.setHeader('Content-Type', 'application/json');
  let UserName= req.query.UserName;
  let Password = req.query.Password;
  let Name = req.query.Name;
  let Surname = req.query.Surname;
  let Email= req.query.Email;
  let PhoneNumber= "";//this was never used
  let TelephoneNumber = "";//this was never used
  let Description = req.query.Description;
  if(!isNullOrEmpty(UserName)){
    if(!isNullOrEmpty(Password)){
      if(!isNullOrEmpty(Name)){
        if(!isNullOrEmpty(Surname)){
          if(!isNullOrEmpty(Email)){
              let isAccountAlreadyExist=false;
              let isEmailAlreadyExist=false;
              let UserAccountID=false;
              async.series([myFirstFunction,mySecondFunction],function(error,result){
                let CurrentTime = undefined;
                let CurrentDate = undefined;
                getCurrentTime(function(response){
                  CurrentTime=response;
                });
                getCurrentDate(function(response){
                  CurrentDate=response;
                });
                var schema = new passwordValidator();
                schema
                .is().min(8)
                .has().uppercase()                              // Must have uppercase letters
                .has().lowercase()                              // Must have lowercase letters
                .has().digits()                                 // Must have digits
                .has().not().spaces()                           // Should not have spaces
                let IsInvalidPassword= !schema.validate(Password);
                let IsInvalidEmail = !validator.isEmail(Email);
                let AddAccountErrorMessage="";
                let AddUserInfoErrorMessage="";
               let AddDistributorErrorMessage="";
                if(IsInvalidEmail==false){
                  if(IsInvalidPassword==false){
                    let UUIDUserAccountID =uuidv4();
                    let UUIDKey =uuidv4();
                    async.series([InsertUserAccount,InsertUserInfo,InsertHeadOffice],function(error,result2){
                      if(AddAccountErrorMessage==""){
                        if(AddUserInfoErrorMessage==""){
                          if(AddDistributorErrorMessage==""){
                            let To = Email;
                            let From = '';
                            let Title = 'Email Verification';
                            let VerificationURL= 'http://nodejs-mongo-persistent-holdem1.4b63.pro-ap-southeast-2.openshiftapps.com/Verify?UserName='+UserName+'&VerifyKey='+UUIDKey;
                            SendMail(To,From,Title,VerificationURL);
                            res.send({Done:"Done"});
                          }else{
                            res.send({Failed:"headoffice Insert"});
                          }
                        }else{
                          res.send({Failed:"UserInfo Insert"});
                        }
                      }else{
                        res.send({Failed:"UserAccount Insert"});
                      }
                    });
                    function InsertUserAccount(callback1){

                      AddUserAccount(UUIDUserAccountID,"AccessID",UserName,Password,false,UUIDKey,CurrentDate,CurrentTime,function(response){
                        if(response=="Inserted"){
                          console.log("Insert UserAccount");
                          callback1(null,'1');
                        }else{
                          console.log("Failed UserAccount" + response);
                          AddAccountErrorMessage=response;
                          callback1(null,'1');
                        }
                      });
                    }
                    function InsertUserInfo(callback2){
                      AddUserInfo(UUIDUserAccountID,Email,PhoneNumber,TelephoneNumber,function(response){
                        if(response=="Inserted"){
                          console.log("Insert UserInfo");
                          callback2(null,'2');
                        }else{
                          console.log("Failed UserInfo" + response);
                          AddUserInfoErrorMessage=response;
                          callback2(null,'2');
                        }
                      });
                    }
                    function InsertHeadOffice(callback3){//headoffice dosn't have a parent ID like Distributor Shop and Player
                      AddHeadOffice(UUIDUserAccountID,Name,Description,function(response){
                        if(response=="Inserted"){
                          console.log("Insert headoffice");
                          callback3(null,'3');
                        }else{
                          console.log("Failed headoffice" +response);
                          AddDistributorErrorMessage=response;
                          callback3(null,'3');
                        }
                      });
                    }
                    
                  }else{
                    res.send({WeekPassword:true});
                  }
                }else{
                  res.send({EmailInvalid:true});
                }

              });
              function myFirstFunction(callback){
               isUserNameExist(UserName,function(response3){
                 let obj = response3;
                 if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0){
                     isAccountAlreadyExist=true;
                     UserAccountID=obj[0].UserAccountID;
                     callback(null,1);
                 }else{
                    callback(null,1);
                 }
               });
              }
              function mySecondFunction(callback2){
                UserInfoEmailExist(Email,function(response){
                  let obj = response;
                  if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].Email==Email){
                    isEmailAlreadyExist=true;
                    callback2(null,2);
                    
                  }else{
                    isEmailAlreadyExist=false;
                    callback2(null,2);
                  }
                });
              }
             
          }else{
            res.send({EmailMissing:true});
          }
        }else{
          res.send({SurnameMissing:true});
        }
      }else{
        res.send({NameMissing:true});
      }
    }else{
      res.send({PasswordMissing:true});
    }
  }else{
    res.send({UserNameMissing:true});
  }
});
app.get('/registerdistributor',function(req,res){
  res.setHeader('Content-Type', 'application/json');
  let UserName= req.query.UserName;
  let Password = req.query.Password;
  let Name = req.query.Name;
  let Surname = req.query.Surname;
  let Email= req.query.Email;
  let PhoneNumber= "";//this was never used
  let TelephoneNumber = "";//this was never used
  let HeadOfficeID = req.query.HeadOfficeID;
  let Description = req.query.Description;
  if(!isNullOrEmpty(UserName)){
    if(!isNullOrEmpty(Password)){
      if(!isNullOrEmpty(Name)){
        if(!isNullOrEmpty(Surname)){
          if(!isNullOrEmpty(Email)){
            if(!isNullOrEmpty(HeadOfficeID)){

              let isAccountAlreadyExist=false;
              let isEmailAlreadyExist=false;
              let UserAccountID=false;
              let isHeadOfficeExist=false;
              async.series([myFirstFunction,mySecondFunction,myThirdFunction],function(error,result){
                let CurrentTime = undefined;
                let CurrentDate = undefined;
                getCurrentTime(function(response){
                  CurrentTime=response;
                });
                getCurrentDate(function(response){
                  CurrentDate=response;
                });
                var schema = new passwordValidator();
                schema
                .is().min(8)
                .has().uppercase()                              // Must have uppercase letters
                .has().lowercase()                              // Must have lowercase letters
                .has().digits()                                 // Must have digits
                .has().not().spaces()                           // Should not have spaces
                let IsInvalidPassword= !schema.validate(Password);
                let IsInvalidEmail = !validator.isEmail(Email);
                let AddAccountErrorMessage="";
                let AddUserInfoErrorMessage="";
               let AddDistributorErrorMessage="";
               if(isHeadOfficeExist==true){
                  if(IsInvalidEmail==false){
                    if(IsInvalidPassword==false){
                      let UUIDUserAccountID =uuidv4();
                      let UUIDKey =uuidv4();
                      async.series([InsertUserAccount,InsertUserInfo,InsertDistributor],function(error,result2){
                        if(AddAccountErrorMessage==""){
                          if(AddUserInfoErrorMessage==""){
                            if(AddDistributorErrorMessage==""){
                              let To = Email;
                              let From = '';
                              let Title = 'Email Verification';
                              let VerificationURL= 'http://nodejs-mongo-persistent-holdem1.4b63.pro-ap-southeast-2.openshiftapps.com/Verify?UserName='+UserName+'&VerifyKey='+UUIDKey;
                              SendMail(To,From,Title,VerificationURL);
                              res.send({Done:"Done"});
                            }else{
                              res.send({Failed:"Distributor Insert"});
                            }
                          }else{
                            res.send({Failed:"UserInfo Insert"});
                          }
                        }else{
                          res.send({Failed:"UserAccount Insert"});
                        }
                      });
                      function InsertUserAccount(callback1){

                        AddUserAccount(UUIDUserAccountID,"AccessID",UserName,Password,false,UUIDKey,CurrentDate,CurrentTime,function(response){
                          if(response=="Inserted"){
                            console.log("Insert UserAccount");
                            callback1(null,'1');
                          }else{
                            console.log("Failed UserAccount" + response);
                            AddAccountErrorMessage=response;
                            callback1(null,'1');
                          }
                        });
                      
                      }
                      function InsertUserInfo(callback2){
                        AddUserInfo(UUIDUserAccountID,Email,PhoneNumber,TelephoneNumber,function(response){
                          if(response=="Inserted"){
                            console.log("Insert UserInfo");
                            callback2(null,'2');
                          }else{
                            console.log("Failed UserInfo" + response);
                            AddUserInfoErrorMessage=response;
                            callback2(null,'2');
                          }
                        });

                    
                      }
                      function InsertDistributor(callback3){
                        AddDistributor(UUIDUserAccountID,HeadOfficeID,Description,function(response){
                          if(response=="Inserted"){
                            console.log("Insert Distributor");
                            callback3(null,'3');
                          }else{
                            console.log("Failed Distributor" +response);
                            AddDistributorErrorMessage=response;
                            callback3(null,'3');
                          }
                        });
                    
                      }

                    }else{
                      res.send({WeekPassword:true});
                    }
                  }else{
                    res.send({EmailInvalid:true});
                  }
                }else{
                  res.send("HeadOfficeID Not Found");
                }
              });
              function myFirstFunction(callback){
               isUserNameExist(UserName,function(response3){
                 let obj = response3;
                 if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0){
                     isAccountAlreadyExist=true;
                     UserAccountID=obj[0].UserAccountID;
                     callback(null,1);
                 }else{
                    callback(null,1);
                 }
               });
      
              }
              function mySecondFunction(callback2){
                UserInfoEmailExist(Email,function(response){
                  let obj = response;
                  if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].Email==Email){
                    isEmailAlreadyExist=true;
                    callback2(null,2);
                    
                  }else{
                    isEmailAlreadyExist=false;
                    callback2(null,2);
                  }
                });
              }
              function myThirdFunction(callback3){
                console.log("Checking HeadOfficeExist 1");
                isHeadOfficeAlreadyExist(HeadOfficeID,function(response){
                  let obj = response;
                  console.log("Checking HeadOfficeExist 2");
                  console.log(obj);
                  if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].HeadOfficeID==HeadOfficeID){
                    isHeadOfficeExist=true;
                    console.log("Checking HeadOfficeExist 3"+isHeadOfficeExist);
                    callback3(null,3);
                    
                  }else{
                    isHeadOfficeExist=false;
                    console.log("Checking HeadOfficeExist 3"+isHeadOfficeExist);
                    callback3(null,3);
                  }
               
                });
              }
            }else{
              res.send({DistributorIDMissing:true});
            }
          }else{
            res.send({EmailMissing:true});
          }
        }else{
          res.send({SurnameMissing:true});
        }
      }else{
        res.send({NameMissing:true});
      }
    }else{
      res.send({PasswordMissing:true});
    }
  }else{
    res.send({UserNameMissing:true});
  }
});
app.get('/registershop',function(req,res){
  res.setHeader('Content-Type', 'application/json');
  let UserName= req.query.UserName;
  let Password = req.query.Password;
  let Name = req.query.Name;
  let Surname = req.query.Surname;
  let Email= req.query.Email;
  let PhoneNumber= "";//this was never used
  let TelephoneNumber = "";//this was never used
  let DistributorID = req.query.DistributorID;
  let Description = req.query.Description;
  if(!isNullOrEmpty(UserName)){
    if(!isNullOrEmpty(Password)){
      if(!isNullOrEmpty(Name)){
        if(!isNullOrEmpty(Surname)){
          if(!isNullOrEmpty(Email)){
            if(!isNullOrEmpty(DistributorID)){

              let isAccountAlreadyExist=false;
              let isEmailAlreadyExist=false;
              let UserAccountID=false;
              let isDistributorExist = false;

              async.series([myFirstFunction,mySecondFunction,myThirdFunction],function(error,result){
                let CurrentTime = undefined;
                let CurrentDate = undefined;
                getCurrentTime(function(response){
                  CurrentTime=response;
                });
                getCurrentDate(function(response){
                  CurrentDate=response;
                });
                var schema = new passwordValidator();
                schema
                .is().min(8)
                .has().uppercase()                              // Must have uppercase letters
                .has().lowercase()                              // Must have lowercase letters
                .has().digits()                                 // Must have digits
                .has().not().spaces()                           // Should not have spaces

                let IsInvalidPassword= !schema.validate(Password);
                let IsInvalidEmail = !validator.isEmail(Email);
                let AddAccountErrorMessage="";
                let AddUserInfoErrorMessage="";
                let AddShopErrorMessage="";
                if(isDistributorExist==true){
                    if(IsInvalidEmail==false){
                      if(IsInvalidPassword==false){
                        let UUIDUserAccountID =uuidv4();
                        let UUIDKey =uuidv4();

                        async.series([InsertUserAccount,InsertUserInfo,InsertShop],function(error,result2){
                          if(AddAccountErrorMessage==""){
                            if(AddUserInfoErrorMessage==""){
                              if(AddShopErrorMessage==""){
                                res.send({Done:"Done"});
                                let To = Email;
                                let From = '';
                                let Title = 'Email Verification';
                                let VerificationURL= 'http://nodejs-mongo-persistent-holdem1.4b63.pro-ap-southeast-2.openshiftapps.com/Verify?UserName='+UserName+'&VerifyKey='+UUIDKey;
                                SendMail(To,From,Title,VerificationURL);

                              }else{
                                res.send({Failed:"Shop Insert"});
                              }
                            }else{
                              res.send({Failed:"UserInfo Insert"});
                            }
                          }else{
                            res.send({Failed:"UserAccount Insert"});
                          }
                        });
                        function InsertUserAccount(callback1){

                          AddUserAccount(UUIDUserAccountID,"AccessID",UserName,Password,false,UUIDKey,CurrentDate,CurrentTime,function(response){
                            if(response=="Inserted"){
                              console.log("Insert UserAccount");
                              callback1(null,'1');
                            }else{
                              console.log("Failed UserAccount" + response);
                              AddAccountErrorMessage=response;
                              callback1(null,'1');
                            }
                          });
                        
                        }
                        function InsertUserInfo(callback2){
                          AddUserInfo(UUIDUserAccountID,Email,PhoneNumber,TelephoneNumber,function(response){
                            if(response=="Inserted"){
                              console.log("Insert UserInfo");
                              callback2(null,'2');
                            }else{
                              console.log("Failed UserInfo" + response);
                              AddUserInfoErrorMessage=response;
                              callback2(null,'2');
                            }
                          });

                      
                        }
                        function InsertShop(callback3){
                          AddShop(UUIDUserAccountID,DistributorID,Description,function(response){
                            if(response=="Inserted"){
                              console.log("Insert Shop");
                              callback3(null,'3');
                            }else{
                              console.log("Failed Shop" +response);
                              AddShopErrorMessage=response;
                              callback3(null,'3');
                            }
                          });
                      
                        }

                      }else{
                        res.send({WeekPassword:true});
                      }
                  }else{
                    res.send({EmailInvalid:true});
                  }
                }else{
                  res.send("DistributorID Not Found");
                }
              });
              
              function myFirstFunction(callback){
               isUserNameExist(UserName,function(response3){
                 let obj = response3;
                 if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0){
                     isAccountAlreadyExist=true;
                     UserAccountID=obj[0].UserAccountID;
                     callback(null,1);
                 }else{
                    callback(null,1);
                 }
               });
      
              }
              function mySecondFunction(callback2){
                UserInfoEmailExist(Email,function(response){
                  let obj = response;
                  if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].Email==Email){
                    isEmailAlreadyExist=true;
                    callback2(null,2);
                    
                  }else{
                    isEmailAlreadyExist=false;
                    callback2(null,2);
                  }
                });
              }
              function myThirdFunction(callback3){
                isDistributorAlreadyExist(DistributorID,function(response){
                  let obj = response;
                  console.log("Checking DistributorExist");
                  if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].DistributorID==DistributorID){
                    isDistributorExist=true;
                    console.log("Checking DistributorExist "+isDistributorExist);
                    callback3(null,3);
                    
                  }else{
                    isDistributorExist=false;
                    console.log("Checking DistributorExist "+isDistributorExist);
                    callback3(null,3);
                  }
                });
              }
            }else{
              res.send({DistributorIDMissing:true});
            }
          }else{
            res.send({EmailMissing:true});
          }
        }else{
          res.send({SurnameMissing:true});
        }
      }else{
        res.send({NameMissing:true});
      }
    }else{
      res.send({PasswordMissing:true});
    }
  }else{
    res.send({UserNameMissing:true});
  }
});
app.get('/register',function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let UserName= req.query.UserName;
  let Password = req.query.Password;
  let Name = req.query.Name;
  let Surname = req.query.Surname;
  let Email= req.query.Email;
  let PhoneNumber= req.query.PhoneNumber;
  let TelephoneNumber =  req.query.TelephoneNumber;
  let ShopID = req.query.ShopID;
  let ScreenName = req.query.ScreenName;
  if(!isNullOrEmpty(UserName)){
    if(!isNullOrEmpty(Password)){
      if(!isNullOrEmpty(Name)){
        if(!isNullOrEmpty(Surname)){
          if(!isNullOrEmpty(Email)){
            if(!isNullOrEmpty(ScreenName)){
            
            let isAccountAlreadyExist=false;
            let isEmailAlreadyExist=false;
            let isShopExist = false;
            async.series([UserNameExistCheck,EmailExistCheck,ShopExistCheck],function(error,result){
              if(isAccountAlreadyExist==false){
                if(isEmailAlreadyExist==false){
                  let CurrentTime = undefined;
                  let CurrentDate = undefined;
                  getCurrentTime(function(response){
                    CurrentTime=response;
                  });
                  getCurrentDate(function(response){
                    CurrentDate=response;
                  });
                  var schema = new passwordValidator();
                  schema
                  .is().min(8)
                  .has().uppercase()                              // Must have uppercase letters
                  .has().lowercase()                              // Must have lowercase letters
                  .has().digits()                                 // Must have digits
                  .has().not().spaces()                           // Should not have spaces

                  let IsInvalidPassword= !schema.validate(Password);
                  let IsInvalidEmail = !validator.isEmail(Email);
                  let AddAccountErrorMessage="";
                  let AddUserInfoErrorMessage="";
                  let AddPlayerErrorMessage="";
                  if(isShopExist==true){
                    if(IsInvalidEmail==false){
                      if(IsInvalidPassword==false){
                        let UUIDUserAccountID =uuidv4();
                        let UUIDKey =uuidv4();

                        async.series([InsertUserAccount,InsertUserInfo,InsertPlayer],function(error,result2){
                          if(AddAccountErrorMessage==""){
                            if(AddUserInfoErrorMessage==""){
                              if(AddPlayerErrorMessage==""){
                               
                                let To = Email;
                                let From = '';
                                let Title = 'Email Verification';
                                let VerificationURL= 'http://nodejs-mongo-persistent-holdem1.4b63.pro-ap-southeast-2.openshiftapps.com/Verify?UserName='+UserName+'&VerifyKey='+UUIDKey;
                                SendMail(To,From,Title,VerificationURL);
                                res.send({success:true});
                              }else{
                                res.send({Failed:"Player Insert"});
                              }
                            }else{
                              res.send({Failed:"UserInfo Insert"});
                            }
                          }else{
                            res.send({Failed:"UserAccount Insert"});
                          }
                        });


                        function InsertUserAccount(callback1){

                          AddUserAccount(UUIDUserAccountID,"AccessID",UserName,Password,false,UUIDKey,CurrentDate,CurrentTime,function(response){
                            if(response=="Inserted"){
                              console.log("Insert UserAccount");
                              callback1(null,'1');
                            }else{
                              console.log("Failed UserAccount" + response);
                              AddAccountErrorMessage=response;
                              callback1(null,'1');
                            }
                          });
                        
                        }
                        function InsertUserInfo(callback2){
                          AddUserInfo(UUIDUserAccountID,Email,PhoneNumber,TelephoneNumber,function(response){
                            if(response=="Inserted"){
                              console.log("Insert UserInfo");
                              callback2(null,'2');
                            }else{
                              console.log("Failed UserInfo" + response);
                              AddUserInfoErrorMessage=response;
                              callback2(null,'2');
                            }
                          });

                      
                        }
                        function InsertPlayer(callback3){
                          AddPlayer(UUIDUserAccountID,ShopID,ScreenName,Name,Surname,'',function(response){
                            if(response=="Inserted"){
                              console.log("Insert Player");
                              callback3(null,'3');
                            }else{
                              console.log("Failed Player" +response);
                              AddPlayerErrorMessage=response;
                              callback3(null,'3');
                            }
                          });
                      
                        }
                      }else{
                        res.send({WeekPassword:true});
                      }
                    }else{
                      res.send({EmailInvalid:true});
                    }
                }else{
                  res.send({ShopIDExist:false});
                  }
                }else{
                  res.send({isEmailAlreadyExist:true});
                }
                
              }else{
                res.send({isAccountAlreadyExist:true});
              }
            });
            function UserNameExistCheck(callback){
             isUserNameExist(UserName,function(response3){
               let obj = response3;
               if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0){
                   isAccountAlreadyExist=true;
                   callback(null,1);
               }else{
                  callback(null,1);
               }
             });
    
            }
            function EmailExistCheck(callback2){
              UserInfoEmailExist(Email,function(response){
                let obj = response;
                if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].Email==Email){
                  isEmailAlreadyExist=true;
                  callback2(null,2);
                  
                }else{
                  isEmailAlreadyExist=false;
                  callback2(null,2);
                }
              });
            }

            function ShopExistCheck(callback3){
              isShopAlreadyExist(ShopID,function(response){
                let obj = response;
                console.log("Checking ShopExist");
                if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].ShopID==ShopID){
                  isShopExist=true;
                  console.log("Checking ShopExist "+isShopExist);
                  callback3(null,3);
                  
                }else{
                  isShopExist=false;
                  console.log("Checking ShopExist "+isShopExist);
                  callback3(null,3);
                }
              });

            }
          }else{
            res.send({ScreenNameMissing:true});
          }
          }else{
            res.send({EmailMissing:true});
          }
          
        }else{
          res.send({SurnameMissing:true});
        }
      }else{
        res.send({NameMissing:true});
      }
    }else{
      res.send({PasswordMissing:true});
    }
  }else{
    res.send({UserNameMissing:true});
  }
});
//--Login End
//--Login Start
app.get('/Login',function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  // Usage /Login?UserName=Username21441&Password=awAF12441124&DeviceUUID=DeviceUUID&IP=IP&DeviceName=DeviceName&DeviceRam=DeviceRam&DeviceCpu=DeviceCpu&OperatingSystem=OperatingSystem&GraphicsDevice=GraphicsDevice&Time=Time&Date=Date
  let UserName= req.query.UserName;
  let Password = req.query.Password;
  let DeviceUUID = req.query.DeviceUUID;
  let IP = req.query.IP;
  let DeviceName = req.query.DeviceName;
  let DeviceRam = req.query.DeviceRam;
  let DeviceCpu = req.query.DeviceCpu;
  let OperatingSystem = req.query.OperatingSystem;
  let GraphicsDevice = req.query.GraphicsDevice;
  let Time = req.query.Time;//01:57:17
  let Date = req.query.Date;//2018-06-27
  if(!isNullOrEmpty(DeviceUUID)&&
  !isNullOrEmpty(IP)&&
  !isNullOrEmpty(DeviceName)&&
  !isNullOrEmpty(DeviceRam)&&
  !isNullOrEmpty(DeviceCpu)&&
  !isNullOrEmpty(OperatingSystem)&&
  !isNullOrEmpty(GraphicsDevice)&&
  !isNullOrEmpty(Time)&&
  !isNullOrEmpty(Date)){
    if(!isNullOrEmpty(UserName)){
      if(!isNullOrEmpty(Password)){
        let UserAccountID ="";
        let AccountStatus="";
        let AccountType =undefined;
        let AccountVerified=false;
        let Email= undefined;
        let PhoneNumber = undefined;
        let TelephoneNumber = undefined;
        let AccessType = undefined;
        let AccessID = undefined;
        async.series([
          UserNameInternalValidate,
          UserAccountInternalValidate,
          UserAccountBlockedInternalValidate,
          AccountTypeInternalValidate,
          GetUserInfoInternalValidate
        ], function (err, result) {//final function
          if(UserAccountID!=""){
            if(AccountVerified==true){
            if(AccountStatus!="Blocked"){
              console.log('done');
                // result now equals 'done'
              console.log('3');
                Models.UserAccount.sync(/*{force:true}*/);//makes sure table exist and syncs it
                  console.log('4');
                      AddLoginHistory(UserAccountID,IP,DeviceName,DeviceRam,DeviceCpu,Time,Date,function(response3){
                        console.log('5');
                        console.log(response3);
                        if(AccountType=="HeadOffice"){
                          console.log('6 HeadOffice');
                           // we need diffrent Data for diffrent AccountType
                           let Data ={Status:"Verified",
                           Controller:"/Login",
                           UserAccountID:UserAccountID,
                           Solution:"No Issue",
                           UserName:UserName,
                           AccountStatus:AccountStatus,
                           AccountType:AccountType,
                           AccountVerified:AccountVerified,
                           Name:"",
                           SurName:"",
                           Email:Email,
                           PhoneNumber:PhoneNumber,
                           TelephoneNumber:TelephoneNumber,
                           AccessID:AccessID
                           }
                           res.send(Data);
                        }

                       else if(AccountType=="Distributor"){
                          console.log('6 Distributor');
                          // we need diffrent Data for diffrent AccountType
                          let Data ={Status:"Verified",
                          Controller:"/Login",
                          UserAccountID:UserAccountID,
                          Solution:"No Issue",
                          UserName:UserName,
                          AccountStatus:AccountStatus,
                          AccountType:AccountType,
                          AccountVerified:AccountVerified,
                          Name:"",
                          SurName:"",
                          Email:Email,
                          PhoneNumber:PhoneNumber,
                          TelephoneNumber:TelephoneNumber,
                          AccessID:AccessID
                          }
                          res.send(Data);
                        }
                       else if(AccountType=="Shop"){
                          console.log('6 Shop');
                          // we need diffrent Data for diffrent AccountType
                          let Data ={Status:"Verified",
                          Controller:"/Login",
                          UserAccountID:UserAccountID,
                          Solution:"No Issue",
                          UserName:UserName,
                          AccountStatus:AccountStatus,
                          AccountType:AccountType,
                          AccountVerified:AccountVerified,
                          Name:"",
                          SurName:"",
                          Email:Email,
                          PhoneNumber:PhoneNumber,
                          TelephoneNumber:TelephoneNumber,
                          AccessID:AccessID
                          }
                          res.send(Data);
                        }
                       else if(AccountType=="Player"){
                          console.log('6 Player');
                         // we need diffrent Data for diffrent AccountType
                         let Data ={Status:"Verified",
                         Controller:"/Login",
                         UserAccountID:UserAccountID,
                         Solution:"No Issue",
                         UserName:UserName,
                         AccountStatus:AccountStatus,
                         AccountType:AccountType,
                         AccountVerified:AccountVerified,
                         Name:"",
                         
                         SurName:"",
                         Email:Email,
                         PhoneNumber:PhoneNumber,
                         TelephoneNumber:TelephoneNumber,
                         AccessID:AccessID
                         }
                         let PlayerExist=false;
                         async.series([PlayerUserAccountIDInternal],function(err,response){

                           if(PlayerExist==true){
                            res.send(Data);
                           }else{
                            res.send({PlayerUserAccountExist:false});
                           }
                          
                         });

                         function PlayerUserAccountIDInternal(callback6){
                          UserInfoUserAccountID(UserAccountID,function(response){
                            if(response!=undefined){
                             Data.ScreenName = response[0].ScreenName;
                             Data.SurName = response[0].Surname;
                             PlayerExist=true;
                             callback6(null,'1');
                            }else{
                              PlayerExist=false;
                              callback6(null,'1');
                            }
                          });
                         }

                       
                        }else{
                          res.send({UnknownAccoutType:true});
                        }
                      });

              }else{
                let Data = {AccountStatus:AccountStatus};
                res.send(Data);
              }
            }else{
              let Data = {AccountVerified:false};
              res.send(Data);
            }
            }else{
              let Data = {isUserNameExist:false};
              res.send(Data)
            }
          });
          function UserNameInternalValidate(callback){//we retrive the UserAccountID
            console.log('UserNameInternalValidate');
           isUserNameExist(UserName,function(response3){
             let obj = response3;
             if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].UserName==UserName){
                 AccessID = obj[0].AccessID;
                 UserAccountID= obj[0].UserAccountID;
                 console.log('UserNameInternalValidate '+UserAccountID)
                 callback(null,'1');
             }else{
                UserAccountID= "";
                callback(null,'1');
             }
           });
          }
          function UserAccountInternalValidate(callback2){
            console.log('UserAccountInternalValidate');
            isUserAccountVerifiedUserName(UserName,function(response3){
              let obj = response3;
              if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].UserName==UserName){
                  AccountVerified= obj[0].Verify;
                  console.log('UserAccountInternalValidate '+AccountVerified);
                callback2(null,'2');
              }else{
                AccountVerified= false;
               callback2(null,'2');
              }
            });
          }
          function UserAccountBlockedInternalValidate(callback3){
            console.log('UserAccountBlockedInternalValidate');
            if(!isNullOrEmpty(UserAccountID)&&UserAccountID!=undefined){
              isUserAccountBlocked(UserAccountID,function(response){
                let obj = response;
                if(!isNullOrEmpty(obj)&&obj!=undefined&&obj[0].UserAccountID==UserAccountID){
                  AccountStatus=obj[0].Status;
                  console.log('UserAccountBlockedInternalValidate '+AccountStatus);
                  
                  callback3(null,'3');
                }else{
                  AccountStatus="";
                  callback3(null,'3');
                }
              });
            }else{
              console.log("Login myThirdFunction Failed UserAccountID Empty");
              callback3(null,'3');
            }
          }
          function AccountTypeInternalValidate(callback4){
            console.log("AccountTypeInternalValidate");
            if(!isNullOrEmpty(UserAccountID)&&UserAccountID!=undefined){
              AccountTypeFullCheck(UserAccountID,function(response){
                if(!isNullOrEmpty(response)&&response.UnSafeDuplicate==false&&response.FoundAccount==true){
                 // res.send({AccountType:response.AccountType});
                  AccountType =response.AccountType;
                  callback4(null,'4');
                }else if(!isNullOrEmpty(response)&&response.UnSafeDuplicate==true&&response.FoundAccount==false){
                 
                  AccountType =response.AccountType;
                  console.log("AccountTypeInternalValidate Duplicate UserAccountID AccountType" +AccountType);
                  callback4(null,'4');
                }else{
                  AccountType =response.AccountType;
                  callback4(null,'4');
                }
              });
            }else{
              console.log("Login myForthFunction Failed UserAccountID Empty");
              callback4(null,'4');
            }
          }

          function GetUserInfoInternalValidate(callback5){
            console.log("GetUserInfo");
            if(!isNullOrEmpty(UserAccountID)&&UserAccountID!=undefined){
              UserInfoUserAccountID(UserAccountID,function(response){
               
                if(response!=undefined){
                   Email= response[0].Email;
                   PhoneNumber = response[0].PhoneNumber;
                   TelephoneNumber = response[0].TelephoneNumber;
                  console.log("GetUserInfo" +AccountType);
                  callback5(null,'5');
                }else{
                  callback5(null,'5');
                }
              });
            }else{
              console.log("Login GetUserInfo Failed UserAccountID");
              callback5(null,'5');
            }
          }
          //PlayerUserAccountID
    
      }else{
        res.send({PasswordInvalid:true});
      }
    }else{
      res.send({UserNameInvalid:true});
    }
  }else{
    res.send({DeviceInformationsMissing:true});
  }
});
//--Login End
//--Login Start
app.get('/Verify',function (req, res) {
  // Usage /Verify?UserName=UserName&VerifyKey=VerifyKey
  res.setHeader('Content-Type', 'application/json');
  let UserName= req.query.UserName;
  let ValidKey= req.query.VerifyKey;
  if(!isNullOrEmpty(UserName)){
    if(!isNullOrEmpty(ValidKey)){
      isUserNameExist(UserName,function(response3){
        console.log("Verify response : "+response3);
        let obj = response3;
        if(!isNullOrEmpty(obj)&&obj!=undefined){
          if(obj[0].UserName==UserName){
        
            Verify(UserName,ValidKey,function(response){
              if(response.Verified==false){
                VerifyAccount(UserName,ValidKey,function(response2){
      
                  let Data = {validUserName:true,validUserKey:true,isAlreadyRegistered :false,isUserNameExist:true,ResponseCode:1};
                  res.send(beautify(Data, null, 2, 100));
                });
              }else{
                let Data = {validUserName:true,validUserKey:true,isAlreadyRegistered :true,isUserNameExist:true,ResponseCode:2};
                  res.send(beautify(Data, null, 2, 100));
              }
            });
          }
        }
        else{
          let Data = {validUserName:true,validUserKey:true,isAlreadyRegistered :false,isUserNameExist:false,ResponseCode:3};
          res.send(beautify(Data, null, 2, 100));
        }
      });   
    }else{
      let Data = {validUserName:true,validUserKey:false,isAlreadyRegistered :false,isUserNameExist:false,ResponseCode:4};
      res.send(beautify(Data, null, 2, 100));
    }
  }else{
    let Data = {validUserName:false,validUserKey:false,isAlreadyRegistered :false,isUserNameExist:false,ResponseCode:5};
    res.send(beautify(Data, null, 2, 100));
  }
});


function UserInfoUpdateEmail(UserAccountID,Email,callback){// Verification With UserAccountID // Forcing Account To be Verified // Via UserAccountID
  Models.UserInfo.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.UserInfo.update({
    Email: Email
  },
  {
    where: {UserAccountID:UserAccountID}
  })
  .then(Success => {
    callback("Updated");
  })
  
  .catch(error => {
    console.log("Error Updating " +error);
    callback(undefined);
  }); 
}


/**
 *
 *
 * @param {*} UserName
 * @param {*} ValidKey
 * @param {*} callback
 */
function Verify(UserName,ValidKey,callback){
  async.waterfall([
          myFirstFunction,
          mySecondFunction,
       ], function (err, result) {//final function
           // result now equals 'done'
          // console.log('5');
           callback(result);
       });
        function myFirstFunction(callback2) {
          console.log('1');
          Models.UserAccount.sync(/*{force:true}*/);//makes sure table exist and syncs it
          let result = Models.UserAccount.findAll({ 
            where: {
              UserName:UserName//not null
              ,
              ValidKey:ValidKey//not null
           }
          }).then(function(result) {
            let Data = result.map(function(item) {return item;});
          //  console.log('2');
            callback2(null,Data);
          }).catch(function(result2){
            console.log("Verify Error : "+result2);
          //  console.log('2');
            callback2(null,result2);
          });
       
        }
       function mySecondFunction(arg1,callback3) {
      //  console.log(arg1);
      //  console.log('3'+arg1[0].Verify);
        if(arg1[0].Verify==true){
          let result3 = {Verified:true};
        //  console.log('4');
          callback3(null,result3);
        }else{
          let result3 = {Verified:false};
        //  console.log('4');
          callback3(null,result3);
        }   
        }
}
//Not Done
function UserAccountUpdateLoginInformation(){

}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} VerifiedStatus
 * @param {*} callback
 */
function VerifyAccountUserAccountID(UserAccountID,VerifiedStatus,callback){// Verification With UserAccountID // Forcing Account To be Verified // Via UserAccountID
  Models.UserAccount.update({
    Verify: VerifiedStatus
  },
  {
    where: {UserAccountID:UserAccountID}
  })
  .then(Success => {
    callback("Updated");
  })
  
  .catch(error => {
    console.log("Error Updating " +error);
    callback(undefined);
  }); 
}

/**
 *
 *
 * @param {*} UserName
 * @param {*} ValidKey
 * @param {*} callback
 */
function VerifyAccount(UserName,ValidKey,callback){ // Verification with ValidKey // Public only use // Via ValidKey
  Models.UserAccount.update({
    Verify: true
  },
  {
    where: {UserName:UserName,ValidKey:ValidKey}
  })
  .then(Success => {
    callback("Updated");
  })
  
  .catch(error => {
    console.log("Error Updating " +error);
    callback();
  }); 
}
//--Login End

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

app.get('/Api/v1/Show/Tables/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  sequelize.query("show tables", { type: sequelize.QueryTypes.SELECT})
  .then(Tables => {
    res.send(beautify(Tables, null, 2, 100));
  })
});

//---API SignOut Start
app.get('/Api/v1/SignOut/:UserName/:SignOutKey', function (req, res) {
  let UserName = req.params.UserName;
  let Password = req.params.SignOutKey;

  if(!isNullOrEmpty(UserName)&&
  !isNullOrEmpty(SignOutKey)){

    res.send('test login');
  }else{
    res.send('no params sent');
  }
});

//---API SignOut End
//---API Login Start
app.get('/Api/v1/Login/:UserName/:Password/', function (req, res) {
  res.send('Not Used use Query Version Instead');
  /*let UserName = req.params.UserName;
  let Password = req.params.Password;

  if(!isNullOrEmpty(UserName)&&
  !isNullOrEmpty(Password)){
    let isVerified;
    let result = Models.UserAccount.findAll({ 
      where: {
        UserName: {
          eq: UserName//not null
        },
        Password: {
          eq: Password//not null
        }
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
      res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      
      res.send("Error "+result);

    })

/*
  }else{
    res.send('no params sent');
  }*/
});
//---API Login End





//---POKER ROUTING START
app.get('/Api/v1/Poker/:Hand/', (req, res) =>
{
  let PlayerHand = req.params.Hand;
  let ArrayHand = JSON.parse("[" + PlayerHand + "]"); // to array

  let cmb = Combinatorics.combination(ArrayHand, 7);//5 for holdem 7 for omha
  let AllCombinations = [];
  let a;
  while(a = cmb.next())
  {
    AllCombinations.push(a);
  }
  let EvaluatedHand = [];
  for(let i = 0; i < AllCombinations.length; ++i)
  {
    EvaluatedHand.push(new PokerHand(AllCombinations[i].join().replace(/\,/ig, " "))); //join = tostring() // replacing "," to " " and i = ignore case sensitive, g = global
  }
  let bestScore = sortBy(EvaluatedHand, 'score');
  res.send(bestScore);
});
app.get('/Api/v1/Omaha/:Hand/', (req, res) =>
{
      let PlayerHand = req.params.Hand;
      let ArrayHand = JSON.parse("[" + PlayerHand + "]"); // to array
 
      let cmb = Combinatorics.combination(ArrayHand, 7);//5 for holdem 7 for omha
      let AllCombinations = [];
      let a;
      while(a = cmb.next())
      {
        AllCombinations.push(a);
      }
      let EvaluatedHand = [];
      for(let i = 0; i < AllCombinations.length; ++i)
      {
        EvaluatedHand.push(new PokerHand(AllCombinations[i].join().replace(/\,/ig, " "))); //join = tostring() // replacing "," to " " and i = ignore case sensitive, g = global
      }
      let bestScore = sortBy(EvaluatedHand, 'score');
      res.send(bestScore);
});
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Title
 * @param {*} Description
 * @param {*} Reason
 * @param {*} Time
 * @param {*} Date
 * @param {*} Status
 * @param {*} callback
 */
function AddSupportTicket(UserAccountID,Title,Description,Reason,Time,Date,Status,callback){
  var item1 = Models.SupportTicket.build({
    UserAccountID:UserAccountID,
    Title:Title,
    Description:Description,
    Reason:Reason,
    Time:Time,
    Date:Date,
    Status:Status
  });
  Models.SupportTicket.sync({alter : true/*,force:true*/});//force to recreate if non production code
  item1.save()
  .then(Success => {
   
    console.log("----AddSupportTicket Start-----");
    console.log(Success);
    console.log("----AddSupportTicket End-----");
    callback("Inserted");
  })
  .catch(error => {
    console.log("error inserting " +error);
    callback(undefined);
  });
}


/**
 *
 *
 * @param {*} SupportTicketID
 * @param {*} callback
 */
function isSupportTicketIDExist(SupportTicketID,callback){
  Models.SupportTicket.sync();
    let result = Models.SupportTicket.findAll({ 
      where: {
        SupportTicketID:SupportTicketID
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      console.log(result);
      callback(undefined);
    });
}


/**
 *
 *
 * @param {*} SupportTicketID
 * @param {*} UserAccountID
 * @param {*} Title
 * @param {*} Description
 * @param {*} Reason
 * @param {*} Time
 * @param {*} Date
 * @param {*} Status
 * @param {*} callback
 */
function SupportTicketUpdate(SupportTicketID,UserAccountID,Title,Description,Reason,Time,Date,Status,callback){
  Models.SupportTicket.update({
    Title: Title,
    Description: Description,
    Reason: Reason,
    Time: Time,
    Date: Date,
    Status: Status
  },{
    where: {SupportTicketID: SupportTicketID,UserAccountID:UserAccountID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    console.log("Error Updating " +error);
    callback(undefined);
  });
}

app.get('/Api/v1/SupportTicket/Clear', function (req, res){
  Models.SupportTicket.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/SupportTicket/Delete', function (req, res){
  Models.SupportTicket.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});
app.get('/Api/v1/SupportTicket/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  Models.SupportTicket.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    Models.SupportTicket.sync();
    let result = Models.SupportTicket.findAll({ 
      where: {
        SupportTicketID: {
          ne: null//not null
        }
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
     
      res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors

      res.send("Error "+result);
    });
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
  //res.send("SupportTicket "+Offset+" "+ Limit+" "+Sort);
});
app.get('/Api/v1/SupportTicket/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.SupportTicket.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.SupportTicket.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});


/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Status
 * @param {*} callback
 */
function SupportTicketUserAccountIDByStatus(UserAccountID,Status,callback){
  Models.SupportTicket.sync();
    let result = Models.SupportTicket.findAll({ 
      where: {
        UserAccountID:UserAccountID,Status:Status
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
    }).catch(function(result) {//catching any then errors
      console.log("Error "+result);
      callback(undefined);
    });
}
function SupportTicketUserAccountID(UserAccountID,callback){
  Models.SupportTicket.sync();
    let result = Models.SupportTicket.findAll({ 
      where: {
        UserAccountID:UserAccountID
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
    }).catch(function(result) {//catching any then errors
      console.log("Error "+result);
      callback(undefined);
    });
}
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





/**
 *
 *
 * @param {*} NotificationType
 * @param {*} Title
 * @param {*} Description
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
function AddNotification(NotificationType,Title,Description,Time,Date,callback){
  var item1 = Models.Notification.build({
    NotificationType:NotificationType,
    Title:Title,
    Description:Description,
    Time:Time,
    Date:Date
  });
  Models.Notification.sync({alter : true/*,force:true*/});//force only for non production it recreates the table
  item1.save()
  .then(Success => {
    console.log("----AddNotification Start-----");
    console.log(Success);
    console.log("----AddNotification End-----");
    callback("Inserted");
  })
  
  .catch(error => {
    console.log("error inserting " +error);
    callback(undefined);
  });
}


/**
 *
 *
 * @param {*} NotificationID
 * @param {*} callback
 */
function IsNotificationIDExist(NotificationID,callback){
  Models.Notification.sync();
  let result = Models.Notification.findAll({ 
    where: {
      NotificationID:NotificationID
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
        
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
  }).catch(function(result) {//catching any then errors
    console.log("Error "+result);
    callback(undefined);
  });
}


/**
 *
 *
 * @param {*} NotificationID
 * @param {*} NotificationType
 * @param {*} Title
 * @param {*} Description
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
function NotificationUpdate(NotificationID,NotificationType,Title,Description,Time,Date,callback){
  Models.Notification.update({
    NotificationType: NotificationType,
    Title: Title,
    Description: Description,
    Time: Time,
    Date: Date
  },{
    where: {NotificationID: NotificationID }
  })
  .then(Success => {
    callback("Updated");
  })
  
  .catch(error => {
    console.log("Error Updating " +error);
    callback(undefined);
  }); 
}
app.get('/Api/v1/Notification/Clear', function (req, res){
  Models.Notification.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/Notification/Delete', function (req, res){
  Models.Notification.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});
app.get('/Api/v1/Notification', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    Models.Notification.sync();
    let result = Models.Notification.findAll({ 
      where: {
        NotificationID: {
          ne: null//not null
        }
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
     
      res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors

      res.send("Error "+result);
    });
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
 // res.send("Notification "+Offset+" "+ Limit+" "+Sort);
});
app.get('/Api/v1/Notification/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.Notification.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.Notification.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});
//---Notification ROUTING END


/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Title
 * @param {*} Status
 * @param {*} Description
 * @param {*} ReportDate
 * @param {*} ReleaseDate
 * @param {*} callback
 */
function AddBlackList(UserAccountID,Title,Status,Description,ReportDate,ReleaseDate,callback){
  var item1 = Models.BlackList.build({
    UserAccountID:UserAccountID,
    Title:Title,
    Status:Status,
    Description:Description,
    ReportDate:ReportDate,
    ReleaseDate:ReleaseDate
  });
  Models.BlackList.sync({alter : true/*,force:true*/});//Force true to recreate table
  item1.save()
  .then(Success => {
    callback("Inserted");
  })
  .catch(error => {
    console.log("error inserting " +error);
    callback(undefined);
  });
}



/**
 *
 *
 * @param {*} BlackListID
 * @param {*} UserAccountID
 * @param {*} Status
 * @param {*} callback
 */
function BlackListStatusUpdate(BlackListID,UserAccountID,Status,callback){
  Models.BlackList.update({
    Status: Status
  },{
    where: {BlackListID: BlackListID , UserAccountID:UserAccountID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    console.log("Error Updating BlackList param 4");
    callback(undefined);
  });
}
//blocklist Tester Only
app.get('/Api/v1/BlackList/Update/BlackListID/:BlackListID/UserAccountID/:UserAccountID/ReplaceWith/UserAccountID2/:UserAccountID2', function (req, res) {
  let BlackListID = req.params.BlackListID;
  let UserAccountID = req.params.UserAccountID;
  let UserAccountID2 = req.params.UserAccountID2;
  Models.BlackList.sync();
  Models.BlackList.update({
    UserAccountID: UserAccountID2,
  },{
    where: {BlackListID: BlackListID , UserAccountID:UserAccountID }
  })
  .then(Success => {
    res.send("Updated this is for testing pourpose");
  }).catch(error => {
    console.log("Error Updating "+error);
    res.send(undefined);
  });
});



/**
 *
 *
 * @param {*} BlackListID
 * @param {*} UserAccountID
 * @param {*} Status
 * @param {*} Title
 * @param {*} Description
 * @param {*} ReportDate
 * @param {*} ReleaseDate
 * @param {*} callback
 */
function BlackListUpdate(BlackListID,UserAccountID,Status,Title,Description,ReportDate,ReleaseDate,callback){//FULL Update For Blacklist
  Models.BlackList.update({
    UserAccountID: UserAccountID,
    Status:Status,
    Title: Title,
    Description: Description,
    ReportDate: ReportDate,
    ReleaseDate: ReleaseDate
  },{
    where: {BlackListID: BlackListID , UserAccountID:UserAccountID }
  })
  .then(Success => {
    callback("Updated");
  }).catch(error => {
    console.log("Error Updating BlackList with 8 params");
    callback(undefined);
  });
}

app.get('/Api/v1/BlackList/Clear', function (req, res){
  Models.BlackList.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/BlackList/Delete', function (req, res){
  Models.BlackList.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});

app.get('/Api/v1/BlackList/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.BlackList.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.BlackList.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});
/**
 *
 *
 * @param {*} callback
 */
function BlackListAll(callback){
  Models.BlackList.sync();
    let result = Models.BlackList.findAll({ 
      where: {
        BlackListID: {
          ne: null//not null
        }
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     

    }).catch(function(result) {//catching any then errors
      console.log("Error "+result);
      callback(undefined);
    });
}
//---BlackList ROUTING END


function BlackListUserAccountID(UserAccountID,callback){
  Models.BlackList.sync();
  let result = Models.BlackList.findAll({ 
    where: {
      UserAccountID:UserAccountID
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
  }).catch(function(result) {//catching any then errors
    console.log("Error "+result);
    callback(undefined);
  });
}



/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} IP
 * @param {*} DeviceName
 * @param {*} DeviceRam
 * @param {*} DeviceCpu
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
function AddLoginHistory(UserAccountID,IP,DeviceName,DeviceRam,DeviceCpu,Time,Date,callback){//accessed by /Login
  var item1 = Models.LoginHistory.build({
    UserAccountID:UserAccountID,
    IP:IP,
    DeviceName:DeviceName,
    DeviceRam:DeviceRam,
    DeviceCpu:DeviceCpu,
    Time:Time,
    Date:Date
  });
  Models.LoginHistory.sync({alter : true,/*force:true*/});//force recreates deletes old table
  item1.save()
  .then(Success => {
    callback("Inserted");
  })
  .catch(error => {
    console.log("error inserting " +error);
    callback(undefined);
  });
}


/**
 *
 *
 * @param {*} LoginHistoryID
 * @param {*} UserAccountID
 * @param {*} IP
 * @param {*} DeviceName
 * @param {*} DeviceRam
 * @param {*} DeviceCpu
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
// ------------------------------------------ MIGRATED
function LoginHistoryUpdate(LoginHistoryID,UserAccountID,IP,DeviceName,DeviceRam,DeviceCpu,Time,Date,callback){
  Models.LoginHistory.update({
    IP: IP,
    DeviceName: DeviceName,
    DeviceRam: DeviceRam,
    DeviceCpu: DeviceCpu,
    Time: Time,
    Date: Date
  },{
    where: {LoginHistoryID: LoginHistoryID,UserAccountID: UserAccountID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
   
    console.log("Error Updating " +error);
    callback(undefined);
  }); 
}

function LoginHistoryUserAccountID(UserAccountID,callback){
  Models.LoginHistory.sync();
  let result = Models.LoginHistory.findAll({ 
    where: {
      UserAccountID:UserAccountID
   },
   order: [['updatedAt', 'DESC']]
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
    
  }).catch(function(result) {//catching any then errors
    console.log("Error "+result);
    callback(undefined);
  });
}
function LoginHistoryUserAccountIDLatest(UserAccountID,callback){
  Models.LoginHistory.sync();
  let result = Models.LoginHistory.findAll({ 
    where: {
      UserAccountID:UserAccountID
   },
   limit:1,
   order: [['updatedAt', 'DESC']]
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
    
  }).catch(function(result) {//catching any then errors
    console.log("Error "+result);
    callback(undefined);
  });
}

app.get('/Api/v1/LoginHistory/Clear', function (req, res){
  Models.LoginHistory.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/LoginHistory/Delete', function (req, res){
  Models.LoginHistory.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});

app.get('/Api/v1/LoginHistory/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  Models.LoginHistory.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    Models.LoginHistory.sync();
    let result = Models.LoginHistory.findAll({ 
      where: {
        LoginHistoryID: {
          ne: null//not null
        }
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
     
      res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors

      res.send("Error "+result);
    });
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
  //res.send("LoginHistory "+Offset+" "+ Limit+" "+Sort);
});
app.get('/Api/v1/LoginHistory/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.LoginHistory.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.LoginHistory.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});
//---LoginHistory ROUTING END
//---BankInformation ROUTING START

app.get('/Api/v1/BankInformation/Add/:UserAccountID/:BankName/:SecurityCode/:Valid/:Expiration/:Time/:Date', function (req, res) {
  //Uasge /Api/v1/BankInformation/Add/UserAccountID/BankName/SecurityCode/Valid/2018-06-27/01:57:17/2018-06-27
  let UserAccountID = req.params.UserAccountID;
  let BankName = req.params.BankName;
  let SecurityCode = req.params.SecurityCode;
  let Valid = req.params.Valid;
  let Expiration = req.params.Expiration;
  let Time = req.params.Time;
  let Date = req.params.Date;
  
  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(BankName)){
      if(!isNullOrEmpty(SecurityCode)){
        if(!isNullOrEmpty(Valid)){
          if(!isNullOrEmpty(Expiration)){
            if(!isNullOrEmpty(Time)){
              if(!isNullOrEmpty(Date)){
                BankInformationAdd(UserAccountID,BankName,SecurityCode,Valid,Expiration,Time,Date,function(response){
                  if(response){
                    res.send(response);
                  }else{
                    res.send({BankInformationAddFailed:true});
                  }
                });
              }else{
                res.send({DateMissing:true});
              }
            }else{
              res.send({TimeMissing:true});
            }
          }else{
            res.send({ExpirationMissing:true});
          }
        }else{
          res.send({ValidMissing:true});
        }
      }else{
        res.send({SecurityCodeMissing:true});
      }
    }else{
      res.send({BankNameMissing:true});
    }
  }else{
    res.send({UserAccountIDMissing:true});
  }
});

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} BankName
 * @param {*} SecurityCode
 * @param {*} Valid
 * @param {*} Expiration
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
// --------------------------------------- MIGRATED
function BankInformationAdd(UserAccountID,BankName,SecurityCode,Valid,Expiration,Time,Date,callback){
  var item1 = Models.BankInformation.build({
    UserAccountID:UserAccountID,
    BankName:BankName,
    SecurityCode:SecurityCode,
    Valid:Valid,
    Expiration:Expiration,
    Time:Time,
    Date:Date
  });
  Models.BankInformation.sync({alter : true/*,force:true*/});//force recreates deletes old table
  item1.save().then(Success => {
   callback("Inserted");
  })
  .catch(error => {
    console.log("error inserting " +error);
    callback(undefined);
  });
}


/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} BankInformationID
 * @param {*} BankName
 * @param {*} SecurityCode
 * @param {*} Expiration
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
function BankInformationUpdate(UserAccountID,BankInformationID,BankName,SecurityCode,Expiration,Time,Date,callback){
  Models.BankInformation.update({
    UserAccountID: UserAccountID,
    BankName: BankName,
    SecurityCode: SecurityCode,
    Expiration: Expiration,
    Time: Time,
    Date: Date
  },{
    where: {BankInformationID: BankInformationID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    console.log("Error Updating " +error);
    callback(undefined);
  }); 
}
app.get('/Api/v1/BankInformation/Clear', function (req, res){
  Models.BankInformation.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/BankInformation/Delete', function (req, res){
  Models.BankInformation.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});
app.get('/Api/v1/BankInformation/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  Models.BankInformation.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    Models.BankInformation.sync();
    let result = Models.BankInformation.findAll({ 
      where: {
        BankInformationID: {
          ne: null//not null
        }
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
     
      res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors

      res.send("Error "+result);
    });
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
  //res.send("BankInformation "+Offset+" "+ Limit+" "+Sort);
});
app.get('/Api/v1/BankInformation/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.BankInformation.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.BankInformation.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});
//---BankInformation ROUTING END

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Amount
 * @param {*} BankNameUsed
 * @param {*} Status
 * @param {*} RequestedDATE
 * @param {*} ApprovedDATE
 * @param {*} RejectedDATE
 * @param {*} ProcessingDATE
 * @param {*} RequestedTIME
 * @param {*} ApprovedTIME
 * @param {*} RejectedTIME
 * @param {*} ProcessingTIME
 * @param {*} callback
 */
function AddWithdrawHistory(UserAccountID,Amount,BankNameUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,ApprovedTIME,RejectedTIME,ProcessingTIME,callback){
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
    ApprovedTIME:ApprovedTIME,
    RejectedTIME:RejectedTIME,
    ProcessingTIME:ProcessingTIME, 
    });
    Models.WithdrawHistory.sync();
    item1.save()
    .then(Success => {
      callback("Inserted");
    })
    
    .catch(error => {
  
      console.log("error inserting " +error);
      callback(undefined);
    });
}

function WithdrawHistoryUpdateApproved(UserAccountID,WithdrawHistoryID,ApprovedDATE,ApprovedTIME,callback){
  Models.WithdrawHistory.update({
    ApprovedDATE: ApprovedDATE,
    ApprovedTIME:ApprovedTIME,
    Status:"Approved"
  },{
    where: {WithdrawHistoryID:WithdrawHistoryID,UserAccountID: UserAccountID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    console.log("Error Updating " +error);
    callback(undefined);
  }); 
}

function WithdrawHistoryUpdateProcessing(UserAccountID,WithdrawHistoryID,ProcessingDATE,ProcessingTIME,callback){
  Models.WithdrawHistory.update({
    ProcessingDATE: ProcessingDATE,
    ProcessingTIME:ProcessingTIME,
    Status:"Processing"
  },{
    where: {UserAccountID: UserAccountID,WithdrawHistoryID:WithdrawHistoryID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    console.log("Error Updating " +error);
    callback(undefined);
  });
}

function WithdrawHistoryUpdateRejected(UserAccountID,WithdrawHistoryID,RejectedDATE,RejectedTIME,callback){
  Models.WithdrawHistory.update({
    RejectedDATE: RejectedDATE,
    RejectedTIME:RejectedTIME,
    Status:"Rejected"
  },{
    where: {UserAccountID: UserAccountID,WithdrawHistoryID:WithdrawHistoryID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    console.log("Error Updating " +error);
    callback(undefined);
  });
}

/**
 *
 *
 * @param {*} WithdrawHistoryID
 * @param {*} UserAccountID
 * @param {*} Amount
 * @param {*} BankNameUsed
 * @param {*} SecurityCodeUsed
 * @param {*} Status
 * @param {*} RequestedDATE
 * @param {*} ApprovedDATE
 * @param {*} RejectedDATE
 * @param {*} ProcessingDATE
 * @param {*} RequestedTIME
 * @param {*} ApprovedTIME
 * @param {*} RejectedTIME
 * @param {*} ProcessingTIME
 * @param {*} callback
 */
function WithdrawHistoryUpdate(WithdrawHistoryID,UserAccountID,Amount,BankNameUsed,SecurityCodeUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,ApprovedTIME,RejectedTIME,ProcessingTIME,callback){
  Models.WithdrawHistory.update({
    Amount: Amount,
    BankNameUsed: BankNameUsed,
    SecurityCodeUsed: SecurityCodeUsed,
    Status: Status,
    RequestedDATE: RequestedDATE,
    ApprovedDATE: ApprovedDATE,
    RejectedDATE: RejectedDATE,
    ProcessingDATE: ProcessingDATE,
    RequestedTIME: RequestedTIME,
    ApprovedTIME:ApprovedTIME,
    RejectedTIME: RejectedTIME,
    ProcessingTIME: ProcessingTIME
  },{
    where: {WithdrawHistoryID: WithdrawHistoryID,UserAccountID:UserAccountID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    console.log("Error Updating " +error);
    callback(undefined);
  });
}
app.get('/Api/v1/WithdrawHistory/Clear', function (req, res){
  Models.WithdrawHistory.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/WithdrawHistory/Delete', function (req, res){
  Models.WithdrawHistory.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});
app.get('/Api/v1/WithdrawHistory/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  Models.WithdrawHistory.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    Models.WithdrawHistory.sync();
    let result = Models.WithdrawHistory.findAll({ 
      where: {
        WithdrawHistoryID: {
          ne: null//not null
        }
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
     
      res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors

      res.send("Error "+result);
    });
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
  //res.send("WithdrawHistory "+Offset+" "+ Limit+" "+Sort);
});


function WithdrawHistoryUserAccountID(UserAccountID,callback){
  Models.WithdrawHistory.sync();
    let result = Models.WithdrawHistory.findAll({ 
      where: {
        UserAccountID:UserAccountID
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
     
    }).catch(function(result) {//catching any then errors
      console.log("Error "+result);
      callback(undefined);
    });
}

app.get('/Api/v1/WithdrawHistory/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.WithdrawHistory.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.WithdrawHistory.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});
//Transaction list of a player not to be confued with TransferHistory between players
//NOT A TRASFER HISTORY but a transactions performed on and by the PLAYER to SELF Account
app.get('/Api/v1/TransactionList/UserAccountID/:UserAccountID/',function(req,res){//A combination of Deposit and Withdraw List in one request but for the player its self
  res.setHeader('Content-Type', 'application/json');
  let UserAccountID = req.params.UserAccountID;
  let PhoneNumber = req.param.PhoneNumber;
  let TelephoneNumber = req.param.TelephoneNumber;
  let UserAccountIDExist = false;
  let UserInfoExist = false;
  let PlayerExist = false;
  let ScreenName = undefined;
  let Name = undefined;
  let PlayerRelationshipResult =undefined;
  let WithdrawHistoryExist =false;
  let WithdrawHistoryResult = undefined;//empty array if no history but should not be undefined and still output
  let DepositHistoryExist=false;
  let DepositHistoryResult = undefined;//empty array if no history but should not be undefined and still output
  if(!isNullOrEmpty(UserAccountID)){
    async.series([UserAccountCheck,UserInfoCheck,PlayerCheck,GetParentPlayerLookUp,GetWithdrawHistory,GetDepositHistory],function(error,response){
      let WithdrawListItem = PlayerRelationshipResult;
      WithdrawListItem.PhoneNumber = PhoneNumber;
      WithdrawListItem.TelephoneNumber = TelephoneNumber;
      WithdrawListItem.Name = Name;
      WithdrawListItem.ScreenName = ScreenName;
      WithdrawListItem.WithdrawHistory= WithdrawHistoryResult;
      WithdrawListItem.DepositHistory = DepositHistoryResult;
     
      res.send(beautify(WithdrawListItem, null, 2, 100));
    });
    function UserAccountCheck(callback){
      isUserAccountIDExist(UserAccountID,function(response){
        if(response!=undefined){
          UserAccountIDExist= true;
          callback(null,'1');
        }else{
          UserAccountIDExist=false;
          callback(null,'1');
        }
      });
    }
    function UserInfoCheck(callback){
      UserInfoUserAccountID(UserAccountID,function(response){
        if(response!=undefined){
          UserInfoExist=true;
          PhoneNumber = response[0].PhoneNumber;
          TelephoneNumber = response[0].TelephoneNumber;
         callback(null,'2');
        }else{
          UserInfoExist= false;
         callback(null,'2');
        }
      });
    }
    function PlayerCheck(callback){
      PlayerUserAccountID(UserAccountID,function(response){
        if(response!=undefined){
         PlayerExist= true;
         Name = response[0].Name;
         ScreenName = response[0].ScreenName;
         callback(null,'3');
        }else{
         PlayerExist= false;
         callback(null,'3');
        }
      });
    }
    
    function GetParentPlayerLookUp(callback){
     GetParentRelationshipPlayerUserAccountID(UserAccountID,function(response){
       if(response!=undefined){
         PlayerRelationshipResult=response;
         callback(null,'4');
       }else{
         PlayerRelationshipResult=undefined;
         callback(null,'4');
       }
     });
    }
    function GetWithdrawHistory(callback){
      WithdrawHistoryUserAccountID(UserAccountID,function(response){
        if(response!=undefined){
          WithdrawHistoryResult = response;
          WithdrawHistoryExist=true;
          callback(null,'5');
        }else{
          WithdrawHistoryResult = [];// THIS  is valid because we want to return empty if no result
          WithdrawHistoryExist=false;
          callback(null,'5');
        }
      });
    }
    function GetDepositHistory(callback){
      DepositHistoryUserAccountID(UserAccountID,function(response){
        if(response!=undefined){
          DepositHistoryResult = response;
          DepositHistoryExist=true;
          callback(null,'6');
        }else{
          DepositHistoryResult = [];// THIS is valid because we want to return empty if no result
          DepositHistoryExist=false;
          callback(null,'6');
        }
      });
    }
  }else{
    res.send({UserAccountIDMissing:true});
  }
});

//---WithdrawHistory ROUTING END

//---DepositHistory ROUTING START 
app.get('/Api/v1/DepositHistory/Add/UserAccountID/:UserAccountID/Amount/:Amount/BankNameUsed/:BankNameUsed/SecurityCodeUsed/:SecurityCodeUsed/Status/:Status/RequestedDATE/:RequestedDATE/ApprovedDATE/:ApprovedDATE/RejectedDATE/:RejectedDATE/ProcessingDATE/:ProcessingDATE/RequestedTIME/:RequestedTIME/ApprovedTIME/:ApprovedTIME/RejectedTIME/:RejectedTIME/ProcessingTIME/:ProcessingTIME', function (req, res) {
 // Usage /Api/v1/DepositHistory/Add/UserAccountID/6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6/Amount/0/BankNameUsed/BankNameUsed/SecurityCodeUsed/SecurityCodeUsed/Status/Processing/RequestedDATE/2018-06-26/ApprovedDATE/2018-06-26/RejectedDATE/2018-06-26/ProcessingDATE/2018-06-26/RequestedTIME/01:59:17/ApprovedTIME/01:59:17/RejectedTIME/01:59:17/ProcessingTIME/01:59:17
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
  let ApprovedTIME = req.params.ApprovedTIME;
  let RejectedTIME = req.params.RejectedTIME;
  let ProcessingTIME = req.params.ProcessingTIME;
  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(Amount)){
      if(!isNullOrEmpty(BankNameUsed)){
        if(!isNullOrEmpty(SecurityCodeUsed)){
          if(!isNullOrEmpty(Status)){
            let RequestedDATEParsed = moment(RequestedDATE,"YYYY-MM-DD");
            let  isValidRequestedDATEParsed = RequestedDATEParsed.isValid();

            if(!isNullOrEmpty(RequestedDATE)&&isValidRequestedDATEParsed==true&&RequestedDATEParsed.year()>1959){
              let ApprovedDATEParsed = moment(ApprovedDATE,"YYYY-MM-DD");
              let  isValidApprovedDATEParsed = ApprovedDATEParsed.isValid();

              if(!isNullOrEmpty(ApprovedDATE)&&isValidApprovedDATEParsed==true&&ApprovedDATEParsed.year()>1959){
                let RejectedDATEParsed = moment(RejectedDATE,"YYYY-MM-DD");
                let  isValidRejectedDATEParsed = RejectedDATEParsed.isValid();

                if(!isNullOrEmpty(RejectedDATE)&&isValidRejectedDATEParsed==true&&RejectedDATEParsed.year()>1959){
                  let ProcessingDATEParsed = moment(ProcessingDATE,"YYYY-MM-DD");
                  let  isValidProcessingDATEParsed = ProcessingDATEParsed.isValid();

                  if(!isNullOrEmpty(ProcessingDATE)&&isValidProcessingDATEParsed==true&&ProcessingDATEParsed.year()>1959){

                    if(!isNullOrEmpty(RequestedTIME)){
                      if(!isNullOrEmpty(ApprovedTIME)){
                        if(!isNullOrEmpty(RejectedTIME)){
                          if(!isNullOrEmpty(ProcessingTIME)){
                            
                            if(Amount>0){
                              if(Status=="Approved"||Status=="Rejected"||Status=="Processing"){
                                let isUserAccountIDFound =false;

                                async.series([IsUserAccountIDExistCheck],function(error,response){
                                  if(isUserAccountIDFound==true){

                                    AddDepositHistory(UserAccountID,Amount,BankNameUsed,SecurityCodeUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,ApprovedTIME,RejectedTIME,ProcessingTIME,function(response) {
                                      res.send(response);
                                    });
                               
                                  }else{
                                    res.send({IsUserAccountIDExist:false});
                                  }
                                });

                                function IsUserAccountIDExistCheck(callback){
                                  isUserAccountIDExist(UserAccountID,function(response){
                                    if(response!=undefined){
                                      isUserAccountIDFound=true;
                                      callback(null,'1');
                                    }else{
                                      isUserAccountIDFound=false;
                                      callback(null,'1');
                                    }
                                  });
                                }
                 
                              }else{
                                res.send({StatusInvalidValue:true});
                              }
                            }else{
                              res.send({AmountInvalidValue:true});
                            }
                          }else{
                            res.send({ProcessingTIMEMissing:true});
                          }
                        }else{
                          res.send({RejectedTIMEMissing:true});
                        }
                      }else{
                        res.send({ApprovedTIMEMissing:true});
                      }
                    }else{
                      res.send({RequestedTIMEMissing:true});
                    }
                  }else{
                    res.send({ProcessingDATEMissing:true});
                  }
                }else{
                  res.send({RejectedDATEMissing:true});
                }
              }else{
                res.send({ApprovedDATEMissing:true});
              }
            }else{
              res.send({RequestedDATEMissing:true});
            }
          }else{
            res.send({StatusMissing:true});
          }
        }else{
          res.send({SecurityCodeUsedMissing:true});
        }
      }else{
        res.send({BankNameUsed:true});
      }
    }else{
      res.send({AmountMissing:true})
    }
  }else{
    res.send({UserAccountIDMissing:true});
  }  
});


/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Status
 * @param {*} callback
 */
function DepositHistoryUserAccountIDStatus(UserAccountID,Status,callback){
  Models.DepositHistory.sync();
  let result = Models.DepositHistory.findAll({ 
    where: {
      UserAccountID:UserAccountID,
      Status:Status
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
        
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
  }).catch(function(result) {//catching any then errors
    console.log("Error "+result);
    callback(undefined);
  });
}


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

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Amount
 * @param {*} BankNameUsed
 * @param {*} SecurityCodeUsed
 * @param {*} Status
 * @param {*} RequestedDATE
 * @param {*} ApprovedDATE
 * @param {*} RejectedDATE
 * @param {*} ProcessingDATE
 * @param {*} RequestedTIME
 * @param {*} ApprovedTIME
 * @param {*} RejectedTIME
 * @param {*} ProcessingTIME
 * @param {*} callback
 */

// -------------------------MIGRATED 
function AddDepositHistory(UserAccountID,Amount,BankNameUsed,SecurityCodeUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,ApprovedTIME,RejectedTIME,ProcessingTIME,callback){
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
    ApprovedTIME:ApprovedTIME,
    RejectedTIME:RejectedTIME,
    ProcessingTIME:ProcessingTIME, 
  });
  Models.DepositHistory.sync({alter : true});
  item1.save()
  .then(Success => {
    console.log("----AddDepositHistory Start-----");
    console.log(Success);
   
    console.log("----AddDepositHistory End-----");
    callback("Inserted");
  })
  .catch(error => {
    console.log("error inserting " +error);
    callback(undefined);
  });
}


function DepositHistoryUpdateProcessing(UserAccountID,DepositHistoryID,ProcessingDATE,ProcessingTIME,callback){
  Models.DepositHistory.update({
    ProcessingDATE: ProcessingDATE,
    ProcessingTIME:ProcessingTIME,
    Status:"Processing"
  },{
    where: {DepositHistoryID:DepositHistoryID,UserAccountID: UserAccountID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    console.log("Error Updating " +error);
    callback(undefined);
  }); 
}


function DepositHistoryUpdateRejected(UserAccountID,DepositHistoryID,RequestedDATE,RejectedTIME,callback){
  Models.DepositHistory.update({
    ApprovedDATE: RequestedDATE,
    ApprovedTIME:RejectedTIME,
    Status:"Rejected"
  },{
    where: {DepositHistoryID:DepositHistoryID,UserAccountID: UserAccountID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    console.log("Error Updating " +error);
    callback(undefined);
  }); 
}


/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} DepositHistoryID
 * @param {*} callback
 */
function DepositHistoryIDUserAccountID(UserAccountID,DepositHistoryID,callback){
  Models.DepositHistory.sync();
  let result = Models.DepositHistory.findAll({ 
    where: {
      DepositHistoryID:DepositHistoryID,
      UserAccountID:UserAccountID
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
  }).catch(function(result) {//catching any then errors
    console.log("Error "+result);
    callback(undefined);
  });
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
function DepositHistoryUserAccountID(UserAccountID,callback){
  Models.DepositHistory.sync();
  let result = Models.DepositHistory.findAll({ 
    where: {
      UserAccountID:UserAccountID
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
  }).catch(function(result) {//catching any then errors
    console.log("Error "+result);
    callback(undefined);
  });
}

app.get('/Api/v1/DepositHistory/Clear', function (req, res){
  Models.DepositHistory.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/DepositHistory/Delete', function (req, res){
  Models.DepositHistory.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});

app.get('/Api/v1/DepositHistory/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.DepositHistory.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.DepositHistory.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});



function TransferHistoryAll(callback){
  Models.TransferHistory.sync();
  let result = Models.TransferHistory.findAll({ 
    where: {
      TransferHistoryID: {
        ne: null//not null
      }
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
        
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
  }).catch(function(result) {//catching any then errors
    console.log("Error "+result);
    callback(undefined);
  });
}
app.get('/Api/v1/TransferHistory/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.TransferHistory.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.TransferHistory.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});



// -------------------------- MIGRATED
function AddTransferHistory(TransferHistoryUUID,UserAccountIDReceiver,UserAccountIDSender,Amount,Status,Reason,TransferedDATE,callback){
  Models.TransferHistory.sync({alter : true/*,force:true*/});
  var item1 = Models.TransferHistory.build({
    TransferHistoryUUID:TransferHistoryUUID,
    UserAccountIDReceiver:UserAccountIDReceiver,
    UserAccountIDSender:UserAccountIDSender,
    Amount:Amount,
    Status:Status,
    Reason:Reason,
    TransferedDATE:TransferedDATE
  });
  //force:true deletes the old table Don't DO THIS ON PRODUCTION CODE
  Models.TransferHistory.sync({/*alter : true*//*,force:true*/});
  item1.save()
  .then(Success => {

     console.log("----AddTransferHistory Start-----");
     console.log(Success);
     console.log("----AddTransferHistory End-----");
     callback("Inserted");
  })
  .catch(error => {
    // mhhh, wth!
    console.log();
    callback(undefined);
  });
}

function TransferHistoryUserAccountIDReceiver(UserAccountIDReceiver,callback){
  Models.TransferHistory.sync();
    let result = Models.TransferHistory.findAll({ 
      where: {
        UserAccountIDReceiver:UserAccountIDReceiver
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
    }).catch(function(result) {//catching any then errors
      console.log("Error "+result);
      callback(undefined);
    });
}

function TransferHistoryUserAccountIDSender(UserAccountIDSender,callback){
  Models.TransferHistory.sync();
    let result = Models.TransferHistory.findAll({ 
      where: {
        UserAccountIDSender:UserAccountIDSender
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
    }).catch(function(result) {//catching any then errors
      console.log("Error "+result);
      callback(undefined);
    });
}

function TransferHistoryTransferHistoryUUID(TransferHistoryUUID,callback){
  Models.TransferHistory.sync();
  let result = Models.TransferHistory.findAll({ 
    where: {
      TransferHistoryUUID:TransferHistoryUUID
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
        
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
  }).catch(function(result) {//catching any then errors
    console.log("Error "+result);
    callback(undefined);
  });
}
function TransferHistoryUpdate(TransferHistoryUUID,UserAccountIDReceiver,UserAccountIDSender,Amount,Status,Reason,TransferedDATE,callback){
  Models.TransferHistory.update({
    UserAccountIDReceiver:UserAccountIDReceiver,
    UserAccountIDSender:UserAccountIDSender,
    Amount:Amount,
    Status:Status,
    Reason:Reason,
    TransferedDATE:TransferedDATE,
  },{
    where: {TransferHistoryUUID: TransferHistoryUUID}
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    console.log("Error Updating " +error);
    callback(undefined);
  });
}

//--TransferHistory ROUTING END



/**
 *
 *
 * @param {*} SeasonID
 * @param {*} SmallBlind
 * @param {*} BigBlind
 * @param {*} Speed
 * @param {*} callback
 */
function AddRoomConfiguration(SeasonID,SmallBlind,BigBlind,Speed,callback){
  var item1 = Models.RoomConfiguration.build({
    SeasonID:SeasonID,
    SmallBlind:SmallBlind,
    BigBlind:BigBlind,
    Speed:Speed
  });
  Models.RoomConfiguration.sync({alter : true/*,force:true*/});//use force to delete old table non production
  item1.save()
  .then(Success => {
    callback("Inserted");
  })
  .catch(error => {
   
    console.log("error inserting " +error);
    callback(undefined);
  });
}

/**
 *
 *
 * @param {*} SeasonID
 * @param {*} callback
 */
function IsSeasonIDExist(SeasonID,callback){
  Models.RoomConfiguration.sync();
  let result = Models.RoomConfiguration.findAll({ 
    where: {
      SeasonID:SeasonID
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
        
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
  
  }).catch(function(result) {//catching any then errors
    console.log("Error "+result);
    callback(undefined);
  });
}

/**
 *
 *
 * @param {*} SeasonID
 * @param {*} SmallBlind
 * @param {*} BigBlind
 * @param {*} callback
 */
function RoomConfigurationSeasonIDUpdateSmallBigBlind(SeasonID,SmallBlind,BigBlind,callback){
  Models.RoomConfiguration.sync(/*{force:true}*/);
  Models.RoomConfiguration.update({
    SmallBlind:SmallBlind,
    BigBlind:BigBlind
  },{
    where: {SeasonID: SeasonID }
  })
  .then(Success => {
    console.log("Updated");
    callback("Updated");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("Error Updating " +error);
    callback(undefined);
  });
}

app.get('/Api/v1/RoomConfiguration/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.RoomConfiguration.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.RoomConfiguration.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});

/**
 *
 *
 * @param {*} callback
 */
function RoomConfiguration(callback){
  Models.RoomConfiguration.sync();
    let result = Models.RoomConfiguration.findAll({ 
      where: {
        RoomConfigurationID: {
          ne: null//not null
        }
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
    
    }).catch(function(result) {//catching any then errors
      console.log("Error "+result);
      callback(undefined);
     
    });
}

app.get('/Api/v1/RoomConfiguration/Clear', function (req, res){

  Models.RoomConfiguration.destroy({
    where: {},
    truncate: true}).then(function(result) {
      sequelize.queryInterface.removeConstraint('GameHistory', 'SeasonID');
    res.send("Cleared");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});
app.get('/Api/v1/RoomConfiguration/Delete', function (req, res){
  res.send("UnImplemented");
 /* Models.RoomConfiguration.sync();
  sequelize.query('DROP TABLE RoomConfigurations', { model: Models.RoomConfiguration }).then(RoomConfiguration => {
    // Each record will now be a instance of Project
    res.send(RoomConfiguration);
  }).catch(error=>{
    res.send(error);
  });*/
});

//---RoomConfiguration ROUTING END


/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} RoundID
 * @param {*} SeasonID
 * @param {*} Rank
 * @param {*} Score
 * @param {*} Card
 * @param {*} Time
 * @param {*} Date
 * @param {*} BeforePoints
 * @param {*} AfterPoints
 * @param {*} callback
 */
function AddGameHistory(UserAccountID,RoundID,SeasonID,Rank,Score,Card,Time,Date,BeforePoints,AfterPoints,callback){
  Models.GameHistory.sync();
  var item1 = Models.GameHistory.build({
    UserAccountID:UserAccountID,
    RoundID:RoundID,
    SeasonID:SeasonID,
    Rank:Rank,
    Score:Score,
    Card:Card,
    Time:Time,
    Date:Date,
    BeforePoints:BeforePoints,
    AfterPoints:AfterPoints
  });
  Models.GameHistory.sync();//use force to delete old table non production
  item1.save()
  .then(Success => {
    callback("Inserted");
  })
  
  .catch(error => {
   
    console.log("error inserting " +error);
    callback(undefined);
  });
}

app.get('/Api/v1/GameHistory/Clear', function (req, res){
  Models.GameHistory.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/GameHistory/Delete', function (req, res){
  Models.GameHistory.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});

app.get('/Api/v1/GameHistory/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.GameHistory.sync();//Never call Alter or Force during a Database table Alter process before knowing that it can query select all first
  Models.GameHistory.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});
/**
 *
 *
 * @param {*} callback
 */
function GameHistory(callback){
  Models.GameHistory.sync();
  let result = Models.GameHistory.findAll({ 
    where: {
      GameHistoryID: {
        ne: null//not null
      }
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
        
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
    
  }).catch(function(result) {//catching any then errors
    console.log("Error "+result);
    callback(undefined);
  });
}
//---GameHistory ROUTING END
//---HandHistory ROUTING START
app.get('/Api/v1/HandHistory/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  HandHistory(function(response){
    if(response!=undefined){
      res.send(beautify(response, null, 2, 100));
    }else{
      res.send([]);
    }
  });
});
function HandHistory(callback){
  Models.HandHistory.sync();
  let result = Models.HandHistory.findAll({ 
    where: {
      HandHistoryID: {
        ne: null//not null
      }
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
        
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
    
  }).catch(function(result) {//catching any then errors
    console.log("Error "+result);
    callback(undefined);
  });
}


function HandHistoryUserAccountID(UserAccountID,callback){
  Models.HandHistory.sync();
  let result = Models.HandHistory.findAll({ 
    where: {
      UserAccountID:UserAccountID
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
        
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
    
  }).catch(function(result) {//catching any then errors
    console.log("Error "+result);
    callback(undefined);
  });
}
app.get('/Api/v1/HandHistory/AddTest/', function (req, res) {
  Models.HandHistory.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  
  var item1 = Models.HandHistory.build({
    UserAccountID:"6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6",
    MoveHand:"Fold",
    SeasonID:"SeasonID"
  });
  Models.HandHistory.sync();//only use force true if you want to destroy replace table
  item1.save()
  .then(Success => {
    res.send("Inserted");
  })
  .catch(error => {
  
    console.log("error inserting " +error);
    res.send("Failed");
  });
});





// ----------------migrated
function AddHandHistory(UserAccountID,MoveHand,RoundID,callback){
  Models.HandHistory.sync(/*{force:true}*/);
  var item1 = Models.HandHistory.build({
    UserAccountID:UserAccountID,
    MoveHand:MoveHand,
    RoundID:RoundID
  });
  Models.HandHistory.sync();//only use force true if you want to destroy replace table
  item1.save()
  .then(Success => {
    callback("Inserted");
  })
  .catch(error => {
  
    console.log("error inserting " +error);
    callback(undefined);
  });
}


function HandHistoryUpdate(HandHistoryID,UserAccountID,MoveHand,RoundID,callback){
  Models.HandHistory.sync();
  Models.HandHistory.update({
    MoveHand: MoveHand,
    RoundID: RoundID
  },{
    where: {HandHistoryID: HandHistoryID,UserAccountID:UserAccountID }
  })
  .then(Success => {
    console.log("Updated");
    callback("Updated");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("Error Updating " +error);
    callback(undefined);
  });
}

app.get('/Api/v1/HandHistory/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.HandHistory.sync();//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.HandHistory.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });

});
app.get('/test/drop',function (req,res){
  
});
app.get('/Api/v1/HandHistory/Clear', function (req, res) {
  Models.HandHistory.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});

//---HandHistory ROUTING END
//---HandHistoryList ROUTING START

//---HandHistoryList ROUTING END


//---UserInfo ROUTING START --------------------------migrated

// migrated
function AddUserInfo(UserAccountID,Email,PhoneNumber,TelephoneNumber,callback){

    Models.UserInfo.sync(/*{force:true}*/);
    var item1 = Models.UserInfo.build({
      UserAccountID:UserAccountID,
      Email:Email,
      PhoneNumber:PhoneNumber,
      TelephoneNumber:TelephoneNumber
    });
    Models.UserInfo.sync();//only use force true if you want to destroy replace table
    item1.save()
    .then(Success => {
      callback("Inserted");
    })
    .catch(error => {
    
      console.log("error inserting " +error);
      callback(undefined);
    });
}




/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Email
 * @param {*} PhoneNumber
 * @param {*} TelephoneNumber
 * @param {*} callback
 */
function UserInfoUpdate(UserAccountID,Email,PhoneNumber,TelephoneNumber,callback){
  Models.UserInfo.sync(/*{force:true}*/);
  Models.UserInfo.update({
    Email: Email,
    PhoneNumber: PhoneNumber,
    TelephoneNumber: TelephoneNumber
  },{
    where: {UserAccountID: UserAccountID }
  })
  .then(Success => {
    console.log("Updated");
    callback("Updated");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("Error Updating " +error);
    callback(undefined);
  });
}
app.get('/Api/v1/UserInfo/Clear', function (req, res){
  Models.UserInfo.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/UserInfo/Delete', function (req, res){
  Models.UserInfo.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});

function UserInfoUserAccountID(UserAccountID,callback){
  Models.UserInfo.sync();
    let result = Models.UserInfo.findAll({ 
      where: {
        UserAccountID:UserAccountID
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
    }).catch(function(result) {//catching any then errors
      console.log("Error "+result);
      callback(undefined);
    });
}
app.get('/Api/v1/UserInfo/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.UserInfo.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.UserInfo.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});
//---UserInfo ROUTING END


// mmigrated
function AddAccessControl(AccessID,AccessName,AccessTags,callback){
  var item1 = Models.AccessControl.build({
    AccessID:AccessID,
    AccessName:AccessName,
    AccessTags:AccessTags
  });
  Models.AccessControl.sync({alter : true/*,force:true*/});//use force only on non producti1on
  item1.save()
  .then(Success => {
    console.log("----AddUserAccount Start-----");
    console.log(Success);
    console.log("----AddUserAccount End-----");
    callback("Inserted");
  })
  .catch(error => {
    console.log("error inserting " +error);
    callback(undefined);
  });
}


/**
 *
 *
 * @param {*} AccessID
 * @param {*} AccessName
 * @param {*} AccessTags
 */
function AccessControlUpdate(AccessID,AccessName,AccessTags){
  Models.AccessControl.update({
    AccessID: AccessID,
    AccessName: AccessName,
    AccessTags: AccessTags
  },{
    where: {AccessControlID: AccessControlID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("Error Updating " +error);
    callback(undefined);
  });
}

app.get('/Api/v1/AccessControl/Clear', function (req, res){
  Models.AccessControl.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/AccessControl/Delete', function (req, res){
  Models.AccessControl.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors
    res.send("Error "+result);
  });
});
app.get('/Api/v1/AccessControl/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  Models.AccessControl.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    let result = Models.AccessControl.findAll({ 
      where: {
        AccessControlID: {
          ne: null//not null
        }
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item; 
      });
      res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors

      res.send("Error "+result);
    });
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
 // res.send("AccessControl "+Offset+" "+ Limit+" "+Sort);
});
app.get('/Api/v1/AccessControl/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.AccessControl.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.AccessControl.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} AccessID
 * @param {*} UserName
 * @param {*} Password
 * @param {*} Verify
 * @param {*} ValidKey
 * @param {*} RegisteredDate
 * @param {*} RegisteredTime
 * @param {*} callback
 */

// ---------------------migrated
function AddUserAccount(UserAccountID,AccessID,UserName,Password,Verify,ValidKey,RegisteredDate,RegisteredTime, callback){
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
  //force:true deletes the old table Don't DO THIS ON PRODUCTION CODE
  Models.UserAccount.sync({alter : true/*,force:true*/});
  item1.save()
  .then(Success => {

     console.log("----AddUserAccount Start-----");
     console.log(Success);
     console.log("----AddUserAccount End-----");
     callback("Inserted");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting UserAccountID:"+UserAccountID+" \n AccessID:"+AccessID+"\n UserName:"+UserName+"\n Password:"+Password+"\n Verify:"+Verify+"\n ValidKey:"+ValidKey+"\n RegisteredDate:"+RegisteredDate+"\n RegisteredTime:"+RegisteredTime);
    callback(undefined);
  });
}


app.get('/Api/v1/UserAccount/Clear', function (req, res){// will not work due to constraint
  //res.send('Doesnt clear use Delete');
    Models.UserAccount.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });

});
app.get('/Api/v1/Tables/Drop', function (req, res){
  sequelize.queryInterface.dropAllTables();
 Models.UserAccount.sync({force:true});
  res.send("Droped All Table");
});
app.get('/Api/v1/UserAccount/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  Models.UserAccount.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    Models.UserAccount.sync();
    let result = Models.UserAccount.findAll({ 
      where: {
        UserID: {
          ne: null//not null
        }
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
      res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      res.send("Error "+result);
    });
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
  //res.send("UserAccount "+Offset+" "+ Limit+" "+Sort);
});

app.get('/Api/v1/UserAccount/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.UserAccount.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.UserAccount.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});


/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
function AccountTypeFullCheck(UserAccountID,callback){//this is an application layer constraint
  AccountType(UserAccountID,function(response){
    let Data = response;
    let FlatenDataToArray = [Data.IsHeadOffice,Data.IsDistributor,Data.IsShop,Data.IsPlayer];//flatten to check for duplicates
    let TotalTrue = 0;//must only be 1 true to be valid else you have duplicates accross Shop,Player,Distributor,Headoffice you must never asign two ids in those tables
    for(let i=0;i<FlatenDataToArray.length;++i){//application layer checking account type
      if(FlatenDataToArray[i] == true){
        TotalTrue++;
      }
    } 
    console.log("Total True "+ TotalTrue);
    if(TotalTrue==1){//anything more is invalid
      let result = Data
      result.UnSafeDuplicate = false;
      result.FoundAccount = true;

      if(Data.IsHeadOffice){
        result.AccountType ="HeadOffice";
      }
      else if(Data.IsDistributor){
        result.AccountType ="Distributor";
      }
      else if(Data.IsShop){
        result.AccountType ="Shop";
      }
      else if(Data.IsPlayer){
        result.AccountType ="Player";
      }
      console.log(result);
      callback(result);

    }
    else if(TotalTrue==0){
      let Data = {UnSafeDuplicate:false,FoundAccount:false};
      console.log("ERROR TWO Accounts UserAccountID Should not Exist in Two OR More tables in SHOP HEADOFFICE DISTRIBUTOR PLAYER RESULT");
      callback(Data);
    }
    else if(TotalTrue>=2){
      let Data = {UnSafeDuplicate:true,FoundAccount:false};
      console.log("No User Account Found in SHOP HEADOFFICE DISTRIBUTOR PLAYER Table likely unregistered"+Data);
      callback(Data);
    }
  });
}




function GetParentRelationshipPlayerUserAccountID(UserAccountID,callback){//maybe a Heavy Operation but it is untested on large data
  let PlayerUserAccountID=undefined;//set by the PlayerUserAccountIDCheck

  //--this part are sequencially assigned
  //--we retrieve each id from its parent ID like a tree lookUp
  let ShopID=undefined;//set by the PlayerUserAccountIDCheck
  let ShopUserAccountID=undefined;//set by the ShopUserAccountIDFromShopIDCheck
  let DistributorID=undefined;//set by the ShopUserAccountIDFromShopIDCheck
  let DistributorUserAccountID = undefined;//Set by the DistrbutorFindUserAccountIDCheck
  let HeadOfficeID=undefined; //Set by the DistrbutorFindUserAccountIDCheck
  let HeadOfficeUserAccountID=undefined;// Set by the HeadOfficeFindUserAccountIDCheck
  
  async.series([PlayerUserAccountIDCheck,ShopFindUserAccountIDCheck,DistrbutorFindUserAccountIDCheck,HeadOfficeFindUserAccountIDCheck],function(error,response){
    if(HeadOfficeID!=undefined){
      if(HeadOfficeUserAccountID!=undefined){
        if(DistributorID!=undefined){
          if(DistributorUserAccountID!=undefined){
            if(ShopID!=undefined){
              if( ShopUserAccountID !=undefined){
                if(PlayerUserAccountID!=undefined){
                  callback({PlayerUserAccountID:PlayerUserAccountID,ShopUserAccountID:ShopUserAccountID,DistributorUserAccountID:DistributorUserAccountID,HeadOfficeUserAccountID:HeadOfficeUserAccountID});
                }else{
                  console.log("Failed PlayerUserAccountID");
                  callback(undefined);
                }
              }else{
                console.log("Failed ShopUserAccountID");
                callback(undefined);
              }
            }else{
              console.log("Failed ShopID ");
              callback(undefined);
            }
          }else{
            console.log("Failed DistributorUserAccountID");
            callback(undefined);
          }
        }else{
          console.log("Failed DistributorID");
          callback(undefined);
        }
      }else{
        console.log("Failed HeadOfficeUserAccountID");
        callback(undefined);
      }
    }else{
      console.log("Failed HeadOfficeID");
      callback(undefined);
    }
    
  });
  function PlayerUserAccountIDCheck(callback){
    Models.Player.sync();
    console.log("---PlayerUserAccountIDCheck---");
    let result = Models.Player.findAll({ 
      where: {
        UserAccountID:UserAccountID
    }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        ShopID = Data[0].ShopID;//used by ShopFindUserAccountIDCheck
        PlayerUserAccountID = Data[0].UserAccountID;
        console.log("ShopID "+ShopID);
        callback(null,Data);
        
      }else{
        PlayerUserAccountID= undefined;
        callback(null,'1');
      }
    
    }).catch(function(result) {
      console.log("Error "+result)
      callback(null,'1');
    });
  }
  function ShopFindUserAccountIDCheck(callback2){
    Models.Shop.sync();
    console.log("---ShopFindUserAccountIDCheck---");
    let result = Models.Shop.findAll({ 
      where: {
        ShopID:ShopID
    }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        DistributorID = Data[0].DistributorID;//used by DistrbutorFindUserAccountIDCheck
        ShopUserAccountID = Data[0].UserAccountID;
        console.log("DistributorID : "+DistributorID);
        console.log("ShopUserAccountID "+ShopUserAccountID)
        callback2(null,Data);
        
      }else{
        ShopUserAccountID= undefined;
        console.log("Shop Not Found ");
        callback2(null,'2');
      }
    
    }).catch(function(result) {
      console.log("Error "+result)
      callback2(null,'2');
    });
  }

  function DistrbutorFindUserAccountIDCheck(callback3){
    Models.Distributor.sync();
    console.log("---DistrbutorFindUserAccountIDCheck---");
    console.log("DistributorID : "+DistributorID);
    let result = Models.Distributor.findAll({ 
      where: {
        DistributorID:DistributorID
    }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        HeadOfficeID = Data[0].HeadOfficeID;//used by HeadOfficeFindUserAccountIDCheck
        DistributorUserAccountID = Data[0].UserAccountID;
        console.log("DistributorUserAccountID "+DistributorUserAccountID)
        callback3(null,Data);
        
      }else{
        DistributorUserAccountID= undefined;
        console.log("Distributor Not Found ");
        callback3(null,'3');
      }
    
    }).catch(function(result) {
      console.log("Error "+result)
      callback3(null,'3');
    });
  }
  function HeadOfficeFindUserAccountIDCheck(callback4){
    Models.HeadOffice.sync();
    console.log("---HeadOfficeFindUserAccountIDCheck---");
    console.log("HeadOfficeID : "+HeadOfficeID);
    let result = Models.HeadOffice.findAll({ 
      where: {
        HeadOfficeID:HeadOfficeID
    }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        HeadOfficeUserAccountID = Data[0].UserAccountID;
        console.log("HeadOfficeUserAccountID "+HeadOfficeUserAccountID)
        callback4(null,Data);
        
      }else{
        HeadOfficeUserAccountID= undefined;
        console.log("Distributor Not Found ");
        callback4(null,'4');
      }
    
    }).catch(function(result) {
      console.log("Error "+result)
      callback4(null,'4');
    });
  }
}



/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} ShopID
 * @param {*} ScreenName
 * @param {*} Name
 * @param {*} Surname
 * @param {*} CurrentRoomName
 * @param {*} callback
 */

//  ----------------------------------migrated
function AddPlayer(UserAccountID,ShopID,ScreenName,Name,Surname,CurrentRoomName,callback){
    //res.send('test');
    //Setting up the config
    let item1 = Models.Player.build({
      UserAccountID:UserAccountID,
      ShopID:ShopID,
      ScreenName:ScreenName,
      Name:Name,
      Surname:Surname,
      CurrentRoomName:CurrentRoomName
    });
    Models.Player.sync();//use force to clear/delete old table non production only
    item1.save()
    .then(Success => {
      
      console.log("----AddPlayer Start-----");
      console.log(Success);
      console.log("----AddPlayer End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting " +error);
      callback(undefined);
    });
    //res.send("Player "+UserAccountID+" "+ ShopID+" "+ScreenName);
}


/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
function PlayerUserAccountID(UserAccountID,callback){
  Models.Player.sync();
  let result = Models.Player.findAll({ 
    where: {
      UserAccountID:UserAccountID
   }
  }).then(function(result) {
    let Data = result.map(function(item) {
        return item;
    });
    if(Data.length>0){
      callback(Data);
    }else{
      callback(undefined);
    }
  
  }).catch(function(result) {
    console.log("Error "+result)
    callback(undefined);
  });
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} CurrentPoints
 * @param {*} callback
 */
function PlayerUpdatePoint(UserAccountID,CurrentPoints,callback){
  Models.Player.update({
    CurrentPoints: CurrentPoints
  },{
    where: {UserAccountID: UserAccountID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("Error Updating " +error);
    callback(undefined);
  });
}




/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} CurrentRoomName
 * @param {*} callback
 */
function PayerUpdateRoomName(UserAccountID,CurrentRoomName,callback){
  Models.Player.update({
    CurrentRoomName: CurrentRoomName
  },{
    where: {UserAccountID: UserAccountID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("Error Updating " +error);
    callback(undefined);
  });
}

function PlayerUpdate(PlayersID,UserAccountID,ShopID,ScreenName,Name,Surname,CurrentRoomName,callback){
  Models.Player.update({
    ShopID: ShopID,
    ScreenName: ScreenName,
    Name: Name,
    Surname: Surname,
    CurrentRoomName: CurrentRoomName
  },{
    where: {PlayersID: PlayersID,UserAccountID: UserAccountID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("Error Updating " +error);
    res.send(undefined);
  });
}

app.get('/Api/v1/Player/Clear', function (req, res){
  Models.Player.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/Player/Delete', function (req, res){
  
  Models.Player.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});

app.get('/Api/v1/Player/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.Player.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.Player.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
function UserInfoUserAccountID(UserAccountID,callback){
  Models.UserInfo.sync();
    let result = Models.UserInfo.findAll({ 
      where: {
        UserAccountID:UserAccountID
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });
      if(Data.length>0){
        callback(Data);
      }else{
        callback(undefined);
      }
    }).catch(function(result) {//catching any then errors
      console.log("Error "+result);
      callback(undefined);
    });
}



//---Player ROUTING START
//---Shop ROUTING START
app.get('/Api/v1/Shop/Validate/:UserAccountID/', function (req, res) {//check for validation only
  //Api/v1/Shop/Add/528861d4-3e49-4223-9b1a-913d72112112/1/Description/
  res.setHeader('Content-Type', 'application/json');
  let UserAccountID = req.params.UserAccountID;
  if(!isNullOrEmpty(UserAccountID)){
    isShopUserAccountIDExist(UserAccountID,function(response) {
      if(!isNullOrEmpty(response)&&response.length>0){
        res.send({isShop:true});
      }else{
        res.send({isShop:false});
      }
      
    });
  }else{
    res.send("Missing params");
  }
});

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} DistributorID
 * @param {*} Description
 * @param {*} callback
 */
function AddShop(UserAccountID,DistributorID,Description,callback){
  var item1 = Models.Shop.build({
    UserAccountID:UserAccountID,
    DistributorID:DistributorID,
    Description:Description
  });
  Models.Shop.sync({alter : true,/*force:true*/});//use force to recreate for non production only
  item1.save()
  .then(Success => {
    console.log("----AddShop Start-----");
    console.log(Success);
    console.log("----AddShop End-----");
    callback("Inserted");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting " +error);
    callback(undefined);
  });
}

app.get('/Api/v1/Shop/Clear', function (req, res){
  Models.Shop.destroy({
    where: {UserID:1},
    truncate: true
  }).then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/Shop/Delete', function (req, res){
  Models.Shop.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});

app.get('/Api/v1/Shop/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.Shop.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.Shop.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});
//---Shop ROUTING END
//---Distributor ROUTING START
app.get('/Api/v1/Distributor/Validate/:UserAccountID/', function (req, res) {//check for validation only
  let UserAccountID = req.params.UserAccountID;
  if(!isNullOrEmpty(UserAccountID)){
    isDistributorUserAccountIDExist(UserAccountID,function(response) {
      if(!isNullOrEmpty(response)&&response.length>0){
        res.send({isDistributer:true});
      }else{
        res.send({isDistributer:false});
      }
    });
  }else{
    res.send("Missing params");
  }
});

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} HeadOfficeID
 * @param {*} Name
 * @param {*} callback
 */
function AddDistributor(UserAccountID,HeadOfficeID,Name,callback){
  var item1 = Models.Distributor.build({
    UserAccountID:UserAccountID,
    HeadOfficeID:HeadOfficeID,
    Name:Name
  });
  Models.Distributor.sync({alter : true,/*force:true*/});//force removes rebuilds the table only for non production 
  item1.save()
  .then(Success => {
    
    console.log("----AddDistributor Start-----");
    console.log(Success);
    console.log("----AddDistributor End-----");
    callback("Inserted");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting " +error);
    callback(undefined);
    
  });
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} HeadOfficeID
 * @param {*} Name
 * @param {*} callback
 */
function DistributorUpdate(UserAccountID,HeadOfficeID,Name,callback){
  Models.Distributor.update({
    UserAccountID: UserAccountID,
    HeadOfficeID: HeadOfficeID,
    Name: Name
  },{
    where: {DistributorID: DistributorID }
  })
  .then(Success => {
    callback("Updated");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("Error Updating " +error);
    callback(undefined);
  });
}

app.get('/Api/v1/Distributor/Clear', function (req, res){
  Models.Distributor.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/Distributor/Delete', function (req, res){
  Models.Distributor.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});

app.get('/Api/v1/Distributor/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.Distributor.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.Distributor.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});
//---Distributor ROUTING END
//---HeadOffice ROUTING START
app.get('/Api/v1/HeadOffice/Validate/:UserAccountID/', function (req, res) {//check for validation only
  let UserAccountID = req.params.UserAccountID;
  if(!isNullOrEmpty(UserAccountID)){
    isHeadOfficeUserAccountIDExist(UserAccountID,function(response) {
      if(!isNullOrEmpty(response)&&response.length>0){
        res.send({isHeadOffice:true});
      }else{
        res.send({isHeadOffice:false});
      }
    });
  }else{
    res.send("Missing params");
  }
});


/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Name
 * @param {*} Description
 * @param {*} callback
 */

// -------------------------migrated
function AddHeadOffice(UserAccountID,Name,Description,callback){
  var item1 = Models.HeadOffice.build({
    UserAccountID:UserAccountID,
    Name:Name,
    Description:Description
  });
  Models.HeadOffice.sync({alter : true,/*force:true*/});//force true rebuilds table for non production only
  item1.save()
  .then(Success => {
  
    console.log("----AddHeadOffice Start-----");
    console.log(Success);
    console.log("----AddHeadOffice End-----");
    callback("Inserted");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting " +error);
    callback(undefined);
  });
}

app.get('/Api/v1/HeadOffice/Update/:HeadOfficeID/:UserAccountID/:Name/:Name/', function (req, res) {
  let HeadOfficeID = req.params.HeadOfficeID;
  let UserAccountID = req.params.UserAccountID;
  let Name = req.params.Name;

  if(!isNullOrEmpty(HeadOfficeID)){
    if(!isNullOrEmpty(UserAccountID)){
      if(!isNullOrEmpty(Name)){
        HeadOfficeUpdate(HeadOfficeID,UserAccountID,Name,function(response){
          if(response!=undefined){
            res.send(response);
          }else{
            res.send({HeadOfficeUpdateFailed:true});
          }
        });
      }else{
        res.send({NameMissing:true});
      }
    }else{
      res.send({UserAccountIDMissing:true});
    }
  }else{
    res.send({HeadOfficeIDMissing:true});
  }
});

/**
 *
 *
 * @param {*} HeadOfficeID
 * @param {*} UserAccountID
 * @param {*} Name
 * @param {*} callback
 */
function HeadOfficeUpdate(HeadOfficeID,UserAccountID,Name,callback){
  Models.HeadOffice.update({
    UserAccountID: UserAccountID,
    Name: Name
  },{
    where: {HeadOfficeID: HeadOfficeID }
  })
  .then(Success => {
    callback("Updated");
  })
  
  .catch(error => {
    // mhhh, wth!
    console.log("Error Updating " +error);
    callback(undefined);
  });
}

app.get('/Api/v1/HeadOffice/Clear', function (req, res){
  Models.HeadOffice.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/HeadOffice/Delete', function (req, res){
  Models.HeadOffice.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});

app.get('/Api/v1/HeadOffice/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  Models.HeadOffice.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    let result = Models.HeadOffice.findAll({ 
      where: {
        HeadOfficeID: {
          ne: null//not null
        }
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
     
      res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors

      res.send("Error "+result);
    });
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
 // res.send("HeadOffice "+Offset+" "+ Limit+" "+Sort);
});
app.get('/Api/v1/HeadOffice/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.HeadOffice.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.HeadOffice.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});


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





app.get('/WithdrawHistory',function (req, res) {
  let UserName = req.query.UserName;
  let Password = req.query.Password;

  let Amount = req.query.Amount;
  let Bank = req.query.Bank;
  let AccountNumber = req.query.AccountNumber;
  let Name =req.query.Name ;
  let ContactNumber= req.query.ContactNumber;
  let WithdrawPassword = req.query.WithdrawPassword;

  let isWithdrawAmountValid=false;
  let isUserAccountIDFound =false;

  //Not Done
  async.series([IsUserAccountIDExistCheck,ValidateAccountCheck,ValidateBalanceCheck

  ]);
  function IsUserAccountIDExistCheck(callback){
   callback(null,'1');
  }
  function ValidateAccountCheck(callback){
    callback(null,'2');
  }
  function ValidateBalanceCheck(callback){
    callback(null,'3');
  }
  /*
  async.waterfall([ValidateAccount,ValidateBalance],function(err,response){
    MyFinalFunction();
    
  });
  function ValidateAccount(callback){
    isUserNameExist(UserName,function(response){
      let obj = response;
      if(!isNullOrEmpty(obj)&&obj!=undefined){
        if(obj[0].UserName==UserName&&obj[0].Password==Password){
          let Data =  {IsInvalidAccount:false};
          callback(null,Data)
        }
      }else{
        let Data =  {IsInvalidAccount:true};
        callback(null,Data)
      }
    });
  }
  function ValidateBalance(arg0,callback){
    let IsInvalidAccount = arg0.IsInvalidAccount;
    console.log(arg0);
    if(!IsInvalidAccount){
      //Unconfigured
      
      res.send(arg0);
      callback(null,response);
    }else{
      res.send(arg0);
      callback(null,response);
    }
  }*/
 
/*
  function MyFinalFunction(){
    if(!isNullOrEmpty(Amount)&&Amount>0){
      if(!isNullOrEmpty(Bank)){
        if(!isNullOrEmpty(AccountNumber)){
          if(!isNullOrEmpty(Name)){
            if(!isNullOrEmpty(ContactNumber)){
              if(!isNullOrEmpty(WithdrawPassword)){
  
                
                let Data = {IsInvalidAmount:false,IsInvalidBankName:false,IsInvalidAccountNumber:false,IsInvalidName:false,IsInvalidContactNumber:false,IsInvalidWithdrawPassword:false,ResponseCode:1};
                res.send(Data);
              }else{
            
                let Data = {IsInvalidAmount:false,IsInvalidBankName:false,IsInvalidAccountNumber:false,IsInvalidName:false,IsInvalidContactNumber:false,IsInvalidWithdrawPassword:true,ResponseCode:1};
                res.send(Data);
              }
            }else{
              let Data = {IsInvalidAmount:false,IsInvalidBankName:false,IsInvalidAccountNumber:false,IsInvalidName:false,IsInvalidContactNumber:true,IsInvalidWithdrawPassword:false,ResponseCode:2};
              res.send(Data);
            }
          }else{
            let Data = {IsInvalidAmount:false,IsInvalidBankName:false,IsInvalidAccountNumber:false,IsInvalidName:true,IsInvalidContactNumber:false,IsInvalidWithdrawPassword:false,ResponseCode:3};
            res.send(Data);
          }
        }else{
          let Data = {IsInvalidAmount:false,IsInvalidBankName:false,IsInvalidAccountNumber:true,IsInvalidName:false,IsInvalidContactNumber:false,IsInvalidWithdrawPassword:false,ResponseCode:4};
          res.send(Data);
        }
      }else{
        let Data = {IsInvalidAmount:false,IsInvalidBankName:true,IsInvalidAccountNumber:false,IsInvalidName:false,IsInvalidContactNumber:false,IsInvalidWithdrawPassword:false,ResponseCode:5};
        res.send(Data);
      }
    }else{
      let Data = {IsInvalidAmount:true,IsInvalidBankName:false,IsInvalidAccountNumber:false,IsInvalidName:false,IsInvalidContactNumber:false,IsInvalidWithdrawPassword:false,ResponseCode:6};
      res.send(Data);
    }
  }*/
});


// listen (start app with node server.js) ======================================
app.listen(port, ip);
  console.log('Server running on http://%s:%s', ip, port);

module.exports = routes;
module.exports = app;
