// server.js

// set up ========================
var express = require('express');
var Nexmo = require('nexmo');
var app = express(); // create our app w/ express
var async = require("async");
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
var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator');//email,mobile phone,isIP,isPostalCode,credit card

var moment = require('moment');

const Collection = require('linqjs');
const sendmail = require('sendmail')();

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
  var allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:8020', 'http://127.0.0.1:8080', 'http://127.0.0.1:9000', 'http://localhost:9000', 'http://localhost:8080'];
  var origin = req.headers.origin;
  res.header("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

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
function isEmailExist(Email,callback){
  Models.UserInfo.sync();
    let result = Models.UserInfo.findAll({ 
      where: {
        Email: Email//not null
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
      });

      callback(Data);
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      callback("Error "+result);
    });
}

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
      callback(Data);
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      callback("Error "+result);
    });
}
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

function isUserAccountVerifiedUserAccountID(UserAccountID,callback){
  Models.UserAccount.sync();
}


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
      callback(Data);
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      callback(result);
    });
}

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
      callback(Data);
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      callback(result);
    });
}

//-- Account TypeCheck Start
//isShop this part of the system is an application layer checking rather than 1 database call for all 3 checks

function AccountType(UserAccountID,callback){
  let Data = {IsHeadOffice:false,IsDistributor:false,IsShop:false,IsPlayer:false};
  async.series([CheckIsHeadOffice,CheckIsDistributor,CheckIsShop,CheckIsPlayer],function(error,response){
    callback(Data);
  });

  function CheckIsHeadOffice(callback1){
    isHeadOfficeUserAccountIDExist(UserAccountID,function(response){
      if(!isNullOrEmpty(response)&&response.length>0){
        Data.IsHeadOffice=true;
        callback1(null,1);
      }else{
        Data.IsHeadOffice=false;
        callback1(null,1);
      }
    });
  }
  function CheckIsDistributor(callback2){
    isDistributorUserAccountIDExist(UserAccountID,function(response){
      if(!isNullOrEmpty(response)&&response.length>0){
        Data.IsDistributor=true;
        callback2(null,2);
      }else{
        Data.IsDistributor=false;
        callback2(null,2);
      }
    });
  }
  function CheckIsShop(callback3){
    isShopUserAccountIDExist(UserAccountID,function(response){
      if(!isNullOrEmpty(response)&&response.length>0){
        Data.IsShop=true;
        callback3(null,3);
      }else{
        Data.IsShop=false;
        callback3(null,3);
      }
    });
  }
  function CheckIsPlayer(callback4){
    isPlayerUserAccountIDExist(UserAccountID,function(response){
      if(!isNullOrEmpty(response)&&response.length>0){
        Data.IsPlayer=true;
        callback4(null,4);
      }else{
        Data.IsPlayer=false;
        callback4(null,4);
      }
    });
  }
}
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


//--Account Type Check End


//** Returns Current Date String*/
function getCurrentDate(callback){
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth(); 
  let yyyy = today.getFullYear();
  let FormatedDate = yyyy+'/'+mm+'/'+dd;
  callback(FormatedDate);
}
//** Returns Current Time String*/
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
                    res.send("WeakPassword");
                  }
                }else{
                  res.send("InvalidEmail");
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
                isEmailExist(Email,function(response){
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
            res.send("Missing Email");
          }
        }else{
          res.send("Missing Surname");
        }
      }else{
        res.send("Missing Name");
      }
    }else{
      res.send("Missing Password");
    }
  }else{
    res.send("Missing UserName");
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
                      res.send("WeakPassword");
                    }
                  }else{
                    res.send("InvalidEmail");
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
                isEmailExist(Email,function(response){
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
              res.send("Missing DistributorID");
            }
          }else{
            res.send("Missing Email");
          }
        }else{
          res.send("Missing Surname");
        }
      }else{
        res.send("Missing Name");
      }
    }else{
      res.send("Missing Password");
    }
  }else{
    res.send("Missing UserName");
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
                        res.send("WeakPassword");
                      }
                  }else{
                    res.send("InvalidEmail");
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
                isEmailExist(Email,function(response){
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
              res.send("Missing DistributorID");
            }
          }else{
            res.send("Missing Email");
          }
        }else{
          res.send("Missing Surname");
        }
      }else{
        res.send("Missing Name");
      }
    }else{
      res.send("Missing Password");
    }
  }else{
    res.send("Missing UserName");
  }
});
app.get('/register',function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let UserName= req.query.UserName;
  let Password = req.query.Password;
  let Name = req.query.Name;
  let Surname = req.query.Surname;
  let Email= req.query.Email;
  let PhoneNumber= "";//this was never used
  let TelephoneNumber = "";//this was never used
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
            let UserAccountID=false;
            let isShopExist = false;
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
                            res.send({Done:"Done"});
                            let To = Email;
                            let From = '';
                            let Title = 'Email Verification';
                            let VerificationURL= 'http://nodejs-mongo-persistent-holdem1.4b63.pro-ap-southeast-2.openshiftapps.com/Verify?UserName='+UserName+'&VerifyKey='+UUIDKey;
                            SendMail(To,From,Title,VerificationURL);

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
                    res.send("WeakPassword");
                  }
                }else{
                  res.send("InvalidEmail");
                }
            }else{
              res.send("ShopID Not Found");
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
              isEmailExist(Email,function(response){
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
            res.send("Invalid ScreenName");
          }
          }else{
            res.send("Invalid Email");
          }
          
        }else{
          res.send("Invalid Surname");
        }
      }else{
        res.send("Invalid Name");
      }
    }else{
      res.send("Invalid Password");
    }
  }else{
    res.send("Invalid UserName");
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
                         ContactNumber:"",
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
        res.send("Invalid Password");
      }
    }else{
      res.send("Invalid UserName");
    }
  }else{
    res.send("Missing DeviceInformation");
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
app.get('/Api/v1/UserAccount/Update/UserAccountID/:UserAccountID/Verify/:Verify', function (req, res) {
  let UserAccountIDFound = false;
  let UserAccountID = req.params.UserAccountID;
  let Verify = req.params.Verify;
  async.waterfall([
    myFirstFunction
 ], function (err, result) {//final function
  if(UserAccountIDFound==true){
    VerifyAccountUserAccountID(UserAccountID,Verify,function(response){
      if(response!=undefined){
        res.send({});
      }
    });
  }else{
    res.send({UserAccountIDInvalid:true});
  }
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
      if(Data.length>0){
        UserAccountIDFound=true;
      }else{
        UserAccountIDFound=false;
      }
      callback2(null,Data);
    }).catch(function(result2){
      console.log("Verify Error : "+result2);
    //  console.log('2');
      callback2(null,result2);
    });
  }
});
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
function UserAccountUpdateLoginInformation(){

}

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
//---SupportTicket ROUTING START
app.get('/Api/v1/SupportTicket/Add/:UserAccountID/:Title/:Description/:Reason/:Time/:Date/:Status', function (req, res) {
  ///USAGE Api/v1/SupportTicket/Add/UserAccountID/Title/Description/Reason/01:57:17/2018-06-27/Status
  let UserAccountID = req.params.UserAccountID;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let Reason = req.params.Reason;
  let Time = req.params.Time;
  let Date = req.params.Date;
  let Status = req.params.Status;
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(Title)&&
  !isNullOrEmpty(Description)&&
  !isNullOrEmpty(Reason)&&
  !isNullOrEmpty(Time)&&
  !isNullOrEmpty(Date)&&
  !isNullOrEmpty(Status)){
    let UserAccountIDExist =false;
    async.series([UserAccountIDCheck],function(error,response){
      if(UserAccountIDExist==true){
        AddSupportTicket(UserAccountID,Title,Description,Reason,Time,Date,Status,function(response) {
          res.send(response);
        });
      }else{
        res.send({UserAccountIDExist:false});
      }
    });
    function UserAccountIDCheck(callback){
      isUserAccountIDExist(UserAccountID,function(response){
        let obj = response;
        if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].UserAccountID==UserAccountID){
          UserAccountIDExist = true;
          callback(null,'1');
        }else{
          UserAccountIDExist = false;
          callback(null,'1');
        }
      });
    }
  }
});
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
    callback("Inserted");
    console.log("----AddSupportTicket Start-----");
    console.log(Success);
    console.log("----AddSupportTicket End-----");
  })
  .catch(error => {
    console.log("error inserting");
    callback("error inserting " +error);
  });
}

