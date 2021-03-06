let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameScreenNameModel = require("./InGameScreenNameModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) {
    /*screen name of a user account we also happend to retrive the screen name during login route*/
    
    app.get('/Api/v1/InGameScreenName/UserAccountID/:UserAccountID/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        InGameScreenNameModel.InGameScreeName(UserAccountID,function(response){
            if(response!=undefined){
                res.send(response);
            }else{
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        })
    });
}