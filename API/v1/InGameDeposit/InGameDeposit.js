let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameDepositModel = require("./InGameDepositModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');

module.exports = function (app) {
    app.get('/Api/v1/InGameDeposit/Request/UserAccountID/:UserAccountID/Name/:Name/Amount/:Amount/', function (req, res) {
        InGameDepositModel.InGameDeposit(UserAccountID,Name,Amount,function(response){
            res.send(response);
        });
    });
}