app.get('/Api/v1/SupportTicket/Update/SupportTicketID/:SupportTicketID/UserAccountID/:UserAccountID/Title/:Title/Description/:Description/Reason/:Reason/Time/:Time/Date/:Date/Status/:Status', function (req, res) {
  // USAGE /Api/v1/SupportTicket/Update/SupportTicketID/1/UserAccountID/89a5b95d-8d5d-455b-8139-8e8317fdd392/Title/Title/Description/Description/Reason/Reason2/Time/12:34:56/Date/2009-05-31/Status/Status
  let SupportTicketID = req.params.SupportTicketID;
  let UserAccountID = req.params.UserAccountID;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let Reason = req.params.Reason;
  let Time = req.params.Time;
  let Date = req.params.Date;
  let Status = req.params.Status;
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(Title)&&
  !isNullOrEmpty(Description)&&
  !isNullOrEmpty(Reason)&&
  !isNullOrEmpty(Time)&&
  !isNullOrEmpty(Status)){
    let UserAccountIDExist = false;
    let SupportTicketIDExist =false;
    async.series([SupportTicketIDCheck,UserAccountIDCheck],function(error,response){
      if(UserAccountIDExist==true){
        if(SupportTicketIDExist==true){
          SupportTicketUpdate(SupportTicketID,UserAccountID,Title,Description,Reason,Time,Date,Status,function(response){
            if(!isNullOrEmpty(response)&&response!=undefined){
              res.send(response);
            }else{
              res.send({SupportTicketUpdateFailed:true});
            }
          });
        }else{
          res.send({SupportTicketIDExist:false});
        }
      }else{
        res.send({UserAccountIDExist:false});
      }
    });
    
    function SupportTicketIDCheck(callback){
      isSupportTicketIDExist(SupportTicketID,function(response){
        console.log('1');
        let obj = response;
        if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].SupportTicketID==SupportTicketID){
          SupportTicketIDExist = true;
          callback(null,'1');
        }else{
          SupportTicketIDExist = false;
          callback(null,'1');
        }
      });
    }

    function UserAccountIDCheck(callback2){
      isUserAccountIDExist(UserAccountID,function(response){
        console.log('2');
        let obj = response;
        if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].UserAccountID==UserAccountID){
          UserAccountIDExist = true;
          callback2(null,'2');
        }else{
          UserAccountIDExist = false;
          callback2(null,'2');
        }
      });
    }
  }
});

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
app.get('/Api/v1/SupportTicket/UserAccountID/:UserAccountID/Status/:Status', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let UserAccountID = req.params.UserAccountID;
  let Status = req.params.Status;
  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(Status)){
      SupportTicketUserAccountIDByStatus(UserAccountID,Status,function(response){
        if(response!=undefined){
          res.send(beautify(response, null, 2, 100));
        }else{
          res.send({SupportTicketUserAccountIDByStatusFailed:true});
        }
      });
    }else{
      res.send({InvalidStatusType:true});
    }
  }else{
    res.send({InvalidUserAccountID:true});
  }
});
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

  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(Title)&&
  !isNullOrEmpty(Description)&&
  !isNullOrEmpty(Reason)&&
  !isNullOrEmpty(Time)&&
  !isNullOrEmpty(Date)&&
  !isNullOrEmpty(Status)){
    AddSupportTicket(UserAccountID,Title,Description,Reason,Time,Date,Status,function(response) {
      res.send(response);
    });
  }else{
    let Data ={IsInvalidSupportTicket:false}
    res.send(Data);
  }
});
app.get('/UserAccount/SupportTicket', function (req, res) {
  // USAGE /UserAccount/SupportTicket?UserAccountID=bddbe7d1-d28b-4bb6-8b51-eb2d9252c9bb
  // USAGE /UserAccount/SupportTicket?UserAccountID=bddbe7d1-d28b-4bb6-8b51-eb2d9252c9bb&Status=Pending
  let UserAccountID =  req.query.UserAccountID;
  let Status =  req.query.Status;
  if(!isNullOrEmpty(UserAccountID)&&isNullOrEmpty(Status)){
    Models.SupportTicket.sync();
    let result = Models.SupportTicket.findAll({ 
      where: {
        UserAccountID: UserAccountID//not null
        
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
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(Status)){
    Models.SupportTicket.sync();
    let result = Models.SupportTicket.findAll({ 
      where: {
        UserAccountID: UserAccountID,
        Status:Status//not null
        
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
  else{
    let Data = {IsInvalidUserAccountID:true}
    res.send(Data);
  }
});
//---SupportTicket ROUTING END
//---Notification ROUTING START
app.get('/Api/v1/Notification/Add/:NotificationType/:Title/:Description/:Time/:Date', function (req, res) {
  let NotificationType = req.params.NotificationType;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let Time = req.params.Time;
  let Date = req.params.Date;
  //USAGE Api/v1/Notification/Add/NotificationType/Title/Description/01:57:17/2018-06-27

  if(!isNullOrEmpty(NotificationType)){
    if(!isNullOrEmpty(Title)){
      if(!isNullOrEmpty(Description)){
        if(!isNullOrEmpty(Time)){
          if(!isNullOrEmpty(Date)){
            AddNotification(NotificationType,Title,Description,Time,Date,function(response) {
              if(response!=undefined){
               res.send(response);
              }else{
                res.send({AddNotificationFailed:true});
              }
           });
          }else{
            res.send({DateMissing:true});
          }
        }else{
          res.send({TimeMissing:true});
        }
      }else{
        res.send({DescriptionMissing:true});
      }
    }else{
      res.send({TitleMissing:true});
    }
  }else{
    res.send({NotificationTypeMissing:true});
  }
});

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
    callback("Inserted");
    console.log("----AddNotification Start-----");
    console.log(Success);
    console.log("----AddNotification End-----");
  })
  
  .catch(error => {
 
    console.log("error inserting " +error);
    callback(undefined);
  });
}

app.get('/Api/v1/Notification/Update/NotificationID/:NotificationID/NotificationType/:NotificationType/Title/:Title/Description/:Description/Time/:Time/Date/:Date', function (req, res) {
  let NotificationID = req.params.NotificationID;
  let NotificationType = req.params.NotificationType;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let Time = req.params.Time;
  let Date = req.params.Date;
  if(!isNullOrEmpty(NotificationID)){
    if(!isNullOrEmpty(NotificationType)){
      if(!isNullOrEmpty(Title)){
        if(!isNullOrEmpty(Description)){
          if(!isNullOrEmpty(Time)){
            if(!isNullOrEmpty(Date)){
              let NotificationIDExist= undefined;
              async.series([IsNotificationIDExistCheck],function(error,response){
                if(NotificationIDExist==true){
                  if(response!=undefined){
                  
                   NotificationUpdate(NotificationID,NotificationType,Title,Description,Time,Date,function(response){
                      res.send(response);
                    });
                  }else{
                    res.send({NotificationUpdateFailed:true});
                  }
                }else{
                  res.send({NotificationIDExist:false});
                }
              });
              function IsNotificationIDExistCheck(callback){
               // console.log("IsNotificationIDExistCheck 1");
                IsNotificationIDExist(NotificationID,function(response){
                //  console.log("IsNotificationIDExistCheck 2");
                  if(response!=undefined){
                   // console.log("IsNotificationIDExistCheck 3");
                    if(response[0].NotificationID==NotificationID){
                      NotificationIDExist=true;
                      callback(null,'1');
                    }else{
                      NotificationIDExist=undefined;
                      callback(null,'1');
                    }
                 
                  }else{
                    NotificationIDExist=undefined;
                    callback(null,'1');
                  }
                });
              }

            }else{
              res.send({DateMissing:true});
            }
          }else{
            res.send({TimeMissing:true});
          }
        }else{
          res.send({DescriptionMissing:true});
        }
      }else{
        res.send({TitleMissing:true});
      }
    }else{
      res.send({NotificationTypeMissing:true});
    }
  }else{
    res.send({NotifiactionIDMissing:true});
  }
});

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
//---Notification ROUTING END
//---BlackList ROUTING START
app.get('/Api/v1/BlackList/Add/:UserAccountID/:Title/:Status/:Description/:ReportDate/:ReleaseDate/', function (req, res) {
  //USAGE /Api/v1/BlackList/Add/UserAccountID/Title/:Status/Description/2018-06-27/2018-06-27
  let UserAccountID = req.params.UserAccountID;
  let Title = req.params.Title;
  let Status = req.params.Status;
  let Description = req.params.Description;
  let ReportDate = req.params.ReportDate;
  let ReleaseDate = req.params.ReleaseDate;
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(Title)&&
  !isNullOrEmpty(Description)&&
  !isNullOrEmpty(ReportDate)&&
  !isNullOrEmpty(ReleaseDate)){
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
      res.send("Inserted");
    })
    .catch(error => {
      console.log("error inserting");
      res.send("error inserting " +error);
    });
  }
});
app.get('/Api/v1/BlackList/Update/BlackListID/:BlackListID/UserAccountID/:UserAccountID/Status/:Status/', function (req, res) {
  let BlackListID = req.params.BlackListID;
  let UserAccountID = req.params.UserAccountID;
  let Status = req.params.Status;//status to set
  if(!isNullOrEmpty(BlackListID)){
    if(!isNullOrEmpty(UserAccountID)){
        if(!isNullOrEmpty(Status)){
            let AccountStatus = undefined;//status retrived
            let UserAccountIDExist = false;
            let FoundBlackListID= undefined;//used to check if it matches the BlackListID params
            async.series([UserAccountIDCheck,IsAccountBlockedCheck],function(err,response){
                  if(FoundBlackListID == BlackListID){//it must match the id of the given params // for aditional validation besides UserAccountID
                    if(UserAccountIDExist==true){
                      if(Status=="Blocked"||Status=="Released"){
                        if(Status!=AccountStatus){
                          BlackListStatusUpdate(BlackListID,UserAccountID,Status,function(response){
                            console.log("Status Set");
                            if(response!=undefined){
                              res.send(response);
                            }else{
                              res.send({BlackListStatusUpdateFailed:true});
                            }
                          });
                        }else{
                          res.send({StatusAlready:AccountStatus});//Account Aleady Set To This status
                        }
                      }else{
                        res.send({InvalidStatusType:true});//Status is Invalid
                      }
                  }else{
                    res.send({UserAccountIDExist:UserAccountIDExist});//Exist in the UserAccount Table
                  }
                }else{
                  res.send({InvalidBlackListID:true});
                } 
        });

        function UserAccountIDCheck(callback){
          isUserAccountIDExist(UserAccountID,function(response){
            let obj = response;
            if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].UserAccountID==UserAccountID){
              UserAccountIDExist = true;
              callback(null,'1');
            }else{
              UserAccountIDExist = false;
              callback(null,'1');
            }
          });
        }
        function IsAccountBlockedCheck(callback){
          isUserAccountBlocked(UserAccountID,function(response){
            let obj = response;
            if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].UserAccountID==UserAccountID){
              console.log('IsAccountBlockedCheck');
              FoundBlackListID =obj[0].BlackListID;//matching Blacklist ID
              AccountStatus=obj[0].Status;
              callback(null,'1');
            }else{
              AccountStatus=undefined;
              callback(null,'1');
            }
          });
        }
      }else{
        res.send("Missing Status "+Status);
      }
    }else{
      res.send("Missing UserAccountID "+UserAccountID);
    }
  }else{
    res.send("Missing BlackListID "+BlackListID);
  }
});
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

