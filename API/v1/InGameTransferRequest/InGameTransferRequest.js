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
module.exports = function (app) {
    app.get('/Api/v1/InGameTransferHistoryRequest/UserAccountIDSender/:UserAccountIDSender/UserAccountIDReciver/:UserAccountIDReciver/Amount/:Amount/Reason/:Reason/', function (req, res) {
        let UserAccountIDSender = req.params.UserAccountIDSender;
        let UserAccountIDReciver = req.params.UserAccountIDReciver;
        let Reason = req.params.Reason;
        let Amount = req.params.Amount;

        var promise = new Promise(function (resolve, reject) {
            InGameTransferRequestModel.PlayerNewMoneySubtract(UserAccountIDSender, Amount, function (response) {
                if (response != undefined) {
                    //console.log("Valid Value "+response.NewMoney>=0);
                    if (response.NewMoney >= 0) {
                        resolve(response);
                    } else {
                        reject({
                            NotEnoughSenderPoints: true
                        });
                    }
                } else {
                    reject();
                }
            });
        });
        var promise2 = new Promise(function (resolve, reject) {
            InGameTransferRequestModel.PlayerNewMoneyAdd(UserAccountIDReciver, Amount, function (response) {
                if (response != undefined) {
                    resolve(response);
                } else {
                    reject();
                }
            });
        });
        Promise.all([promise, promise2]).then(function (response) {
            let NewMoneyOfSender = response[0].NewMoney;
            let NewMoneyOfReciever = response[1].NewMoney;

            var promise3 = new Promise(function (resolve, reject) {
                InGameTransferRequestModel.UpdatePlayerMoney(UserAccountIDSender, NewMoneyOfSender, function (response) { //sender
                    if (response != undefined) {
                        resolve();
                    } else {
                        reject({
                            FailedUpdatePlayerSender: true
                        });
                    }
                });

            });
            var promise4 = new Promise(function (resolve, reject) {
                InGameTransferRequestModel.UpdatePlayerMoney(UserAccountIDReciver, NewMoneyOfReciever, function (response) { //reciever
                    if (response != undefined) {
                        resolve();
                    } else {
                        reject({
                            FailedUpdatePlayerReciever: true
                        });
                    }
                });

            });

            Promise.all([promise3, promise4]).then(function (response) {
                if(response!=undefined){
                    InGameTransferRequestModel.RequestTransferHistory(UserAccountIDSender, UserAccountIDReciver, Amount, Reason, function (response) {
                        if(response!=undefined){
                            let status = 200;
                            res.status(status).end(http.STATUS_CODES[status]);
                        }else{
                            res.send({FailedRequestTransferHistory:true})
                        }
                        
                     
                    });
                }else{
                    
                }
               
            }, function (error) {
                res.send(error);
            });

        }, function (error) {
            res.send(error);
        });

    });
}