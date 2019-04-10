let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
let OneOnOneModel = require('../OneOnOne/OneOnOneModel')
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) { //SELECTION
  function OneOnOneOffetLimitOrder(Limit,Offset, Order, Direction, res){
    OneOnOneModel.OneOnOne(Limit,Offset, Order, Direction, function (response) {
      if (response != undefined) {
        res.send(response);
      } else {
        let status = 404;
        res.status(status).end(http.STATUS_CODES[status]);
      }
    });
  }

  app.get('/Api/v1/OneOnOne/Limit/:Limit/Offset/:Offset/Order/:Order/Direction/:Direction', Security.verifyToken, Security.checkValues, Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) { //OK
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;
    let Order = req.params.Order;
    let Direction = req.params.Direction;
    OneOnOneOffetLimitOrder(Limit,Offset, Order, Direction, res);
  });
  app.post('/Api/v1/OneOnOne/',Security.verifyToken, Security.checkValues, Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) { //OK
    let Limit = req.body.Limit;
    let Offset = req.body.Offset;
    let Order = req.body.Order;
    let Direction = req.body.Direction;
    OneOnOneOffetLimitOrder(Limit,Offset, Order, Direction, res);
  });


  function OneOnOneSearch(Column,Value,res){
    OneOnOneModel.SupportSearch(Column, Value, function (response) {
      if (response != undefined) {
        console.log("Found");
        res.send(response);
      } else {
        let status = 404;
        res.status(status).end(http.STATUS_CODES[status]);
      }
    });
  }
  app.get('/Api/v1/OneOnOne/Search/Column/:Column/Value/:Value',Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;
    OneOnOneSearch(Column,Value,res);

  });
  app.post('/Api/v1/OneOnOne/Search/',Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.body.Column;
    let Value = req.body.Value;
    OneOnOneSearch(Column,Value,res);

  });
  function OneOnOneAnswer(SupportTicketID,UserAccountID,Answer,res){
    if(!isNullOrEmpty(SupportTicketID)){
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(Answer)) {
          DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {
              OneOnOneModel.WriteSupportAnswerUpdate(SupportTicketID, UserAccountID, Answer, function (response) {
                if (response != undefined) {
                  res.send(response);
                } else {
                  let status = 404;
                  res.status(status).end(http.STATUS_CODES[status]);
                }
              });
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
    }else {
      res.send({
        InvalidSupportTicketID: true
      });
    }
  }
  app.get('/Api/v1/OneOnOne/SupportTicketID/:SupportTicketID/UserAccountID/:UserAccountID/Answer/:Answer/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let SupportTicketID = req.params.SupportTicketID;
    let UserAccountID = req.params.UserAccountID;
    let Answer = req.params.Answer;
    OneOnOneAnswer(SupportTicketID,UserAccountID,Answer,res);

  });
  app.post('/Api/v1/OneOnOne/',Security.verifyToken, function (req, res) {
    let SupportTicketID = req.params.SupportTicketID;
    let UserAccountID = req.params.UserAccountID;
    let Answer = req.params.Answer;
    OneOnOneAnswer(SupportTicketID,UserAccountID,Answer,res);

  });
  //write notice 
  app.get('/Api/v1/OneOnOne/UserAccountID/:UserAccountID/SupportTicketID/:SupportTicketID/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let SupportTicketID = req.params.SupportTicketID;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(SupportTicketID)) {
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
          if (response == true) {
            OneOnOneModel.WriteSupportTicketID(UserAccountID, SupportTicketID, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                res.send(undefined);
              }
            });
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
  });
  //write notice 
  app.get('/Api/v1/OneOnOne/WriteSupportAnswer/SupportTicketID/:SupportTicketID/UserAccountID/:UserAccountID/Answer/:Answer/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let SupportTicketID = req.params.SupportTicketID;
    let UserAccountID = req.params.UserAccountID;
    let Answer = req.params.Answer;

    if (!isNullOrEmpty(SupportTicketID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(Answer)) {
          DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {
              OneOnOneModel.WriteSupportAnswerUpdate(SupportTicketID, UserAccountID, Answer, function (response) {
                if (response != undefined) {
                  res.send(response);
                } else {
                  let status = 404;
                  res.status(status).end(http.STATUS_CODES[status]);
                }
              });
            } else {
              let status = 404;
              res.status(status).end(http.STATUS_CODES[status]);
            }
          });
        } else {
          res.send({
            InvalidAnswer: true
          });
        }
      } else {
        res.send({
          InvalidUserAccountID: true
        });
      }
    } else {
      res.send({
        InvalidSupportTicketID: true
      });
    }
  });
}