// server.js

// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var fs = require('fs')
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var mongoose = require('mongoose'); // mongoose for mongodb
var database = require('./config/database'); //load the database config
var request = require('request');
var isNullOrEmpty = require('is-null-or-empty');


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

let HeadOffice = mongoose.Schema({});
    
let Distributor = mongoose.Schema({DistributorID:'String'});

let Contact = mongoose.Schema({ContactID:  'String',
				Email:  'String',
				PhoneNumber: 'String'});
	
let Shop = mongoose.Schema({ShopID:  'String',
				Name: 'String',
				RegisteredDate: 'Number',
				RegisteredTime: 'String',
				Description:'String'});

let Player = mongoose.Schema({UserID:'String',
			     ScreenName:'String',
			     Name:'String',
			     Surname:'String',
			     RegisteredDate:'String',
			     RegisteredTime: 'String',
			     CurrentRoomName:'String'});

let GameHistory = mongoose.Schema({SeasonID: 'String',
				  RoundID:'String',
				  RoomID:'String',
				  Rank:  'String',
				  Score: 'Number',
				  Card:'String',
				  Date: 'String',
				  Time:'String',
				  BeforePoints: 'String',
				  AfterPoints:'String'});

let LoginHistory = mongoose.Schema({HistoryID:'String',
				   IP: 'String',
				   Time: 'String',
				   Date:'String'});
let UserAccount = mongoose.Schema({AccountType:'String',
				  UserName: 'String',
				  Password:'String',
				  Verify: 'Boolean'});

let BlackList = mongoose.Schema({BlackListID: 'String',
				Reason:  'String',
				Time: 'String',
				Date: 'String',
				ReleaseDate:  'String'});

let BankInformation = mongoose.Schema({Name:  'String',
				      BankName:  'String',
				      SecurityCode: 'String'});

let SupportTicket = mongoose.Schema({SupportTicketID: 'String',
				    Title: 'String',
				    Description: 'String',
				    Reason: 'String',
				    Date:  'String',
				    Time: 'String',
				    Status: 'String'});

let Notification = mongoose.Schema({NotificationID: 'String',
				   NotificationType: 'String',
				   Title: 'String',
				   Time:'String',
				   Date:  'String',
				   Description: 'String'});

let DepositHistory = mongoose.Schema({UserID:'String',
				     Time: 'String',
				     Date: 'String',
				     Amount: 'Number',
				     Status: 'String'});

let WithdrawHistory = mongoose.Schema({UserID: 'String',
				      Time: 'String',
				      Date: 'String',
				      Amount:'Number',
				      Status:  'String'});




// define Schema
    var BookSchema = mongoose.Schema({
      name: String,
      price: Number,
      quantity: Number
    });
 
    // compile schema to model
    var Book = mongoose.model('Book', BookSchema, 'bookstore');
 
    // documents array
    var books = [{ name: 'Mongoose Tutorial', price: 10, quantity: 25 },
                    { name: 'NodeJS tutorial', price: 15, quantity: 5 },
                    { name: 'MongoDB Tutorial', price: 20, quantity: 2 }];
 
    // save multiple documents to the collection referenced by Book Model
    Book.collection.insert(books, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });

   // var queried = Book.collection.find({price:5});//not working

    Book.find().exec(function (err, results) {
      var count = results.length;
      console.log(count);
    });
    
// Equivalent
/*var HeadOffice = new Schema({
  Distributor: [new Schema({ name: 'string' })]
});*/




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
