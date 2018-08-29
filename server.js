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
});


// listen (start app with node server.js) ======================================
app.listen(port, ip);
  console.log('Server running on http://%s:%s', ip, port);

module.exports = routes;
module.exports = app;
