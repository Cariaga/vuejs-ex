let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameDepositModel = require("./InGameDepositModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
module.exports = function (app) {
    app.get('/Api/v1/InGameDeposit/Request/UserAccountID/:UserAccountID/Name/:Name/Amount/:Amount/', function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let Name = req.params.Name;
        let Amount = req.params.Amount;
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {
                InGameDepositModel.InGameDeposit(UserAccountID, Name, Amount, function (response) {
                    res.send(response);
                });
            } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        });
    });
}