let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var isNullOrEmpty = require('is-null-or-empty');
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');
let VerificationModel = require("./VerificationModel");
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
  app.get('/Verify/UserName/:UserName/Key/:Key', function (req, res) {
    let UserName = req.params.UserName;
    let Key = req.params.Key;
    if(!isNullOrEmpty(UserName)){
      if(!isNullOrEmpty(Key)){
        VerificationModel.VerifyAccount(UserName,Key,function(response){
          res.send("verified");
        });
      }
    }
  });
}
