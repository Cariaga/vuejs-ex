let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameNoticeModel = require("./InGameNoticeModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
    app.get('/Api/v1/InGameNotice/', Security.verifyToken,function (req, res) {

        InGameNoticeModel.InGameNotice(function(response){
            res.send(response);
        });
    });
    app.get('/Api/v1/InGameNotice/',function (req, res) {

        InGameNoticeModel.InGameNotice(function(response){
            res.send(response);
        });
    });
}