app.get('/Api/v1/BlackList/Update/:BlackListID/:UserAccountID/:Status/:Title/:Description/:ReportDate/:ReleaseDate/', function (req, res) {
  let BlackListID = req.params.BlackListID;
  let UserAccountID = req.params.UserAccountID;
  let Status = req.params.Status;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let ReportDate = req.params.ReportDate;
  let ReleaseDate = req.params.ReleaseDate;
  if(!isNullOrEmpty(BlackListID)&&!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(Title)&&!isNullOrEmpty(Description)&&!isNullOrEmpty(ReportDate)&&!isNullOrEmpty(ReleaseDate)){
    
    
    BlackListUpdate(BlackListID,UserAccountID,Status,Title,Description,ReportDate,ReleaseDate,function(response){
      if(response!=undefined){
        res.send(response);
      }else{
        res.send({BlackListUpdateFailed:true});
      }
    });
  }

});


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
app.get('/Api/v1/BlackList', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){

    BlackListAll(function(response){
      res.send(beautify(response, null, 2, 100));
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
 // res.send("BlackList "+Offset+" "+ Limit+" "+Sort);
});
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
     
      callback(Data);
    }).catch(function(result) {//catching any then errors

      callback("Error "+result);
    });
}
//---BlackList ROUTING END
//---LoginHistory ROUTING START
app.get('/Api/v1/LoginHistory/Add/:UserAccountID/:IP/:DeviceName/:DeviceRam/:DeviceCpu/:Time/:Date', function (req, res) {
  //USAGE /Api/v1/LoginHistory/Add/UserAccountID/IP/DeviceName/DeviceRam/DeviceCpu/01:57:17/2018-06-27
  let UserAccountID = req.params.UserAccountID;
  let IP = req.params.IP;
  let DeviceName = req.params.DeviceName;
  let DeviceRam = req.params.DeviceRam;
  let DeviceCpu = req.params.DeviceCpu;
  let Time = req.params.Time;
  let Date = req.params.Date;
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(IP)&&
  !isNullOrEmpty(DeviceName)&&
  !isNullOrEmpty(DeviceRam)&&
  !isNullOrEmpty(DeviceCpu)&&
  !isNullOrEmpty(Time)&&
  !isNullOrEmpty(Date)){
    AddLoginHistory(UserAccountID,IP,DeviceName,DeviceRam,DeviceCpu,Time,Date,function(response){
      res.send(response);
    });
  }
});

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
    callback();
  });
}

