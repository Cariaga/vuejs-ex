let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let NotificationModel = require("../Notification/NotificationModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) { //INSERT


  //only certain allowed paramters 
  //for location we have ALLRoms,Room1 to 10... and NotificationType,Header,SideLeftPanel 
  app.get('/Api/v1/Notification/Update/NotificationType/:NotificationType/Location/:Location/Title/:Title/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let NotificationType = req.params.NotificationType;
    let Title = req.params.Title;
    let Location = req.params.Location;
    let Status = req.params.Status;//Intentionally Missing for now
    let Description = req.params.Description;//Intentionally Missing for now
    UpdateNotification(NotificationType, Title, Description, Status, Location, res);
  });
  //updating notification on specific column and location
  app.post('/Api/v1/Notification/Update/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let NotificationType = req.body.NotificationType;
    let Title = req.body.Title;
    let Location = req.body.Location;
    let Status = req.body.Status;//Intentionally Missing for now
    let Description = req.body.Description;//Intentionally Missing for now
    UpdateNotification(NotificationType, Title, Description, Status, Location, res);
  });
  function UpdateNotification(NotificationType, Title, Description, Status, Location, res) {
    NotificationModel.NotificationUpdate2(NotificationType, Title, Description, Status, Location, function (response) {
      if (response != undefined) {
        res.sendStatus(200);
      }
      else {
        res.sendStatus(404);
      }
    });
  }

/*Possibly deprecated due to new schema */
  /*
  app.get('/Api/v1/Notification/Add/NotificationType/:NotificationType/Title/:Title/Description/:Description/Status/:Status', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
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
  app.get('/Api/v1/Notification/Update/NotificationID/:NotificationID/NotificationType/:NotificationType/Title/:Title/Description/:Description/Status/:Status/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
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
  app.get('/Api/v1/Notification/Search/Column/:Column/Value/:Value', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;
    NotificationSearch(Column,Value,res);
    
  });
  app.post('/Api/v1/Notification/Search/',Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.body.Column;
    let Value = req.body.Value;
    NotificationSearch(Column,Value,res);
    
  });
  */
}


