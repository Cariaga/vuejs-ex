let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let NotificationModel = require("../Notification/NotificationModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { //INSERT
  app.get('/Api/v1/Notification/Add/NotificationType/:NotificationType/Title/:Title/Description/:Description/Status/:Status', Security.globalBruteforce.prevent, function (req, res) {
    let NotificationType = req.params.NotificationType;
    let Title = req.params.Title;
    let Description = req.params.Description;
    let Status = req.params.Status;
    //USAGE Api/v1/Notification/Add/NotificationType/Title/Description/01:57:17/2018-06-27

    if (!isNullOrEmpty(NotificationType)) {
      if (!isNullOrEmpty(Title)) {
        if (!isNullOrEmpty(Description)) {
            if (!isNullOrEmpty(Status)) {
              NotificationModel.AddNotification(NotificationType, Title, Description, Status, function (response) {
                if (response != undefined) {
                  res.send(response);
                } else {
                  res.send({
                    AddNotificationFailed: true
                  });
                }
              });
            } else {
              res.send({
                StatusMissing: true
              });
            }
        } else {
          res.send({
            DescriptionMissing: true
          });
        }
      } else {
        res.send({
          TitleMissing: true
        });
      }
    } else {
      res.send({
        NotificationTypeMissing: true
      });
    }
  });
  //MODIFY
  app.get('/Api/v1/Notification/Update/NotificationID/:NotificationID/NotificationType/:NotificationType/Title/:Title/Description/:Description/Status/:Status/', Security.globalBruteforce.prevent, function (req, res) {
    let NotificationID = req.params.NotificationID;
    let NotificationType = req.params.NotificationType;
    let Title = req.params.Title;
    let Description = req.params.Description;
    let Status = req.params.Status;
    NotificationModel.NotificationUpdate(NotificationID, NotificationType, Title, Description, Status, function (response) {
      res.send(response);
    });
  });
  function NotificationSearch(Column,Value,res){
    if (!isNullOrEmpty(Column)) {
      if (!isNullOrEmpty(Value)) {
        NotificationModel.NotificationSearch(Column, Value, function (response) {
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
  app.get('/Api/v1/Notification/Search/Column/:Column/Value/:Value', Security.globalBruteforce.prevent,Security.verifyToken, function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;
    NotificationSearch(Column,Value,res);
    
  });
  app.post('/Api/v1/Notification/Search/',Security.verifyToken, function (req, res) {
    let Column = req.body.Column;
    let Value = req.body.Value;
    NotificationSearch(Column,Value,res);
    
  });
  
}