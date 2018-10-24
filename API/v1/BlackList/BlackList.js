let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let BlackListModel = require("../BlackList/BlackListModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
  function BlackListLimitOffset(Limit,Offset,res){
    if (!isNullOrEmpty(Limit) && !isNullOrEmpty(Offset)) {
      BlackListModel.BlackList(Limit, Offset, function (response) {
        res.send(response);
      });
    } else if (isNullOrEmpty(Limit) && isNullOrEmpty(Offset)) {
      BlackListModel.BlackList(undefined, undefined, function (response) {
        res.send(response);
      });
    }
  }
  //SELECTION
  app.get('/Api/v1/BlackList/Limit/:Limit/Offset/:Offset/',Security.verifyToken, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;
    BlackListLimitOffset(Limit,Offset,res);
  });
  app.get('/Api/v1/BlackList/', function (req, res) {//test connection only
    res.setHeader('Content-Type', 'application/json');
    BlackListLimitOffset(10,0,res);
  });
  app.post('/Api/v1/BlackList/',Security.verifyToken, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Limit = req.body.Limit;
    let Offset = req.body.Offset;
    BlackListLimitOffset(Limit,Offset,res);
  });
  function BlackListUpdate(BlackListID,UserAccountID){
    if (!isNullOrEmpty(BlackListID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
          if (response == true) {
            BlackListModel.BlackListStatusUpdate(BlackListID, UserAccountID, function (response) {
              console.log("Status Set");
              if (response != undefined) {
                res.send(response);
              } else {
                res.send({
                  BlackListStatusUpdateFailed: true
                });
              }
            });
          } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }
        });
      } else {
        res.send("Missing UserAccountID " + UserAccountID);
      }
    } else {
      res.send("Missing BlackListID " + BlackListID);
    }
  }
  //MODIFY / release
  app.get('/Api/v1/BlackList/Update/BlackListID/:BlackListID/UserAccountID/:UserAccountID/',Security.verifyToken, function (req, res) {
    let BlackListID = req.params.BlackListID;
    let UserAccountID = req.params.UserAccountID;
    BlackListUpdate(BlackListID,UserAccountID,res);
  });
  app.post('/Api/v1/BlackList/Update/',Security.verifyToken, function (req, res) {
    let BlackListID = req.params.BlackListID;
    let UserAccountID = req.params.UserAccountID;
    BlackListUpdate(BlackListID,UserAccountID,res);
  });

  //add user to black list
  app.get('/Api/v1/BlackList/Add/UserAccountID/:UserAccountID/Reason/:Reason/', function (req, res) { //OK
    let UserAccountID = req.params.UserAccountID;
    let Reason = req.params.Reason;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Reason)) {
        DBCheck.isUserAccountIDBlocked(UserAccountID, function (response) {
          if (response == true) {
            BlackListModel.AddBlackList(UserAccountID, Reason, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                res.send({
                  AddBlackListFailed: true
                });
              }
            });
          } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }
        });
      } else {
        res.send({
          DescriptionMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });
  function BlackListSearch(Column,Value,res){
    if (!isNullOrEmpty(Column)) {
      if (!isNullOrEmpty(Value)) {
        BlackListModel.BlacklistSearch(Column, Value, function (response) {
          if (response != undefined) {
            res.send(response);
          } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }
        });
      } else {
        res.send({
          InvalidValue: true
        });
      }
    } else {
      res.send({
        InvalidColumn: true
      });
    }
  }
  app.get('/Api/v1/BlackList/Search/Column/:Column/Value/:Value',Security.verifyToken, function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;

    BlackListSearch(Column,Value,res);
  });
  app.post('/Api/v1/BlackList/Search/',Security.verifyToken, function (req, res) {
    let Column = req.body.Column;
    let Value = req.body.Value;
    BlackListSearch(Column,Value,res);
  });
  function BlackListUserAccount(UserAccountID){
    if (!isNullOrEmpty(UserAccountID)) {
      DBCheck.isUserAccountIDUserNameBlocked(UserAccountID, UserName, function (response) {
        if (response != undefined) {
          res.send(response);
        } else {
          let status = 404;
          res.status(status).end(http.STATUS_CODES[status]);
        }
      });
    } else {
      res.send({
        InvalidColumn: true
      });
    }
  }
  app.get('/Api/v1/BlackList/Check/Blocked/UserAccountID/:UserAccountID/UserName/:UserName/',Security.verifyToken, function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let UserName = req.params.UserName;
    BlackListUserAccount(UserAccountID,UserName,res);   
  });
  //user inquire
  app.post('/Api/v1/BlackList/Check/Blocked/',Security.verifyToken, function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let UserName = req.params.UserName;
    BlackListUserAccount(UserAccountID,UserName,res);   
  });
}