app.get('/Api/v1/LoginHistory/Update/:LoginHistoryID/:UserAccountID/:IP/:DeviceName/:DeviceRam/:DeviceCpu/:Time/:Date',function(req,res){
  let LoginHistoryID = req.params.LoginHistoryID;
  let UserAccountID = req.params.UserAccountID;
  let IP = req.params.IP;
  let DeviceName = req.params.DeviceName;
  let DeviceRam = req.params.DeviceRam;
  let DeviceCpu = req.params.DeviceCpu;
  let Time = req.params.Time;
  let Date = req.params.Date;
  if(!isNullOrEmpty(LoginHistoryID)&&
  !isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(IP)&&
  !isNullOrEmpty(DeviceName)&&
  !isNullOrEmpty(DeviceRam)&&
  !isNullOrEmpty(DeviceCpu)&&
  !isNullOrEmpty(Time)&&
  !isNullOrEmpty(Date)){
    Models.LoginHistory.update({
      UserAccountID: UserAccountID,
      IP: IP,
      DeviceName: DeviceName,
      DeviceRam: DeviceRam,
      DeviceCpu: DeviceCpu,
      Time: Time,
      Date: Date
    },{
      where: {LoginHistoryID: LoginHistoryID }
    })
    .then(Success => {
      res.send("Updated");
    })
    
    .catch(error => {
     
      console.log("Error Updating");
      res.send("Error Updating " +error);
    }); 
  }
});
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
app.get('/Api/v1/LoginHistory', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
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
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(BankName)&&
  !isNullOrEmpty(SecurityCode)&&
  !isNullOrEmpty(Valid)&&
  !isNullOrEmpty(Expiration)&&
  !isNullOrEmpty(Time)&&
  !isNullOrEmpty(Date)){
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
      res.send("Inserted");
    })
    
    .catch(error => {
   
      console.log("error inserting");
      res.send("error inserting " +error);
    });
  }else{
    res.send("Missing params");
  }
});
app.get('/Api/v1/BankInformation/Update/:BankInformationID/:UserAccountID/:BankName/:SecurityCode/:Expiration/:Time/:Date', function(req,res){
  let BankInformationID = req.params.BankInformationID;
  let UserAccountID = req.params.UserAccountID;
  let BankName = req.params.BankName;
  let SecurityCode = req.params.SecurityCode;
  let Expiration = req.params.Expiration;
  let Time = req.params.Time;
  let Date = req.params.Date;
  if(!isNullOrEmpty(BankInformationID)&&
  !isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(BankName)&&
  !isNullOrEmpty(SecurityCode)&&
  !isNullOrEmpty(Expiration)&&
  !isNullOrEmpty(Time)&&
  !isNullOrEmpty(Date)){
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
      res.send("Updated");
    })
    
    .catch(error => {
     
      console.log("Error Updating");
      res.send("Error Updating " +error);
    }); 
  }
});
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
app.get('/Api/v1/BankInformation', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
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
//---BankInformation ROUTING END
//---WithdrawHistory ROUTING START
app.get('/Api/v1/WithdrawHistory/Add/UserAccountID/:UserAccountID/Amount/:Amount/BankNameUsed/:BankNameUsed/SecurityCodeUsed/:SecurityCodeUsed/Status/:Status/RequestedDATE/:RequestedDATE/ApprovedDATE/:ApprovedDATE/RejectedDATE/:RejectedDATE/ProcessingDATE/:ProcessingDATE/RequestedTIME/:RequestedTIME/ApprovedTIME/:ApprovedTIME/RejectedTIME/:RejectedTIME/ProcessingTIME/:ProcessingTIME', function (req, res) {
  // USAGE /Api/v1/WithdrawHistory/Add/UserAccountID/6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6/Amount/0/BankNameUsed/BankNameUsed/SecurityCodeUsed/1234/Status/Processing/RequestedDATE/2010-06-27/ApprovedDATE/2018-06-27/RejectedDATE/2018-06-27/ProcessingDATE/2018-06-27/RequestedTIME/01:57:17/ApprovedTIME/01:57:17/RejectedTIME/01:57:17/ProcessingTIME/01:57:17
  let UserAccountID = req.params.UserAccountID;
  let Amount = req.params.Amount;
  let BankNameUsed = req.params.BankNameUsed;
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
        if(!isNullOrEmpty(Status)){
            let RequestedDATEParsed= moment(RequestedDATE, "YYYY-MM-DD");
            let  isValidRequestedDATEParsed = RequestedDATEParsed.isValid();
          if(!isNullOrEmpty(RequestedDATE)&&isValidRequestedDATEParsed==true&&RequestedDATEParsed.year()>1959){
              let ApprovedDATEParsed= moment(ApprovedDATE, "YYYY-MM-DD");
              let  isValidApprovedDATEParsed = ApprovedDATEParsed.isValid();
            if(!isNullOrEmpty(ApprovedDATE)&&isValidApprovedDATEParsed==true&&ApprovedDATEParsed.year()>1959){
                let RejectedDATEParsed=moment(RejectedDATE, "YYYY-MM-DD");
                let isValidRejectedDATEParsed = RejectedDATEParsed.isValid();
              if(!isNullOrEmpty(RejectedDATE)&&isValidRejectedDATEParsed==true&&RejectedDATEParsed.year()>1959){
                  let ProcessingDATEParsed= moment(ProcessingDATE, "YYYY-MM-DD");
                  let isValidProcessingDATEParsed = ProcessingDATEParsed.isValid();
                if(!isNullOrEmpty(ProcessingDATE)&&isValidProcessingDATEParsed==true&&ProcessingDATEParsed.year()>1959){
                  if(!isNullOrEmpty(RequestedTIME)){
                    if( !isNullOrEmpty(ApprovedTIME)){
                      if( !isNullOrEmpty(RejectedTIME)){
                        if(!isNullOrEmpty(ProcessingTIME)){
                          let isUserAccountIDFound= false;
                          if(validator.isNumeric(Amount)){
                            if(Status=="Approved"||Status=="Processing"||Status=="Rejected"){
                                async.series([UserAccountIDCheck],function(error,response){
                                  if(isUserAccountIDFound==true){
                                    res.send({Success:true});
                                   WithdrawHistory(UserAccountID,Amount,BankNameUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,RejectedTIME,ProcessingTIME,function(response) {
                                      res.send(response);
                                    });
                                  }else{
                                    res.send({UserAccountIDFound:false});
                                  }
                                });
                                function UserAccountIDCheck(callback){
                                  isUserAccountIDExist(UserAccountID,function(response){
                                    let obj = response;
                                    if(obj!=undefined){
                                      isUserAccountIDFound = true;
                                      callback(null,'1');
                                    }else{
                                      isUserAccountIDFound = false;
                                      callback(null,'1');
                                    }
                                  });
                                }
                            }else{
                              res.send({StatusInvalidValue:true});
                            }
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
                  res.send({ProcessingDATEInvalid:true});
                }
              }else{
                res.send({RejectedDATEInvalid:true});
              }
            }else{
              res.send({ApprovedDATEInvalid:true});
            }
          }else{
            res.send({RequestedDATEInvalid:true});
          }
        }else{
          res.send({StatusMissing:true});
        }
      }else{
        res.send({BankNameUsedMissing:true});
      }
    }else{
      res.send({AmountMissing:true});
    }
  }else{
    res.send({UserAccountIDMissing:true});
  }
});
function WithdrawHistory(UserAccountID,Amount,BankNameUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,RejectedTIME,ProcessingTIME,callback){
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
    Models.WithdrawHistory.sync({alter : true});
    item1.save()
    .then(Success => {
      callback("Inserted");
    })
    
    .catch(error => {
  
      console.log("error inserting " +error);
      callback(undefined);
    });
}
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
  let ApprovedTIME = req.params.ApprovedTIME;
  let RejectedTIME = req.params.RejectedTIME;
  let ProcessingTIME = req.params.ProcessingTIME;
  if(isNullOrEmpty(WithdrawHistoryID)&&
  isNullOrEmpty(UserAccountID)&&
  isNullOrEmpty(Amount)&&
  isNullOrEmpty(BankNameUsed)&&
  isNullOrEmpty(SecurityCodeUsed)&&
  isNullOrEmpty(Status)&&
  isNullOrEmpty(RequestedDATE)&&
  isNullOrEmpty(ApprovedDATE)&&
  isNullOrEmpty(RejectedDATE)&&
  isNullOrEmpty(ProcessingDATE)&&
  isNullOrEmpty(RequestedTIME)&&
  !isNullOrEmpty(ApprovedTIME)&&
  isNullOrEmpty(RejectedTIME)&&
  isNullOrEmpty(ProcessingTIME)){
    Models.WithdrawHistory.update({
      UserAccountID: UserAccountID,
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
      where: {WithdrawHistoryID: WithdrawHistoryID }
    })
    .then(Success => {
      res.send("Updated");
    })
    
    .catch(error => {
     
      console.log("Error Updating");
      res.send("Error Updating " +error);
    });
  }
});
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
app.get('/Api/v1/WithdrawHistory', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;

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

app.get('/Api/v1/DepositHistory/UserAccount/UserAccountID/:UserAccountID/Status/:Status/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let UserAccountID = req.params.UserAccountID;
  let Status = req.params.Status;
  DepositHistoryUserAccountIDStatus(UserAccountID,Status,function(response){
    if(response!=undefined){
      res.send(beautify(response, null, 2, 100));
    }else{
      res.send({});
    }
  });
});

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
    callback("Inserted");
    console.log("----AddDepositHistory End-----");
  })
  
  .catch(error => {
   
    console.log("error inserting " +error);
    callback(undefined);
  });
}
app.get('/Api/v1/DepositHistory/Update/:DepositHistoryID/:BankHistoryID/:UserAccountID/:Amount/:BankNameUsed/:SecurityCodeUsed/:Status/:RequestedDATE/:ApprovedDATE/:RejectedDATE/:ProcessingDATE/:RequestedTIME/:ApprovedTIME/:RejectedTIME/:ProcessingTIME', function (req, res) {
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
  let ApprovedTIME = req.params.ApprovedTIME;
  let RejectedTIME = req.params.RejectedTIME;
  let ProcessingTIME = req.params.ProcessingTIME;
  if(!isNullOrEmpty(DepositHistoryID)&&
     !isNullOrEmpty(UserAccountID)&&
     !isNullOrEmpty(Amount)&&
     !isNullOrEmpty(BankNameUsed)&&
     !isNullOrEmpty(SecurityCodeUsed)&&
     !isNullOrEmpty(SecurityCodeUsed)&&
     !isNullOrEmpty(Status)&&
     !isNullOrEmpty(RequestedDATE)&&
     !isNullOrEmpty(ApprovedDATE)&&
     !isNullOrEmpty(RejectedDATE)&&
     !isNullOrEmpty(ProcessingDATE)&&
     !isNullOrEmpty(RequestedTIME)&&
     !isNullOrEmpty(ApprovedTIME)&&
     !isNullOrEmpty(RejectedTIME)&&
     !isNullOrEmpty(ProcessingTIME)){
      Models.DepositHistory.update({
        UserAccountID: UserAccountID,
        Amount: Amount,
        BankNameUsed: BankNameUsed,
        SecurityCodeUsed: SecurityCodeUsed,
        Status: Status,
        RequestedDATE: RequestedDATE,
        ApprovedDATE: ApprovedDATE,
        RejectedDATE: RejectedDATE,
        ProcessingDATE: ProcessingDATE,
        RequestedTIME: RequestedTIME,
        ApprovedTIME: ApprovedTIME,
        RejectedTIME: RejectedTIME,
        ProcessingTIME: ProcessingTIME,
      },{
        where: {DepositHistoryID:DepositHistoryID }
      })
      .then(Success => {
        res.send("Updated");
      })
      
      .catch(error => {
      
        console.log("Error Updating");
        res.send("Error Updating " +error);
      });  
     }
});
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
app.get('/Api/v1/DepositHistory', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    Models.DepositHistory.sync();
    let result = Models.DepositHistory.findAll({ 
      where: {
        DepositHistoryID: {
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
  //res.send("DepositHistory "+Offset+" "+ Limit+" "+Sort);
});
//---DepositHistory ROUTING END

//---RoomConfiguration ROUTING START
app.get('/Api/v1/RoomConfiguration/Add/RoomID/:RoomID/SmallBlind/:SmallBlind/BigBlind/:BigBlind/Speed/:Speed', function (req, res) {
  //USAGE /Api/v1/RoomConfiguration/Add/RoomID/qwertyui/SmallBlind/0/BigBlind/0/Speed/0
  let RoomID = req.params.RoomID;
  let SmallBlind = req.params.SmallBlind;
  let BigBlind = req.params.BigBlind;
  let Speed = req.params.Speed;
  if(!isNullOrEmpty(RoomID)){
    if( !isNullOrEmpty(SmallBlind)){
      if( !isNullOrEmpty(BigBlind)){
        if(!isNullOrEmpty(Speed)){
          if(validator.isNumeric(SmallBlind)){
            if(validator.isNumeric(BigBlind)){
              if(validator.isNumeric(Speed)){

                let IsRoomIDFound =false;//false is the result we want
                async.series([IsRoomIDExistCheck],function(error,response){
                  if(IsRoomIDFound==false){//must be false to be valid
                   /* AddRoomConfiguration(RoomID,SmallBlind,BigBlind,Speed,function(response){
                     res.send(response);
                    });*/
                    res.send({Success:true});
                  }else{
                    res.send({RoomIDAlreadyExist:true});
                  }
                  
                });
                function IsRoomIDExistCheck(callback2){
                  IsRoomIDExist(RoomID,function(response2){
                    if(response2!=undefined){
                      IsRoomIDFound=true;
                      callback2(null,'1');
                    }else{
                      IsRoomIDFound= false;
                      callback2(null,'1');
                    }
                  });
                }

              }else{
                res.send({SppedInvalidValue:true});
              }
            }else{
              res.send({BigBlindInvalidValue:true});
            }
          }else{
            res.send({SmallBlindInvalidValue:true});
          }
        }else{
          res.send({SpeedMissing:true});
        }
      }else{
        res.send({BigBlindMissing:true});
      }
    }else{
      res.send({SmallBlindMissing:true});
    }
  }else{
    res.send({RoomIDMissing:true});
  }
});

function AddRoomConfiguration(RoomID,SmallBlind,BigBlind,Speed,callback){
  var item1 = Models.RoomConfiguration.build({
    RoomID:RoomID,
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
   
    console.log("error inserting");
    callback("error inserting " +error);
  });
}

function IsRoomIDExist(RoomID,callback){
  Models.RoomConfiguration.sync();
  let result = Models.RoomConfiguration.findAll({ 
    where: {
      RoomID:RoomID
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
app.get('/Api/v1/RoomConfiguration/Update/RoomID/:RoomID/SmallBlind/:SmallBlind/BigBlind/:BigBlind/',function(req,res){
  let RoomID = req.params.RoomID;
  let SmallBlind = req.params.SmallBlind;
  let BigBlind = req.params.BigBlind;
  if(!isNullOrEmpty(RoomID)){
    if(!isNullOrEmpty(SmallBlind)){
      if(!isNullOrEmpty(BigBlind)){
        let IsRoomIDFound = false;// for the update RoomID Must Exist
        async.series([IsRoomIDExistCheck],function(error,response){
          RoomConfigurationRoomIDUpdateSmallBigBlind(RoomID,SmallBlind,BigBlind,function(response){
            if(IsRoomIDFound==true){
              res.send(response);
            }else{
              res.send({});
            }
          });
        });

        function IsRoomIDExistCheck(callback){
          IsRoomIDExist(RoomID,function(response){
            if(response!=undefined){
              IsRoomIDFound=true;
              callback(null,'1');
            }else{
              IsRoomIDFound =false;
              callback(null,'1');
            }
          }); 
        }
      }else{
        res.send({BigBlindMissing:true});
      }
    }else{
      res.send({SmallBlindMissing:true});
    }
  }else{
    res.send({RoomIDMissing:true});
  }
});

function RoomConfigurationRoomIDUpdateSmallBigBlind(RoomID,SmallBlind,BigBlind,callback){
  Models.RoomConfiguration.sync(/*{force:true}*/);
  Models.RoomConfiguration.update({
    SmallBlind:SmallBlind,
    BigBlind:BigBlind
  },{
    where: {RoomID: RoomID }
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

app.get('/Api/v1/RoomConfiguration/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    RoomConfiguration(function(response){
      if(response!=undefined){
        res.send(beautify(response, null, 2, 100));
      }else{
        res.send({});
      }
    });
  }
});
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
      sequelize.queryInterface.removeConstraint('GameHistory', 'RoomID');
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

//---GameHistory ROUTING START
app.get('/Api/v1/GameHistory/Add/UserAccountID/:UserAccountID/RoomID/:RoomID/RoundID/:RoundID/Rank/:Rank/Score/:Score/Card/:Card/Time/:Time/Date/:Date/BeforePoints/:BeforePoints/AfterPoints/:AfterPoints/', function (req, res) {
  //USAGE /Api/v1/GameHistory/Add/UserAccountID/6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6/RoomID/qwertyui/RoundID/someRound/Rank/STRAIGHT/Score/1608/Card/["6D","5S","4C","3H","2D"]/Time/01:57:17/Date/2018-06-27/BeforePoints/0/AfterPoints/0/
  res.setHeader('Content-Type', 'application/json');
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

  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(RoundID)){
      if(!isNullOrEmpty(RoomID)){
        if( !isNullOrEmpty(Rank)){
          if(!isNullOrEmpty(Score)){
            if(!isNullOrEmpty(Card)){
              if(!isNullOrEmpty(Time)){
                if(!isNullOrEmpty(Date)){
                  if(!isNullOrEmpty(BeforePoints)){
                    if(!isNullOrEmpty(AfterPoints)){
                      if(validator.isNumeric(BeforePoints)){
                        if(validator.isNumeric(AfterPoints)){
                          if(validator.isNumeric(Score)){
                            let countedCards =  Card.split(",");//card counting validate that we have 5 cards
                            let countedStringLength = Card.length;//Must be 14 including commas in count
                            if(countedCards.length==5&&countedStringLength==14){
                              if(Rank=="HIGH_CARD"||
                              Rank=="ONE_PAIR"||
                              Rank=="TWO_PAIRS"||
                              Rank=="THREE_OF_A_KIND"||
                              Rank=="STRAIGHT"||
                              Rank=="FLUSH"||
                              Rank=="FULL_HOUSE"||
                              Rank=="FOUR_OF_A_KIND"||
                              Rank=="STRAIGHT_FLUSH"||
                              Rank=="ROYAL_FLUSH"){
                                  let isUserAccountIDExistFound = false;
                                  let isRoomIDFound =false;
                                  async.series([IsUserAccountIDExistCheck,IsRoomIDExistCheck],function(error,response){
                                 
                                    if(isUserAccountIDExistFound==true){
                                      if(isRoomIDFound==true){
                                        AddGameHistory(UserAccountID,RoundID,RoomID,Rank,Score,Card,Time,Date,BeforePoints,AfterPoints,function(response){
                                          res.send(response);
                                        });
                                      }else{
                                        res.send({RoomIDInvalid:false});
                                      }                           
                                    }else{
                                      res.send({UserAccountIDInvalid:false});
                                    }
                                });
                                function IsUserAccountIDExistCheck(callback){
                                  isUserAccountIDExist(UserAccountID,function(response){
                                    if(response!=undefined){
                                      isUserAccountIDExistFound=true;
                                      callback(null,'1');
                                    }else{
                                      isUserAccountIDExistFound=false;
                                      callback(null,'1');
                                    }
                                  });
                                }
                                function IsRoomIDExistCheck(callback){
                                  IsRoomIDExist(RoomID,function(response){
                                    if(response!=undefined){
                                      isRoomIDFound=true;
                                      callback(null,'2');
                                    }else{
                                      isRoomIDFound=false;
                                      callback(null,'2');
                                    }
                                  });
                                }
                              }else{
                                res.send({CardInvalid:true});
                              }
    
                            }else{
                              res.send({RequiresCards:5});
                            }
                          }else{
                            res.send({ScoreInvalidValue:true});
                          }
                        }else{
                         res.send({AfterPointsInvalidValue:true}); 
                        }
                      }else{
                        res.send({BeforePointsInvalidValue:true}); 
                      }
                      
                      
                      

                    }else{
                      res.send({AfterPoints:true});
                    }
                  }else{
                    res.send({BeforePoints:true});
                  }
                }else{
                  res.send({DateMissing:true});
                }
              }else{
                res.send({TimeMissing:true});
              }
            }else{
              res.send({CardMissing:true});
            }
          }else{
            res.send({ScoreMissing:true});
          }
        }else{
          res.send({RankMissing:true});
        }
      }else{
        res.send({RoomIDMissing:true});
      }
    }else{
      res.send({RoundIDMissing:true});
    }
  }else{
    res.send({UserAccountIDMissing:true});
  }
/*
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(RoundID)&&
  !isNullOrEmpty(RoomID)&&
  !isNullOrEmpty(Rank)&&
  !isNullOrEmpty(Score)&&
  !isNullOrEmpty(Card)&&
  !isNullOrEmpty(Time)&&
  !isNullOrEmpty(Date)&&
  !isNullOrEmpty(BeforePoints)&&
  !isNullOrEmpty(AfterPoints)){
 
  }*/
});
function AddGameHistory(UserAccountID,RoundID,RoomID,Rank,Score,Card,Time,Date,BeforePoints,AfterPoints,callback){
  Models.GameHistory.sync();
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
  Models.GameHistory.sync();//use force to delete old table non production
  item1.save()
  .then(Success => {
    callback("Inserted");
  })
  
  .catch(error => {
   
    console.log("error inserting");
    callback("error inserting " +error);
  });
}

app.get('/Api/v1/GameHistory/Update/GameHistoryID/:GameHistoryID/UserAccountID/:UserAccountID/RoundID/:RoundID/RoomID/:RoomID/Rank/:Rank/Score/:Score/Card/:Card/Time/:Time/Date/:Date/BeforePoints/:BeforePoints/AfterPoints/:AfterPoints/', function(req,res) {
 
  let GameHistoryID = req.params.GameHistoryID;
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

  if(!isNullOrEmpty(GameHistoryID)){
    if(!isNullOrEmpty(UserAccountID)){
      if(!isNullOrEmpty(RoomID)){
        if(!isNullOrEmpty(RoundID)){
          if(!isNullOrEmpty(Rank)){
            if(!isNullOrEmpty(Score)){
              if(!isNullOrEmpty(Card)){
                if(!isNullOrEmpty(Time)){
                  if(!isNullOrEmpty(Date)){
                    if(!isNullOrEmpty(BeforePoints)){
                      if(!isNullOrEmpty(AfterPoints)){
                        let isUserAccountIDFound = undefined;
                        async.series([IsUserAccountIDExistCheck,IsGameHistoryIDExistCheck],function(error,response){


                          if(isUserAccountIDFound==true){
                            res.send({Success:true});
                          }else{
                            res.send({Success:false});
                          }



                        });
                        function IsUserAccountIDExistCheck(callback){
                          isUserAccountIDExist(UserAccountID,function(response){
                            if(response!=undefined){
                              isUserAccountIDFound=true;
                              callback(null,'1');
                            }else{
                              isUserAccountIDFound =false;
                              callback(null,'1');
                            }
                           
                          });
                        }
                        function IsGameHistoryIDExistCheck(callback){
                          callback(null,'2');
                        }
                     


                        res.send({success:true});
                      }else{
                        res.send({AfterPointsMissing:true});
                      }
                    }else{
                      res.send({BeforePointsMissing:true});
                    }
                  }else{
                    res.send({DateMissing:true});
                  }
                }else{
                  res.send({TimeMissing:true});
                }
              }else{
                res.send({CardMissing:true});
              }
            }else{
              res.send({ScoreMissing:true});
            }
          }else{
            res.send({RankMissing:true});
          }
        }else{
          res.send({RoundIDMissing:true});
        }
      }else{
        
      }
    }else{
      res.send({UserAccountIDMissing:true});
    }
  }else{
    res.send({GameHistoryIDMissing:true});
  }

/*
  if(!isNullOrEmpty(GameHistoryID)&&
  !isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(RoundID)&&
  !isNullOrEmpty(RoomID)&&
  !isNullOrEmpty(Rank)&&
  !isNullOrEmpty(Score)&&
  !isNullOrEmpty(Card)&&
  !isNullOrEmpty(Time)&&
  !isNullOrEmpty(Date)&&
  !isNullOrEmpty(BeforePoints)&&
  !isNullOrEmpty(AfterPoints)){
    Models.GameHistory.update({
      UserAccountID: UserAccountID,
      RoundID: RoundID,
      RoomID: RoomID,
      Rank: Rank,
      Score: Score,
      Card: Card,
      Time: Time,
      Date: Date,
      BeforePoints: BeforePoints,
      AfterPoints: AfterPoints
    },{
      where: {GameHistoryID: GameHistoryID }
    })
    .then(Success => {
      res.send("Updated");
    })
    
    .catch(error => {
   
      console.log("Error Updating");
      res.send("Error Updating " +error);
    });
  }*/
});
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
app.get('/Api/v1/GameHistory', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    GameHistory(function(response){
      if(response!=undefined){
        res.send(res.send(beautify(response, null, 2, 100)));
      }else{
        res.send([]);
      }
     
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
  //res.send("GameHistory "+Offset+" "+ Limit+" "+Sort);
});
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
//---UserInfo ROUTING START
app.get('/Api/v1/UserInfo/Add/:UserAccountID/:Email/:PhoneNumber/:TelephoneNumber/', function (req, res) {
  //USAGE /Api/v1/UserInfo/Add/UserAccountID/Email/PhoneNumber/TelephoneNumber

  //Tests for foreignKey should result in  foreign key constraint fails Error
  // /Api/v1/UserInfo/Add/5879999/Email14535432/PhoneNumber/TelephoneNumber

  let UserAccountID = req.params.UserAccountID;
  let Email = req.params.Email;
  let PhoneNumber = req.params.PhoneNumber;
  let TelephoneNumber = req.params.TelephoneNumber;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(Email)&&!isNullOrEmpty(PhoneNumber)&&!isNullOrEmpty(TelephoneNumber)){
     AddUserInfo(UserAccountID,Email,PhoneNumber,TelephoneNumber,function(response) {
      res.send(response);
    });
  }
});
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
    
      console.log("error inserting");
      callback("error inserting " +error);
    });
}
app.get('/Api/v1/UserInfo/Update/UserAccountID/:UserAccountID/Email/:Email/PhoneNumber/:PhoneNumber/TelephoneNumber/:TelephoneNumber', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Email = req.params.Email;
  let PhoneNumber = req.params.PhoneNumber;
  let TelephoneNumber = req.params.TelephoneNumber;
  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(Email)){
      if(!isNullOrEmpty(PhoneNumber)){
        if(!isNullOrEmpty(TelephoneNumber)){
          let UserAccountIDExist=false;
          async.series([UserAccountIDCheck],function(error,response){
            if(UserAccountIDExist==true){
              UserInfoUpdate(UserAccountID,Email,PhoneNumber,TelephoneNumber,function(response){
                if(!isNullOrEmpty(response)&&response!=undefined){
                  res.send(response);
                }else{
                  res.send({UserInfoUpdateFailed:true});
                  }
              });
            }else{
              res.send({UserAccountIDExist:false});
            }
          });
          function UserAccountIDCheck(callback){
            isUserAccountIDExist(UserAccountID,function(response){
              let obj = response;
              if(!isNullOrEmpty(obj)&&obj!=undefined&&obj[0].UserAccountID==UserAccountID){
                UserAccountIDExist = true;
                callback(null,'1');
              }else{
                UserAccountIDExist = false;
                callback(null,'1');
              }
            });
          }

        }else{
          res.send({TelephoneNumberExist:false});
        }
      }else{
        res.send({PhoneNumberExist:false});
      }
    }else{
      res.send({EmailExist:false});
    }
  }else{
    res.send({UserAccountIDExist:false});
  }
});


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
app.get('/Api/v1/UserInfo', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    Models.UserInfo.sync();
    let result = Models.UserInfo.findAll({ 
      where: {
        UserInfoID: {
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

//---UserInfo ROUTING END
//---AccessControl ROUTING START
app.get('/Api/v1/AccessControl/Add/:AccessID/:AccessName/:AccessTags', function (req, res) {
  let AccessID = req.params.AccessID;
  let AccessName = req.params.AccessName;
  let AccessTags = req.params.AccessTags;
  if(!isNullOrEmpty(AccessID)&&!isNullOrEmpty(AccessName)&&!isNullOrEmpty(AccessTags)){
    //Setting up the config
    AccessControl(AccessID,AccessName,AccessTags,function(response) {
      res.send(response);
    });
  }
});
function AccessControl(AccessID,AccessName,AccessTags,callback){
  var item1 = Models.AccessControl.build({
    AccessID:AccessID,
    AccessName:AccessName,
    AccessTags:AccessTags
  });
  Models.AccessControl.sync({alter : true/*,force:true*/});//use force only on non production
  item1.save()
  .then(Success => {
    callback("Inserted");
    console.log("----AddUserAccount Start-----");
    console.log(Success);
    console.log("----AddUserAccount End-----");
  })
  
  .catch(error => {
   
    console.log("error inserting");
    callback("error inserting " +error);
  });
}
app.get('/Api/v1/AccessControl/Update/:AccessControlID/:AccessID/:AccessName/:AccessTags', function (req, res) {
  let AccessControlID = req.params.AccessControlID;
  let AccessID = req.params.AccessID;
  let AccessName = req.params.AccessName;
  let AccessTags = req.params.AccessTags;
  if(!isNullOrEmpty(AccessControlID)&&
  !isNullOrEmpty(AccessID)&&
  !isNullOrEmpty(AccessName)&&
  !isNullOrEmpty(AccessTags)){
    Models.AccessControl.update({
      AccessID: AccessID,
      AccessName: AccessName,
      AccessTags: AccessTags
    },{
      where: {AccessControlID: AccessControlID }
    })
    .then(Success => {
      res.send("Updated");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating");
      res.send("Error Updating " +error);
    });
  }
});
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
app.get('/Api/v1/AccessControl', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
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
//---AccessControl ROUTING END
//---UserAccount ROUTING START
app.get('/Api/v1/UserAccount/Add/:AccessID/:UserName/:Password/:Verify/:ValidKey/:RegisteredDate/:RegisteredTime', function (req, res) {
  //USAGE
  //Api/v1/UserAccount/Add/AccessID/UserName/Password/true/ValidKey/2018-06-27/01:57:17
  let UserAccountID = uuidv4();
  let AccessID = req.params.AccessID;
  let UserName = req.params.UserName;
  let Password = req.params.Password;
  let Verify = req.params.Verify;
  let ValidKey = req.params.ValidKey;
  let RegisteredDate = req.params.RegisteredDate;
  let RegisteredTime =  req.params.RegisteredTime;
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(AccessID)&&
  !isNullOrEmpty(UserName)&&
  !isNullOrEmpty(Password)&&
  !isNullOrEmpty(Verify)&&
  !isNullOrEmpty(ValidKey)&&
  !isNullOrEmpty(RegisteredDate)&&
  !isNullOrEmpty(RegisteredTime)){
    //This is Direct Date Assigned from API we dont use getCurrentDate And getCurrentTime for control
   
    AddUserAccount(UserAccountID,AccessID,UserName,Password,Verify,ValidKey,RegisteredDate,RegisteredTime,function(response) {
      res.send(response);
    });
  }else{
    res.send("Missing params"+AccessID+UserName+Password+Verify+ValidKey+RegisteredDate+RegisteredTime);
  }
});

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
     callback("Inserted");
     console.log("----AddUserAccount Start-----");
     console.log(Success);
     console.log("----AddUserAccount End-----");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting UserAccountID:"+UserAccountID+" \n AccessID:"+AccessID+"\n UserName:"+UserName+"\n Password:"+Password+"\n Verify:"+Verify+"\n ValidKey:"+ValidKey+"\n RegisteredDate:"+RegisteredDate+"\n RegisteredTime:"+RegisteredTime);
    callback(error);
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
app.get('/Api/v1/UserAccount', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
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

app.get('/Api/v1/UserAccount/Update/UserAccountID/:UserAccountID/Status/:VerifiedStatus', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let UserAccountID =  req.params.UserAccountID;
  let VerifiedStatus =  req.params.VerifiedStatus;// only true or false state no other value type
  console.log(UserAccountID+" "+VerifiedStatus);
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(VerifiedStatus)){
    if(VerifiedStatus=="true" || VerifiedStatus=="false"){//must be validated like a string because 
      Models.UserAccount.sync();
      let UserAccountIDExist = false;
      async.series([UserAccountIDCheck],function(err,response){
        if(UserAccountIDExist==true){
          //res.send({UserAccountIDExist:UserAccountIDExist});
          VerifyAccountUserAccountID(UserAccountID,VerifiedStatus,function(response){
            if(!isNullOrEmpty(response)&&response!=undefined){
              res.send(response);
            }else{
              res.send({VerifyAccountUserAccountIDFailed:true});
            }
          });
        }else{
          res.send({UserAccountIDExist:UserAccountIDExist});
        }
      });
      function UserAccountIDCheck(callback){
        isUserAccountIDExist(UserAccountID,function(response){
          let obj = response;
          if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].UserAccountID==UserAccountID){
            UserAccountIDExist = true;
            callback(null,'1');
          }else{
            UserAccountIDExist = false;
            callback(null,'1');
          }
        });
      }
    }else{
      res.send({VerfiedStatusInvalidValue:true});
    }
  }else{
    res.send({MissingParameters:true});
  }
  //res.send("UserAccount "+Offset+" "+ Limit+" "+Sort);
});

app.get('/Api/v1/UserAccount/AccountType/:UserAccountID', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let UserAccountID = req.params.UserAccountID;
  if(!isNullOrEmpty(UserAccountID)){
    AccountTypeFullCheck(UserAccountID,function(response){
      if(!isNullOrEmpty(response)&&response.UnSafeDuplicate==false&&response.FoundAccount==true){
        res.send({AccountType:response.AccountType});
      }
      else if(!isNullOrEmpty(response)&&response.UnSafeDuplicate==true&&response.FoundAccount==false){
        res.send("Duplicate UserAccountID AccountType");
      }
      else if(!isNullOrEmpty(response)&&response.UnSafeDuplicate==false&&response.FoundAccount==false){
        res.send("No Account No Duplicate");
      }
    });
  }else{
    res.send("Missing params");
  }
});

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
//---UserAccount ROUTING START
//---Player ROUTING START
app.get('/Api/v1/Player/Add/:UserAccountID/:ShopID/:ScreenName/:Name/:Surname/:CurrentRoomName', function (req, res) {
  //USAGE /Api/v1/Player/Add/528861d4-3e49-4223-9b1a-913d72112112/1/ScreenName/Name/Surname/CurrentRoomName
  let UserAccountID = req.params.UserAccountID;
  let ShopID = req.params.ShopID;
  let ScreenName = req.params.ScreenName;
  let Name = req.params.Name;
  let Surname = req.params.Surname;
  let CurrentRoomName = req.params.CurrentRoomName;
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(ShopID)&&
  !isNullOrEmpty(ScreenName)&&
  !isNullOrEmpty(Name)&&
  !isNullOrEmpty(Surname)&&
  !isNullOrEmpty(CurrentRoomName)){
    AddPlayer(UserAccountID,ShopID,ScreenName,Name,Surname,CurrentRoomName,function(response) {
      res.send(response);
    });
  }else{
    res.send("Missing params");
  }
});
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
      callback("Inserted");
      console.log("----AddPlayer Start-----");
      console.log(Success);
      console.log("----AddPlayer End-----");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting");
      callback("error inserting " +error);
    });
    //res.send("Player "+UserAccountID+" "+ ShopID+" "+ScreenName);
}

