var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var isNullOrEmpty = require('is-null-or-empty');
let InGameSeasonModel = require('./InGameSeasonModel');
let http = require('http');
let UUID = require('uuid');
module.exports = function(app){//selection
    app.get('/Api/v1/InGameSeason/Request/UserAccountID/:UserAccountID', function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        if(!isNullOrEmpty(UserAccountID)){
            res.send(UUID());
        }
    });
}