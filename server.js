// server.js

// set up ========================
var express = require('express');
var Nexmo = require('nexmo');
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
var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator');//email,mobile phone,isIP,isPostalCode,credit card
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
  
     /* nexmo.message.sendSms(sender, recipient[i], message,{type:'unicode'},
      (err,responseData)=>{
        if(err){
          console.log(err);
      }else{
        console.dir(responseData);
      }
    });*/
    }
  }
  //res.send("Sent all to " +recipient);
  //console.log(req.params.recipient);
  res.end();
});

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
function isUserAccountBlocked(UserName,callback){
  Models.BlackList.sync();
    let result = Models.BlackList.findAll({ 
      where: {
        UserName: UserName,//not null
     
        Status:{
          eq:"Blocked"
        },
        order: [
          ['BlackListID', 'DESC'],
      ],
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
      callback(Data);
     // res.send(beautify(Data, null, 2, 100));
    }).catch(function(result) {//catching any then errors
      callback(result);
    });
}
function isUserAccountVerified(UserName,callback){
  Models.UserAccount.sync();
    let result = Models.UserAccount.findAll({ 
      where: {
        UserName:UserName,
        Verify: {
          eq: true
        },
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

function isScreenNameExist(ScreenName,callback){
  Models.UserAccount.sync();
    let result = Models.UserAccount.findAll({ 
      where: {
        UserName:UserName,
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

function getCurrentDate(callback){
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth(); 
  let yyyy = today.getFullYear();
  let FormatedDate = yyyy+'/'+mm+'/'+dd;
  callback(FormatedDate);
}
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
app.get('/register',function (req, res) {
  res.setHeader('Content-Type', 'application/json');
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

            var schema = new passwordValidator();
            schema
            .is().min(8)
            .has().uppercase()                              // Must have uppercase letters
            .has().lowercase()                              // Must have lowercase letters
            .has().digits()                                 // Must have digits
            .has().not().spaces()                           // Should not have spaces
            
            let isAlreadyEmailExist=false;
            let isAlreadyUserNameExist = false;
            let isInvalidPassword= !schema.validate(Password);
            let isInvalidEmail = !validator.isEmail(Email);
          
            isEmailExist(Email,function(response){
              let obj = response;
              if(obj[0].Email==Email){
                isAlreadyEmailExist=true;
                
              }else{
                isAlreadyEmailExist=false;
              }
             /* console.log(isAlreadyEmailExist);
              console.log(response);*/
    
            });
            isUserNameExist(UserName,function(response){
              let obj = response;
              if(obj[0].UserName==UserName){
                isAlreadyUserNameExist=true;
                console.log(isAlreadyUserNameExist);
              }else{
                isAlreadyUserNameExist=false;
              }
              /*console.log(isAlreadyUserNameExist);
              console.log(response);*/
            });

            if(!isAlreadyEmailExist&&!isAlreadyUserNameExist&&!isInvalidPassword&&!isInvalidEmail){
              let isRegistered =false;
              
              let CurrentTime = undefined;
              let CurrentDate = undefined;
              getCurrentTime(function(response){
                CurrentTime=response;
              });
              getCurrentDate(function(response){
                CurrentDate=response;
              });
              let UUIDKey =uuidv4();
              /*
              console.log(UUIDKey);
              console.log(CurrentDate);
              console.log(CurrentTime);*/
              AddUserAccount(UserName,"AccessID",Name,Password,false,UUIDKey,CurrentDate,CurrentTime,function(response){
                if(response=="Inserted"){
                  isRegistered=true;
                }else{
                  isRegistered=false;
                  console.log("Error Received did not registered "+response);// Error Received did not registered
                }
              });

              let Data = { "isAlreadyEmailExist":isAlreadyEmailExist,"isInvalidEmail":isInvalidEmail, "isAlreadyUserNameExist":isAlreadyUserNameExist,"isInvalidPassword":isInvalidPassword ,"isRegistered":isRegistered };
              res.send(beautify(Data, null, 2, 100));
            }else{
              //the isRegisterd in this doesn't have access to The insert process so by default its false unless the if statement above this is true
              let Data = { "isAlreadyEmailExist":isAlreadyEmailExist,"isInvalidEmail":isInvalidEmail, "isAlreadyUserNameExist":isAlreadyUserNameExist,"isInvalidPassword":isInvalidPassword,"isRegistered":false };
              res.send(beautify(Data, null, 2, 100));
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
  // Usage /Login?UserName=UserName&Password=Password
  let UserName= req.query.UserName;
  let Password = req.query.Password;
  
  if(!isNullOrEmpty(UserName)){
    if(!isNullOrEmpty(Password)){

      Models.UserAccount.sync(/*{force:true}*/);//makes sure table exist and syncs it
    Models.UserInfo.sync(/*{force:true}*/);

      let Associated= Models.UserInfo.findAll(
        {
          include: [Models.UserAccount]
      }
      ).then(function(result) {
        let Data = result.map(function(item) {
            return item;
        });

      }).catch(function(result) {//catching any then errors
      
        res.send("Error Associate "+result);
        
      });

      let result = Models.UserAccount.findAll({ 
        where: {
          UserName:UserName//not null
          ,
          Password:Password//not null

       }
      }).then(function(result) {
        let Data = result.map(function(item) {
            return item;
        });
        //--Validation For Login Start
        let VerifyResult = Data.find(function(element) {
          return element.Verify==true;
        });

       /* let VerifyResult = Data.find(function(element) {
          return element.Verify==true;
        });*/
        res.send(beautify(Data, null, 2, 100));
        if(VerifyResult){

         /* res.send({
            "UserAccountID":VerifyResult.UserAccountID,
            "Status":"Verified",
            "UserName":"",
            "ScreenName":"",
            "Email":"",
            "PhoneNumber":"",
            "TelephoneNumber":""
            
          });*/
           //--Validation For Login End

        }else{
          res.send({
            "Status":"Unverified",
            "Controller":"/Login",
            "Solution":"Check Mail For Verification"
          });
        }
     

        //res.send(beautify(Data, null, 2, 100));

      }).catch(function(result) {//catching any then errors
      
        res.send("Error "+result);
        
      });
     
  
    }else{
      res.send("Invalid Password");
    }
  }else{
    res.send("Invalid UserName");
  }
});
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
    AddSupportTicket(UserAccountID,Title,Description,Reason,Time,Date,Status,function(response) {
      res.send(response);
    });
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
  })
  
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting");
    callback("error inserting " +error);
  });
}
app.get('/Api/v1/SupportTicket/Update/:SupportTicketID/:UserAccountID/:Title/:Description/:Reason/:Time/:Date/:Status', function (req, res) {
  // USAGE Api/v1/SupportTicket/Update/putek/eltit/tion/rason/12:34:56/2009-05-31/Nakaon
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
    Models.SupportTicket.update({
      UserAccountID: UserAccountID,
      Title: Title,
      Description: Description,
      Reason: Reason,
      Time: Time,
      Date: Date,
      Status: Status
    },{
      where: {SupportTicketID: SupportTicketID }
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
app.get('/Api/v1/SupportTicket/Clear', function (req, res){
  Models.SupportTicket.destroy({
    where: {},
    truncate: true
  });
  res.send("Truncate");
});
app.get('/Api/v1/SupportTicket/Delete', function (req, res){
  Models.SupportTicket.sync({force:true});
  res.send("Deleted");
});
app.get('/Api/v1/SupportTicket', function (req, res) {
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
//---SupportTicket ROUTING END
//---Notification ROUTING START
app.get('/Api/v1/Notification/Add/:NotificationType/:Title/:Description/:Time/:Date', function (req, res) {
  let NotificationType = req.params.NotificationType;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let Time = req.params.Time;
  let Date = req.params.Date;
  //USAGE Api/v1/Notification/Add/NotificationType/Title/Description/01:57:17/2018-06-27
  if(!isNullOrEmpty(NotificationType)&&
  !isNullOrEmpty(Title)&&
  !isNullOrEmpty(Description)&&
  !isNullOrEmpty(Time)&&
  !isNullOrEmpty(Date)){
     AddNotification(NotificationType,Title,Description,Time,Date,function(response) {
      res.send(response);
    });
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
  })
  
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting");
    callback("error inserting " +error);
  });
}

app.get('/Api/v1/Notification/Update/:NotificationID/:NotificationType/:Title/:Description/:Time/:Date', function (req, res) {
  let NotificationID = req.params.NotificationID;
  let NotificationType = req.params.NotificationType;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let Time = req.params.Time;
  let Date = req.params.Date;
  if(!isNullOrEmpty(NotificationType)&&!isNullOrEmpty(Title)&&!isNullOrEmpty(Description)&&!isNullOrEmpty(Time)&&!isNullOrEmpty(Date)){
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
      res.send("Updated");
    })
    
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating");
      res.send("Error Updating " +error);
    }); 
  }
});
app.get('/Api/v1/Notification/Clear', function (req, res){
  Models.Notification.destroy({
    where: {},
    truncate: true
  });
  res.send("Truncate");
});
app.get('/Api/v1/Notification/Delete', function (req, res){
  Models.Notification.sync({force:true});
  res.send("Deleted");
});
app.get('/Api/v1/Notification', function (req, res) {
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
app.get('/Api/v1/BlackList/Add/:UserAccountID/:Title/:Description/:ReportDate/:ReleaseDate/', function (req, res) {
  //USAGE /Api/v1/BlackList/Add/UserAccountID/Title/Description/2018-06-27/2018-06-27
  let UserAccountID = req.params.UserAccountID;
  let Title = req.params.Title;
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
      Status:"BlackList",
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
      // mhhh, wth!
      console.log("error inserting");
      res.send("error inserting " +error);
    });
  }
});
app.get('/Api/v1/BlackList/Update/:BlackListID/:UserAccountID/:Title/:Description/:ReportDate/:ReleaseDate/', function (req, res) {
  let BlackListID = req.params.BlackListID;
  let UserAccountID = req.params.UserAccountID;
  let Title = req.params.Title;
  let Description = req.params.Description;
  let ReportDate = req.params.ReportDate;
  let ReleaseDate = req.params.ReleaseDate;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(Title)&&!isNullOrEmpty(Description)&&!isNullOrEmpty(ReportDate)&&!isNullOrEmpty(ReleaseDate)){
    Models.BlackList.update({
      UserAccountID: UserAccountID,
      Title: Title,
      Description: Description,
      ReportDate: ReportDate,
      ReleaseDate: ReleaseDate
    },{
      where: {BlackListID: BlackListID }
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
app.get('/Api/v1/BlackList/Clear', function (req, res){
  Models.BlackList.destroy({
    where: {},
    truncate: true
  });
  res.send("Truncate");
});
app.get('/Api/v1/BlackList/Delete', function (req, res){
  Models.BlackList.sync({force:true});
  res.send("Deleted");
});
app.get('/Api/v1/BlackList', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
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
 // res.send("BlackList "+Offset+" "+ Limit+" "+Sort);
});
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
      res.send("Inserted");
    })
    
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting");
      res.send("error inserting " +error);
    });
  }
});
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
      // mhhh, wth!
      console.log("Error Updating");
      res.send("Error Updating " +error);
    }); 
  }
});
app.get('/Api/v1/LoginHistory/Clear', function (req, res){
  Models.LoginHistory.destroy({
    where: {},
    truncate: true
  });
  res.send("Truncate");
});
app.get('/Api/v1/LoginHistory/Delete', function (req, res){
  Models.LoginHistory.sync({force:true});
  res.send("Deleted");
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
      // mhhh, wth!
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
      // mhhh, wth!
      console.log("Error Updating");
      res.send("Error Updating " +error);
    }); 
  }
});
app.get('/Api/v1/BankInformation/Clear', function (req, res){
  Models.BankInformation.destroy({
    where: {},
    truncate: true
  });
  res.send("Truncate");
});
app.get('/Api/v1/BankInformation/Delete', function (req, res){
  Models.BankInformation.sync({force:true});
  res.send("Deleted");
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
app.get('/Api/v1/WithdrawHistory/Add/:UserAccountID/:Amount/:BankNameUsed/:SecurityCodeUsed/:Status/:RequestedDATE/:ApprovedDATE/:RejectedDATE/:ProcessingDATE/:RequestedTIME/:ApprovedTIME/:RejectedTIME/:ProcessingTIME', function (req, res) {
  // USAGE /Api/v1/WithdrawHistory/Add/UserAccountID/30/BankNameUsed/SecurityCodeUsed/Status/2018-06-27/2018-06-28/2018-06-29/2018-06-30/01:57:17/01:58:17/01:57:19/01:57:20/01:57:20
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
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(Amount)&&
  !isNullOrEmpty(BankNameUsed)&&
  !isNullOrEmpty(Status)&&
  !isNullOrEmpty(RequestedDATE)&&
  !isNullOrEmpty(ApprovedDATE)&&
  !isNullOrEmpty(RejectedDATE)&&
  !isNullOrEmpty(ProcessingDATE)&&
  !isNullOrEmpty(RequestedTIME)&&
  !isNullOrEmpty(ApprovedTIME)&&
  !isNullOrEmpty(RejectedTIME)&&
  !isNullOrEmpty(ProcessingTIME)){
    WithdrawHistory(UserAccountID,Amount,BankNameUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,RejectedTIME,ProcessingTIME,function(response) {
      res.send(response);
    });
  }
});
function WithdrawHistory(UserAccountID,Amount,BankNameUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,RejectedTIME,ProcessingTIME){
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
      return"Inserted";
    })
    
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting");
      return"error inserting " +error;
    });
}
app.get('/Api/v1/WithdrawHistory/Update/:WithdrawHistoryID/:UserAccountID/:Amount/:BankNameUsed/:SecurityCodeUsed/:Status/:RequestedDATE/:ApprovedDATE/:RejectedDATE/:ProcessingDATE/:RequestedTIME/:ApprovedTIME/:RejectedTIME/:ProcessingTIME', function (req, res) {
  // USAGE /Api/v1/WithdrawHistory/Add/UserAccountID/30/BankNameUsed/SecurityCodeUsed/Status/2018-06-27/2018-06-28/2018-06-29/2018-06-30/01:57:17/01:58:17/01:57:19/01:57:20/01:57:20
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
      // mhhh, wth!
      console.log("Error Updating");
      res.send("Error Updating " +error);
    });
  }
});
app.get('/Api/v1/WithdrawHistory/Clear', function (req, res){
  Models.WithdrawHistory.destroy({
    where: {},
    truncate: true
  });
  res.send("Truncate");
});
app.get('/Api/v1/WithdrawHistory/Delete', function (req, res){
  Models.WithdrawHistory.sync({force:true});
  res.send("Deleted");
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
app.get('/Api/v1/DepositHistory/Add/:UserAccountID/:Amount/:BankNameUsed/:SecurityCodeUsed/:Status/:RequestedDATE/:ApprovedDATE/:RejectedDATE/:ProcessingDATE/:RequestedTIME/:ApprovedTIME/:RejectedTIME/:ProcessingTIME', function (req, res) {
 // Usage Api/v1/DepositHistory/Add/UserAccountID/1/BankNameUsed/SecurityCodeUsed/Status/2018-06-26/2018-06-27/2018-06-28/2018-06-29/01:57:16/01:57:17/01:58:17/01:59:17
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
  !isNullOrEmpty(ApprovedTIME)&&
  !isNullOrEmpty(RejectedTIME)&&
  !isNullOrEmpty(ProcessingTIME)){
   AddDepositHistory(UserAccountID,Amount,BankNameUsed,SecurityCodeUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,ApprovedTIME,RejectedTIME,ProcessingTIME,function(response) {
    res.send(response);
  });
  }
});
function AddDepositHistory(UserAccountID,Amount,BankNameUsed,SecurityCodeUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,RejectedTIME,ProcessingTIME,callback){
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
    callback("Inserted");
  })
  
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting");
    callback("error inserting " +error);
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
        where: {DepositHistoryID: DepositHistoryID }
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
app.get('/Api/v1/DepositHistory/Clear', function (req, res){
  Models.DepositHistory.destroy({
    where: {},
    truncate: true
  });
  res.send("Truncate");
});
app.get('/Api/v1/DepositHistory/Delete', function (req, res){
  Models.DepositHistory.sync({force:true});
  res.send("Deleted");
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
//---GameHistory ROUTING START
app.get('/Api/v1/GameHistory/Add/:UserAccountID/:RoundID/:RoomID/:Rank/:Score/:Card/:Time/:Date/:BeforePoints/:AfterPoints/', function (req, res) {
  //USAGE /Api/v1/GameHistory/Add/UserAccountID/RoundID/RoomID/Rank/0/Card/01:57:17/2018-06-27/0/0/
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
    Models.GameHistory.sync({alter : true/*,force:true*/});//use force to delete old table non production
    item1.save()
    .then(Success => {
      res.send("Inserted");
    })
    
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting");
      res.send("error inserting " +error);
    });
  }
});
app.get('/Api/v1/GameHistory/Update/:GameHistoryID/:UserAccountID/:RoundID/:RoomID/:Rank/:Score/:Card/:Time/:Date/:BeforePoints/:AfterPoints/', function(req,res) {
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
      // mhhh, wth!
      console.log("Error Updating");
      res.send("Error Updating " +error);
    });
  }
});
app.get('/Api/v1/GameHistory/Clear', function (req, res){
  Models.GameHistory.destroy({
    where: {},
    truncate: true
  });
  res.send("Truncate");
});
app.get('/Api/v1/GameHistory/Delete', function (req, res){
  Models.GameHistory.sync({force:true});
  res.send("Deleted");
});
app.get('/Api/v1/GameHistory', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
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
  //res.send("GameHistory "+Offset+" "+ Limit+" "+Sort);
});
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
 
    /*
    if(forced=="true"){
      Models.UserInfo.sync({force:forced});
    }
    if(forced=="false"){
      Models.UserInfo.sync({force:forced});
    }else{
      Models.UserInfo.sync();
    }*/
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
      callback( "Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting");
      callback("error inserting " +error);
    });
}
app.get('/Api/v1/UserInfo/Update/:UserAccountID/:Email/:PhoneNumber/:TelephoneNumber', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Email = req.params.Email;
  let PhoneNumber = req.params.PhoneNumber;
  let TelephoneNumber = req.params.TelephoneNumber;
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(Email)&&!isNullOrEmpty(PhoneNumber)&&!isNullOrEmpty(TelephoneNumber)){
    
  }
});
app.get('/Api/v1/UserInfo/Clear', function (req, res){
  Models.UserInfo.destroy({
    where: {},
    truncate: true
  });
  res.send("Truncate");
});
app.get('/Api/v1/UserInfo/Delete', function (req, res){
  Models.UserInfo.sync({force:true});
  res.send("Deleted");
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
  })
  
  .catch(error => {
    // mhhh, wth!
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
  });
  res.send("Truncate");
});
app.get('/Api/v1/AccessControl/Delete', function (req, res){
  Models.AccessControl.sync({force:true});
  res.send("Deleted");
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
app.get('/Api/v1/UserAccount/Add/:UserAccountID/:AccessID/:UserName/:Password/:Verify/:ValidKey/:RegisteredDate/:RegisteredTime', function (req, res) {
  //USAGE
  ///Api/v1/UserAccount/Add/UserAccountID/AccessID/UserName/Password/true/ValidKey/2018-06-27/01:57:17
  let UserAccountID = req.params.UserAccountID;
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
  })
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting");
    callback("error inserting " +error);
  });
}


