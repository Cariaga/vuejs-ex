var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var isNullOrEmpty = require('is-null-or-empty');
let InGameTransferRequestModel = require('./InGameTransferRequestModel');
let http = require('http');
module.exports = function(app){
    app.get('/Api/v1/InGameTransferHistory/UserAccountIDSender/:UserAccountIDSender/UserAccountIDReciver/:UserAccountIDReciver/Amount/:Amount/Reason/:Reason/', function (req, res) {
      let UserAccountIDSender = req.params.UserAccountIDSender;
      let UserAccountIDReciver = req.params.UserAccountIDReciver;
      let Reason = req.params.Reason;
      let Amount = req.params.Amount;
      InGameTransferRequestModel.RequestTransferHistory(UserAccountIDSender,UserAccountIDReciver,Amount,Reason,function(response){
          res.send(response);
      });
    });
}