app.get('/Api/v1/Player/Update/UserAccountID/:UserAccountID/Add/Point/:Point', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Point = req.params.Point;
  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(Point)){
      if(validator.isInt(Point)==true){
        let UserAccountIDExist =false;
        let CurrentPoints = undefined;
        async.series([UserAccountIDCheck,PlayerCurrentPointsCheck],function(error,response){
      
          if(UserAccountIDExist==true){
            let NewPoints = parseInt(CurrentPoints)+parseInt(Point);
            if(!(parseInt(Point)<0)){
              if(parseInt(Point)!=0){
                if(NewPoints>=0){
                    res.send({NewPoints:NewPoints});
                    PlayerUpdatePoint(UserAccountID,NewPoints,function(response){
                      if(response!=undefined){
                        res.send(response);
                      }else{
                        res.send({PlayerUpdatePointFailed:true});
                      }
                    });
                }
              }else{
                res.send({NothingToAdd:true});
              }
            }else{
              res.send({IsPointNegativeValue:true});
            }
            
          }else{
            res.send({UserAccountIDExist:false});
          }
         

        });
        function UserAccountIDCheck(callback){
          if(!isNullOrEmpty(UserAccountID)&&UserAccountID!=undefined){
            isUserAccountIDExist(UserAccountID,function(response){
              let obj = response;
              if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].UserAccountID==UserAccountID){
                UserAccountIDExist = true;
                callback(null,'1');
              }else{
                UserAccountIDExist = false;
                callback(null,'1');
              }
            });
          }else{
          
            callback(null,'1');
          }
        }
        function PlayerCurrentPointsCheck(callback){
          if(UserAccountIDExist!=undefined){
            PlayerUserAccountID(UserAccountID,function(response){
              let obj = response;
              if(obj!=undefined&&obj[0].CurrentPoints!=undefined){
                CurrentPoints = obj[0].CurrentPoints;
                callback(null,'1');
              }else{
                CurrentPoints = undefined;
                callback(null,'1');
              }
            });
          }else{
            callback(null,'1');
          }
        }
      }else{
        res.send({PointInvalidValue:true});
      }
    }else{
      res.send({PointEmpty:true});
    }
  }else{
    res.send({UserAccountIDEmpty:true});
  }
});
app.get('/Api/v1/Player/Update/UserAccountID/:UserAccountID/Subtract/Point/:Point', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Point = req.params.Point;
  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(Point)){
      if(validator.isInt(Point)==true){
        let UserAccountIDExist =false;
        let CurrentPoints = undefined;
        async.series([UserAccountIDCheck,PlayerCurrentPointsCheck],function(error,response){
          if(UserAccountIDExist==true){
            let NewPoints = parseInt(CurrentPoints)-parseInt(Point);
            if(!(parseInt(Point)<0)){
              if(parseInt(Point)!=0){
                if(NewPoints>=0){
                  if(UserAccountIDExist==true){
                    res.send({NewPoints:NewPoints});
                    PlayerUpdatePoint(UserAccountID,NewPoints,function(response){
                      if(response!=undefined){
                        res.send(response);
                      }else{
                        res.send({PlayerUpdatePointFailed:true});
                      }
                    });
                  }else{
                    res.send({UserAccountIDExist:false});
                  }
                }else{
                  res.send({NotEnoughPoints:true});
                }
              }else{
                res.send({NothingToSubtract:true});
              }
            }else{
              res.send({IsPointNegativeValue:true});
            }
          }else{
            res.send({UserAccountIDEmpty:true});
          }
          
          
        });
        function UserAccountIDCheck(callback){
          if(!isNullOrEmpty(UserAccountID)&&UserAccountID!=undefined){
            isUserAccountIDExist(UserAccountID,function(response){
              let obj = response;
              if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].UserAccountID==UserAccountID){
                UserAccountIDExist = true;
                callback(null,'1');
              }else{
                UserAccountIDExist = false;
                callback(null,'1');
              }
            });
          }else{
          
            callback(null,'1');
          }
        }
        function PlayerCurrentPointsCheck(callback){
          if(UserAccountIDExist!=undefined){
            PlayerUserAccountID(UserAccountID,function(response){
              let obj = response;
              if(obj!=undefined&&obj[0].CurrentPoints!=undefined){
                CurrentPoints = obj[0].CurrentPoints;
                callback(null,'1');
              }else{
                CurrentPoints = undefined;
                callback(null,'1');
              }
            });
          }else{
            callback(null,'1');
          }
        }
      }else{
        res.send({PointInvalidValue:true});
      }
    }else{
      res.send({PointEmpty:true});
    }
  }else{
    res.send({UserAccountIDEmpty:true});
  }
});

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

    callback("Error "+result);
  });
}

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

