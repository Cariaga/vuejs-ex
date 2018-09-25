var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var isNullOrEmpty = require('is-null-or-empty');
let InGameTransferRequestModel = require('./InGameTransferRequestModel');
let http = require('http');
module.exports = function(app){//selection
    app.get('/Api/v1/InGameTransferHistory/UserAccountID/:UserAccountID/', function (req, res) {
      let UserAccountID= req.params.UserAccountID;
        
    });
}