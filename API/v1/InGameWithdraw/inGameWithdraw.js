let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameWithdrawModel = require("./InGameWithdrawModel");
var isNullOrEmpty = require('is-null-or-empty');
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
  app.get('/Api/v1/WithdrawHistory/Request/UserAccountID/:UserAccountID/Amount/:Amount/Bank/:Bank/AccountNumber/:AccountNumber/Name/:Name/WithdrawPassword/:WithdrawPassword/ContactNumber/:ContactNumber/', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Amount = req.params.Amount;
    let Bank = req.params.Bank;
    let AccountNumber = req.params.AccountNumber;
    let Name = req.params.Name;
    let WithdrawPassword = req.params.WithdrawPassword;
    let ContactNumber = req.params.ContactNumber;
    DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
      if (response == true) {
        InGameWithdrawModel.RequestWithdraw(UserAccountID, Amount, Bank, AccountNumber, Name, WithdrawPassword, ContactNumber, function (response) {
          if(response!=undefined){
            let status = 200;
            res.status(status).end(http.STATUS_CODES[status]);
          }else{
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }
        
        })
      } else {
        let status = 404;
        res.status(status).end(http.STATUS_CODES[status]);
      }
    });
  });
}