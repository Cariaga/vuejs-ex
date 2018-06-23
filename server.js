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


app.get('/testseq', function (req, res) {

 
//Setting up the config
var sequelize = new Sequelize('sampledb', 'user', 'user', {
    host:'172.30.166.206',
    port: 3306,
    dialect: 'mysql'
});

 //model
 var Item = sequelize.define('Item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  name:Sequelize.STRING,
  description: Sequelize.STRING,
  qty: Sequelize.INTEGER
});

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
}).then(function(user) {
  console.log("inside then function"+user);
  return user;
  res.send(result);
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
