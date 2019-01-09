let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameNoticeModel = require("./InGameNoticeModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {

    app.get('/Api/v1/InGameNotice/', Security.rateLimiterMiddleware, Security.verifyToken,Security.cache.route({ expire: 5  }),function (req, res) {
        console.log("------------Deprected uses parameter based now /Api/v1/InGameNotice/ ");
        InGameNoticeModel.InGameNotice(function(response){
            res.send(response);
        });
    });
    app.get('/Api/v1/InGameNotice/Location/:Location/NotificationType/:NotificationType/', Security.rateLimiterMiddleware, Security.verifyToken,Security.cache.route({ expire: 5  }),function (req, res) {
        let Location =req.params.Location;
        let NotificationType= req.params.NotificationType;
        InGameNoticeModel.InGameNotice2(Location,NotificationType,function(response){
            res.send(response);
        });
    });
    app.get('/Api/v1/InGameNotice/test',function (req, res) {

        InGameNoticeModel.InGameNotice(function(response){
            res.send(response);
        });
    });
}