//Profile route has a similar property for profile in game 
//but this one is used for BuyIn UI amount in game 

let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameMoneyModel = require("./InGameMoneyModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) {
    /*to get the player money in game  of a user account*/
    /*this has been replaced by websocket */
    /*we now use this as a debug code per player */
    app.get('/Api/v1/InGameMoney/UserAccountID/:UserAccountID/', /*Management.RouteCalled,Security.rateLimiterMiddleware,*/Security.verifyToken,/*Security.cache.route({ expire: 5  }),*/ function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        if (!isNullOrEmpty(UserAccountID)) {
            DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                if (response == true) {
                    InGameMoneyModel.Money(UserAccountID, function (response) {
                        res.send(response);
                    });
                } else {
                    let status = 404;
                    res.status(status).end(http.STATUS_CODES[status]);
                }
            });
        }
    });
}