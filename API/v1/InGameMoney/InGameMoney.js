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
    
    app.get('/Api/v1/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlVzZXJBY2NvdW50SUQiOiJmYTUxM2FiNi1lMDI5LTQ1ZmItYWI4Zi1lYmJhMjUxYWE5ZGYiLC/4000', /*Management.RouteCalled,Security.rateLimiterMiddleware,*/Security.verifyToken,/*Security.cache.route({ expire: 5  }),*/ function (req, res) {
        InGameMoneyModel.DebugMoney(4000,function (response) {
            res.send(response);
        });
    });
    //(this feature not implemented)only accessed by socket not acccessed by anything or external only a server to server communication 
  /* not used uness we remove both bet deduction in handhistory and playerfinalcard
    app.get('/Api/v1/InGameMoney/UserAccountID/:UserAccountID/Money/:Money', function (req, res) {
        let Money = req.params.Money;
        let UserAccountID = req.params.UserAccountID;
        InGameMoneyModel.UpdatePlayerMoney2(UserAccountID,Money,function (response) {
            res.send(response);
        });
    });*/
}