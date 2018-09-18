let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let LogOutModel = require("./LogOutModel");
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');
var isNullOrEmpty = require('is-null-or-empty');
var http = require('http');
module.exports = function (app) {
  app.get('/Api/v1/SignOut/UserAccountID/:UserAccountID/', function (req, res) {
    let UserAccountID = req.params.UserAccountID;

    if (!isNullOrEmpty(UserAccountID)) {
      DBCheck.isUserAccountIDExist(UserAccountID,function(response){
        if(response!=undefined){
          LogOutModel.LogOutUserAccount(UserAccountID,function(response){
            let status = 200;
            res.status(status).end(http.STATUS_CODES[status]);
          });
        }else{
          let status = 404;
          res.status(status).end(http.STATUS_CODES[status]);
        }
        
      });
    } else {
   
      let status = 404;
      res.status(status).end(http.STATUS_CODES[status]);
    }
  });
}