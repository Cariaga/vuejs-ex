let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGamePlayerWinsModel = require("./InGamePlayerWinsModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
    app.get('/Api/v1/PlayerWins/UserAccountID/:UserAccountID/', Security.rateLimiterMiddleware,Security.verifyToken,/*Security.cache.route({ expire: 5  }),*/ function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        console.log("Player Wins")
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {
                InGamePlayerWinsModel.InGamePlayerWins(UserAccountID, function (response) {
                    if (response != undefined) {
                        res.send(response);
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
    });
}

module.exports = function (app) {
    app.get('/Api/v1/PlayerWins/PlayersWinLoseRake/UserAccounts/:UserAccounts/', function (req, res) {

        let UserAccounts = req.params.UserAccounts;
        console.log(UserAccounts);
        let UserAccountIDs = UserAccounts.split(',');
        for(let i=0;i<UserAccountIDs.length;++i){
            UserAccountIDs[i]= "\'"+UserAccountIDs[i]+"\'";
        }

        InGamePlayerWinsModel.InGamePlayersWinLoseRake(UserAccountIDs,function(response){
            res.send(response);
        });
    /*    DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {
                InGamePlayerWinsModel.InGamePlayerWins(UserAccountID, function (response) {
                    if (response != undefined) {
                        res.send(response);
                    } else {
                        let status = 404;
                        res.status(status).end(http.STATUS_CODES[status]);
                    }
                });
            } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        });*/
    });
}