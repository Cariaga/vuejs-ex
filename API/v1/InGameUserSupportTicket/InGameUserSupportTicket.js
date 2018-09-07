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
let InGameUserSupportTicketModel = require('./InGameUserSupportTicketModel');
module.exports = function(app){//selection
    app.get('/Api/v1/UserAccount/SupportTicket/UserAccountID/:UserAccountID/Status/Pending', function (req, res) {
      let UserAccountID= req.params.UserAccountID;
      InGameUserSupportTicketModel.SupportTicketUserAccountID(UserAccountID,function(response){
        res.send(response);
      });
    });
}