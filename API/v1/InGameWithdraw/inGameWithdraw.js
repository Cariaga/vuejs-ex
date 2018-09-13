let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameWithdrawModel = require("./InGameWithdrawModel");
var isNullOrEmpty = require('is-null-or-empty');
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');
module.exports = function (app) { 
  app.get('/Api/v1/WithdrawHistory/Request/UserAccountID/:UserAccountID/Amount/:Amount/Bank/:Bank/AccountNumber/:AccountNumber/Name/:Name/WithdrawPassword/:WithdrawPassword/ContactNumber/:ContactNumber/', function (req, res) {
    let UserAccountID = req.params.UserAccountID
    let Amount = req.params.Amount
    let Bank = req.params.Bank
    let AccountNumber = req.params.AccountNumber
    let Name = req.params.Name
    let WithdrawPassword = req.params.WithdrawPassword
    let ContactNumber = req.params.ContactNumber
    InGameWithdrawModel.RequestWithdraw(UserAccountID, Amount, Bank, AccountNumber, Name, WithdrawPassword, ContactNumber, function (response) {
      res.send(response);
    })
  });
}
