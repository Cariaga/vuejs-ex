let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let ProfileModel = require("./ProfileModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var http = require('http');

module.exports = function (app) {
    app.get('/Api/v1/Profile/UserAccountID/:UserAccountID/', function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        ProfileModel.Profile(UserAccountID,function(response){
            res.send(response);
        });
    });
}