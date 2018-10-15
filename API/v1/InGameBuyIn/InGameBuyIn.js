let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameBuyInModel = require("./InGameBuyInModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {

    app.get('/Api/v1/InGameBuyIn/UserAccountID/:UserAccountID/BuyInAmount/:BuyInAmount', Security.verifyToken, function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let BuyInAmount = req.params.BuyInAmount;
        if (!isNullOrEmpty(UserAccountID)) {
            if (!isNullOrEmpty(BuyInAmount)) {
                DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                    if (response == true) {
                        InGameBuyInModel.BuyInChips(UserAccountID, BuyInAmount, function (response) {
                            res.send(response);
                        });
                    } else {
                        let status = 404;
                        res.status(status).end(http.STATUS_CODES[status]);
                    }
                });
            } else {
                res.send({
                    InvalidBuyInAmount: true
                });
            }
        } else {
            res.send({
                InvalidUserAccount: true
            });
        }
    });

}