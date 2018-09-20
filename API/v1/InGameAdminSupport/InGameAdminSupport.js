let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameAdminSupportModel = require("./InGameAdminSupportModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
module.exports = function (app) {
    app.get('/Api/v1/InGameAdminSupport/', function (req, res) {
        InGameAdminSupportModel.InGameAdminSupport(function(response){
            res.send(response);
        });
    });
}