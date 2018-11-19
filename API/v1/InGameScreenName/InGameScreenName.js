let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameScreenNameModel = require("./InGameScreenNameModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
    app.get('/Api/v1/InGameScreenName/UserAccountID/:UserAccountID/', Security.rateLimiterMiddleware,Security.verifyToken, function (req, res) {
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