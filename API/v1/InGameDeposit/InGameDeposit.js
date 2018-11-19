let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameDepositModel = require("./InGameDepositModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
    function InGameDeposit(UserAccountID, Name, Amount, res) {
        if (!isNullOrEmpty(UserAccountID)) {
            if (!isNullOrEmpty(Name)) {
                if (!isNullOrEmpty(Amount)) {
                    DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                        if (response == true) {
                            InGameDepositModel.InGameDeposit(UserAccountID, Name,parseInt(Amount), function (response) {
                                if (response != undefined) {
                                    let status = 200;
                                    res.status(status).end(http.STATUS_CODES[status]);
                                } else {
                                    let status = 404;
                                    res.status(status).end(http.STATUS_CODES[status]);
                                }
                            });
                        } else {
                            let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);
                        }
                    });
                } else {
                    res.send({
                        NoAmount: true
                    });
                }
            } else {
                res.send({
                    NoName: true
                });
            }
        } else {
            res.send({
                NoUserAccountID: true
            });
        }
    }

    app.post('/Api/v1/InGameDeposit/Request/', Security.rateLimiterMiddleware, Security.verifyToken, function (req, res) {
        let UserAccountID = req.body.UserAccountID;
        let Name = req.body.Name;
        let Amount = parseInt(req.body.Amount);
        InGameDeposit(UserAccountID, Name, Amount, res);
    });
    app.get('/Api/v1/InGameDeposit/Request/UserAccountID/:UserAccountID/Name/:Name/Amount/:Amount/', Security.rateLimiterMiddleware, Security.verifyToken, function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let Name = req.params.Name;
        let Amount = parseInt(req.params.Amount);
        InGameDeposit(UserAccountID, Name, Amount, res);
    });
}