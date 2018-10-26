let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameBuyInModel = require("./InGameBuyInModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {

  /*uses websocket now no need deprecated


    app.get('/Api/v1/InGameBuyIn/UserAccountID/:UserAccountID/BuyInAmount/:BuyInAmount', Security.verifyToken, function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let BuyInAmount = req.params.BuyInAmount;
        if (!isNullOrEmpty(UserAccountID)) {
            if (!isNullOrEmpty(BuyInAmount)) {

                var promise = new Promise(function (resolve, reject) {
                    DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                        if (response != undefined) {
                            InGameBuyInModel.BuyInChips(UserAccountID, BuyInAmount, function (response) {
                                resolve(response);
                            });
                        } else {
                            reject();
                            let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);
                        }
                    });
                });

                var promise1 = new Promise(function (resolve, reject) {
                    DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                        if (response != undefined) {
                            InGameBuyInModel.RoomMoney(UserAccountID, BuyInAmount, function (response) {
                                resolve(response);
                            });
                        } else {
                            reject();
                            let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);
                        }
                    });
                });

                Promise.all([promise, promise1]).then(function (response) {
                    if (response != undefined) {
                        console.log("inserted");
                    } else{

                    }
                }, function (error) {
                    res.send(error);
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
    });*/

}