app.get('/Api/v1/Player/Update/UserAccountID/:UserAccountID/CurrentRoomName/:CurrentRoomName', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let CurrentRoomName = req.params.CurrentRoomName;
  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(CurrentRoomName)){
      let UserAccountIDExist =false;
      async.series([UserAccountIDCheck],function(error,response){
        if(UserAccountIDExist==true){
          PayerUpdateRoomName(UserAccountID,CurrentRoomName,function(response){
              if(response!=null){
                res.send(response);
              }else{
                res.send({PayerUpdateRoomNameUpdateFailed:true});
              }
          });
        }else{
          res.send({UserAccountIDExist:false});
        }
      });
      function UserAccountIDCheck(callback){
        isUserAccountIDExist(UserAccountID,function(response){
          let obj = response;
          if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].UserAccountID==UserAccountID){
            UserAccountIDExist = true;
            callback(null,'1');
          }else{
            UserAccountIDExist = false;
            callback(null,'1');
          }
        });
      }

    }else{
      res.send({CurrentRoomNameEmpty:true});
    }
  }else{
    res.send({UserAccountIDEmpty:true});
  }
});



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
app.get('/Api/v1/Player/Update/:PlayersID/:UserAccountID/:ShopID/:ScreenName/:Name/:Surname/:CurrentRoomName', function (req, res) {
  let PlayersID = req.params.PlayersID;
  let UserAccountID = req.params.UserAccountID;
  let ShopID = req.params.ShopID;
  let ScreenName = req.params.ScreenName;
  let Name = req.params.Name;
  let Surname = req.params.Surname;
  let CurrentRoomName = req.params.CurrentRoomName;
  if(!isNullOrEmpty(PlayersID)&&
  !isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(ShopID)&&
  !isNullOrEmpty(ScreenName)&&
  !isNullOrEmpty(Name)&&
  !isNullOrEmpty(Surname)&&
  !isNullOrEmpty(CurrentRoomName)){
    Models.Player.update({
      UserAccountID: UserAccountID,
      ShopID: ShopID,
      ScreenName: ScreenName,
      Name: Name,
      Surname: Surname,
      CurrentRoomName: CurrentRoomName
    },{
      where: {PlayersID: PlayersID }
    })
    .then(Success => {
      res.send("Updated");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating");
      res.send("Error Updating " +error);
    });
  }
});


