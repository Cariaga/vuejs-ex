//Profile route has a similar property for profile in game 
//but this one is used for BuyIn UI amount in game 

let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameMoneyModel = require("./InGameMoneyModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
module.exports = function (app) {
    app.get('/Api/v1/InGameMoney/UserAccountID/:UserAccountID/', function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        if(!isNullOrEmpty(UserAccountID)){
            let UserAccountID = req.params.UserAccountID;
        InGameMoneyModel.Money(UserAccountID, function (response) {
            res.send(response);
        });
        }
    });
}