app.get('/Api/v1/UserAccount/Clear', function (req, res){
  Models.UserAccount.destroy({
    where: {},
    truncate: true
  });
  res.send("Truncate");
});
app.get('/Api/v1/UserAccount/Delete', function (req, res){
  Models.UserAccount.sync({force:true});//will not execute if has FK set Up
  res.send("Deleted");
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

//---UserAccount ROUTING START
//---Player ROUTING START
app.get('/Api/v1/Player/Add/:UserAccountID/:ShopID/:ScreenName/:Name/:Surname/:CurrentRoomName', function (req, res) {
  //USAGE /Api/v1/Player/Add/UserAccountID/ShopID/ScreenName/Name/Surname/CurrentRoomName
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
    AddPlayer(UserAccountID,ShopID,Name,Surname,CurrentRoomName,function(response) {
      res.send(response);
    });
  }else{
    res.send("Missing params");
  }
});
function AddPlayer(UserAccountID,ShopID,Name,Surname,CurrentRoomName,callback){
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
    Models.Player.sync({alter : true/*,force:true*/});//use force to clear/delete old table non production only
    item1.save()
    .then(Success => {
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting");
      callback("error inserting " +error);
    });
    //res.send("Player "+UserAccountID+" "+ ShopID+" "+ScreenName);
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
  });
  res.send("Truncate");
});
app.get('/Api/v1/Player/Delete', function (req, res){
  Models.Player.sync({force:true});
  res.send("Deleted");
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
//---Player ROUTING START
//---Shop ROUTING START
app.get('/Api/v1/Shop/Add/:UserAccountID/:DistributorID/:Description/', function (req, res) {
  //Api/v1/Shop/Add/UserAccountID/DistributorID/Description/
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
    where: {},
    truncate: true
  });
  res.send("Truncate");
});
app.get('/Api/v1/Shop/Delete', function (req, res){
  Models.Shop.sync({force:true});
  res.send("Deleted");
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
app.get('/Api/v1/Distributor/Add/:UserAccountID/:HeadOfficeID/:Name/', function (req, res) {
  //Usage /Api/v1/Distributor/Add/UserAccountID/HeadOfficeID/Name/
  let UserAccountID = req.params.UserAccountID;
  let HeadOfficeID = req.params.HeadOfficeID;
  let Name = req.params.Name;
  if(!isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(HeadOfficeID)&&
  !isNullOrEmpty(Name)){
    AddDistributer(UserAccountID,HeadOfficeID,Name,function(response){
      res.send(response);
    });
  }else{
    res.send("Missing params");
  }
});
function AddDistributer(UserAccountID,HeadOfficeID,Name,callback){
  var item1 = Models.Distributor.build({
    UserAccountID:UserAccountID,
    HeadOfficeID:HeadOfficeID,
    Name:Name
  });
  Models.Distributor.sync({alter : true,/*force:true*/});//force removes rebuilds the table only for non production 
  item1.save()
  .then(Success => {
    callback("Inserted");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting");
    callback("error inserting " +error);
  });
}
app.get('/Api/v1/Distributor/Update/:DistributerID/:UserAccountID/:HeadOfficeID/:Name/', function (req, res) {
  let DistributerID = req.params.DistributerID;
  let UserAccountID = req.params.UserAccountID;
  let HeadOfficeID = req.params.HeadOfficeID;
  let Name = req.params.Name;
  if(!isNullOrEmpty(DistributerID)&&
  !isNullOrEmpty(UserAccountID)&&
  !isNullOrEmpty(HeadOfficeID)&&
  !isNullOrEmpty(Name)){
    Models.Distributor.update({
      UserAccountID: UserAccountID,
      HeadOfficeID: HeadOfficeID,
      Name: Name
    },{
      where: {DistributerID: DistributerID }
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
  });
  res.send("Truncate");
});
app.get('/Api/v1/Distributor/Delete', function (req, res){
  Models.Distributor.sync({force:true});
  res.send("Deleted");
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
  });
  res.send("Truncate");
});
app.get('/Api/v1/HeadOffice/Delete', function (req, res){
  Models.HeadOffice.sync({force:true});
  res.send("Deleted");
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