app.get('/Api/v1/Player/Clear', function (req, res){
  Models.Player.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    callback("Cleared");
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
app.get('/Api/v1/Player', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
   
    let result = Models.Player.findAll({ 
      where: {
        PlayersID: {
          ne: null//not null
        }
     }
    }).then(function(result) {
      let Data = result.map(function(item) {
          return item;
          
      });
      res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {

      res.send("Error "+result);
    });
    //res.send("Player "+Offset+" "+ Limit+" "+Sort);
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


app.get('/Api/v1/Player/Validate/:UserAccountID/', function (req, res) {//check for validation only
  //Api/v1/Shop/Add/528861d4-3e49-4223-9b1a-913d72112112/1/Description/
  res.setHeader('Content-Type', 'application/json');
  let UserAccountID = req.params.UserAccountID;
  if(!isNullOrEmpty(UserAccountID)){
    isPlayerUserAccountIDExist(UserAccountID,function(response) {
      if(!isNullOrEmpty(response)&&response.length>0){
        res.send({isPlayer:true});
      }else{
        res.send({isPlayer:false});
      }
      
    });
  }else{
    res.send("Missing params");
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

app.get('/Api/v1/Shop/Add/:UserAccountID/:DistributorID/:Description/', function (req, res) {
  //Api/v1/Shop/Add/528861d4-3e49-4223-9b1a-913d72112112/1/Description/
  let UserAccountID = req.params.UserAccountID;
  let DistributorID = req.params.DistributorID;
  let Description = req.params.Description;
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(DistributorID)&&
  !isNullOrEmpty(Description)){
    AddShop(UserAccountID,DistributorID,Description,function(response) {
      res.send(response);
    });
  
  }else{
    res.send("Missing params");
  }
});
function AddShop(UserAccountID,DistributorID,Description,callback){
  var item1 = Models.Shop.build({
    UserAccountID:UserAccountID,
    DistributorID:DistributorID,
    Description:Description
  });
  Models.Shop.sync({alter : true,/*force:true*/});//use force to recreate for non production only
  item1.save()
  .then(Success => {
    callback("Inserted");
    console.log("----AddShop Start-----");
    console.log(Success);
    console.log("----AddShop End-----");
  })
  
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting");
    callback("error inserting " +error);
  });
}
app.get('/Api/v1/Shop/Update/:ShopID/:UserAccountID/:DistributorID/:Description/', function (req, res) {
  let ShopID = req.params.ShopID;
  let UserAccountID = req.params.UserAccountID;
  let DistributorID = req.params.DistributorID;
  let Description = req.params.Description;
  if(!isNullOrEmpty(ShopID)&&
  !isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(DistributorID)&&
  !isNullOrEmpty(Description)){
    Models.Shop.update({
      UserAccountID: UserAccountID,
      DistributorID: DistributorID,
      Description: Description
    },{
      where: {ShopID: ShopID }
    })
    .then(Success => {
      res.send("Updated");
    })
    
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating");
      res.send("Error Updating " +error);
    });
  }
});
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
app.get('/Api/v1/Shop', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    let result = Models.Shop.findAll({ 
      where: {
        ShopID: {
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
//  res.send("Shop "+Offset+" "+ Limit+" "+Sort);
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
app.get('/Api/v1/Distributor/Add/:UserAccountID/:HeadOfficeID/:Name/', function (req, res) {
  //Usage /Api/v1/Distributor/Add/UserAccountID/HeadOfficeID/Name/
  let UserAccountID = req.params.UserAccountID;
  let HeadOfficeID = req.params.HeadOfficeID;
  let Name = req.params.Name;
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(HeadOfficeID)&&
  !isNullOrEmpty(Name)){
    AddDistributor(UserAccountID,HeadOfficeID,Name,function(response){
      res.send(response);
    });
  }else{
    res.send("Missing params");
  }
});
function AddDistributor(UserAccountID,HeadOfficeID,Name,callback){
  var item1 = Models.Distributor.build({
    UserAccountID:UserAccountID,
    HeadOfficeID:HeadOfficeID,
    Name:Name
  });
  Models.Distributor.sync({alter : true,/*force:true*/});//force removes rebuilds the table only for non production 
  item1.save()
  .then(Success => {
    callback("Inserted");
    console.log("----AddDistributor Start-----");
    console.log(Success);
    console.log("----AddDistributor End-----");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting");
    callback("error inserting " +error);
  });
}
app.get('/Api/v1/Distributor/Update/:DistributorID/:UserAccountID/:HeadOfficeID/:Name/', function (req, res) {
  let DistributorID = req.params.DistributorID;
  let UserAccountID = req.params.UserAccountID;
  let HeadOfficeID = req.params.HeadOfficeID;
  let Name = req.params.Name;
  if(!isNullOrEmpty(DistributorID)&&
  !isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(HeadOfficeID)&&
  !isNullOrEmpty(Name)){
    Models.Distributor.update({
      UserAccountID: UserAccountID,
      HeadOfficeID: HeadOfficeID,
      Name: Name
    },{
      where: {DistributorID: DistributorID }
    })
    .then(Success => {
      res.send("Updated");
    })
    
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating");
      res.send("Error Updating " +error);
    });
  }
});
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
app.get('/Api/v1/Distributor', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    let result = Models.Distributor.findAll({ 
      where: {
        DistributorID: {
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
  //res.send("Distributor "+Offset+" "+ Limit+" "+Sort);
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
app.get('/Api/v1/HeadOffice/Add/:UserAccountID/:Name/:Description/', function (req, res) {
  //Usage Api/v1/HeadOffice/Add/UserAccountID/Name/Description/
  let UserAccountID = req.params.UserAccountID;
  let Name = req.params.Name;
  let Description = req.params.Description;
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(Name)&&
  !isNullOrEmpty(Description)){
    AddHeadOffice(UserAccountID,Name,Description, function(response) {
      res.send(response);
    });
  }else{
    res.send("Missing params");
  }
});
function AddHeadOffice(UserAccountID,Name,Description,callback){
  var item1 = Models.HeadOffice.build({
    UserAccountID:UserAccountID,
    Name:Name,
    Description:Description
  });
  Models.HeadOffice.sync({alter : true,/*force:true*/});//force true rebuilds table for non production only
  item1.save()
  .then(Success => {
    callback("Inserted");
    console.log("----AddHeadOffice Start-----");
    console.log(Success);
    console.log("----AddHeadOffice End-----");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting");
    callback( "error inserting " +error);
  });
}
app.get('/Api/v1/HeadOffice/Update/:HeadOfficeID/:UserAccountID/:Name/:Description/', function (req, res) {
  let HeadOfficeID = req.params.HeadOfficeID;
  let UserAccountID = req.params.UserAccountID;
  let Description = req.params.Description;
  if(!isNullOrEmpty(HeadOfficeID)&&
  !isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(Description)){
    Models.HeadOffice.update({
      UserAccountID: UserAccountID,
      Name: Name
    },{
      where: {HeadOfficeID: HeadOfficeID }
    })
    .then(Success => {
      res.send("Updated");
    })
    
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating");
      res.send("Error Updating " +error);
    });
  }
});
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
app.get('/Api/v1/HeadOffice', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
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
  

module.exports = app;
