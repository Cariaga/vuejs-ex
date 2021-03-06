let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let SupportTicketModel = require("../SupportTicket/SupportTicketModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var async = require("async");
var uuidv4 = require('uuid/v4');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) { //INSERT
  /*request a support ticket adding */
  app.get('/Api/v1/SupportTicket/Add/UserAccountID/:UserAccountID/Title/:Title/Description/:Description/Reason/:Reason/Answer/:Answer/Status/:Status', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    ///USAGE /Api/v1/SupportTicket/Add/UserAccountID/6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6/Title/Title/Description/Description/Reason/Reason/Time/01:57:17/Date/2018-06-27/Status/Status
    let UserAccountID = req.params.UserAccountID;
    let Title = req.params.Title;
    let Description = req.params.Description;
    let Reason = req.params.Reason;
    let Answer = req.params.Answer;
    let Status = req.params.Status;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Title)) {
        if (!isNullOrEmpty(Description)) {
          if (!isNullOrEmpty(Reason)) {
            if (!isNullOrEmpty(Answer)) {
              if (!isNullOrEmpty(Status)) {
                DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                  if (response == true) {
                    let UserAccountIDExist = true;
                    async.series([ /*UserAccountIDCheck*/ ], function (error, response) {
                      if (UserAccountIDExist == true) {
                        SupportTicketModel.AddSupportTicket(UserAccountID, Title, Description, Reason, Answer, Status, function (response) {
                          res.send(response);
                        });
                      } else {
                        res.send({
                          UserAccountIDExist: false
                        });
                      }
                    });

                    function UserAccountIDCheck(callback) {
                      DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                        let obj = response;
                        if (!isNullOrEmpty(obj) && obj != undefined && obj.length > 0 && obj[0].UserAccountID == UserAccountID) {
                          UserAccountIDExist = true;
                          callback(null, '1');
                        } else {
                          UserAccountIDExist = false;
                          callback(null, '1');
                        }
                      });
                    }
                  } else {
                    let status = 404;
                    res.status(status).end(http.STATUS_CODES[status]);
                  }
                });
              } else {
                res.send({
                  StatusMissing: true
                });
              }
            } else {
              res.send({
                AnswerMissing: true
              });
            }
          } else {
            res.send({
              ReasonMissing: true
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
        UserAccountIDMissing: true
      });
    }
  });

  //INSERT w/out Answer & Status
  app.get('/Api/v1/SupportTicket/Request/UserAccountID/:UserAccountID/Title/:Title/Reason/:Reason/', Management.RouteCalled,Security.rateLimiterMiddleware, Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Title = req.params.Title;
    let Description = req.params.Description;
    let Reason = req.params.Reason;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Title)) {
        if (!isNullOrEmpty(Reason)) {
          DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {
              SupportTicketModel.RequestSupportTicket(UserAccountID, Title, Reason, function (response) {
                let status = 200;
                res.status(status).end(http.STATUS_CODES[status]);
          
              });
            } else {
              let status = 404;
              res.status(status).end(http.STATUS_CODES[status]);
            }
          });
        } else {
          res.send({
            ReasonMissing: true
          });
        }
      } else {
        res.send({
          TitleMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });
  /*In game request customer support */
  app.get('/Api/v1/SupportTicket/Request/UserAccountID/:UserAccountID/Title/:Title/Reason/:Reason/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Title = req.params.Title;
    let Description = req.params.Description;
    let Reason = req.params.Reason;

    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Title)) {
        if (!isNullOrEmpty(Reason)) {
          DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {
              SupportTicketModel.RequestSupportTicket(UserAccountID, Title, Reason, function (response) {
                res.send(response);
              });
            } else {
              let status = 404;
              res.status(status).end(http.STATUS_CODES[status]);
            }
          });
        } else {
          res.send({
            ReasonMissing: true
          });
        }
      } else {
        res.send({
          TitleMissing: true
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });
  //MODIFY
  app.get('/Api/v1/SupportTicket/Update/SupportTicketID/:SupportTicketID/Answer/:Answer/Status/:Status', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let SupportTicketID = req.params.SupportTicketID;
    let Answer = req.params.Answer;
    let Status = req.params.Status;

    if (!isNullOrEmpty(Answer)) {
      if (!isNullOrEmpty(Status)) {
        SupportTicketModel.SupportTicketUpdate(SupportTicketID, Answer, Status, function (response) {
          if (!isNullOrEmpty(response) && response != undefined) {
            res.send(response);
          } else {
            res.send({
              SupportTicketUpdateFailed: true
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
        AnswerMissing: true
      });
    }
  });
  app.get('/Api/v1/SupportTicket/UserAccountID/:UserAccountID/Status/:Status', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    let Status = req.params.Status;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(Status)) {
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
          if (response == true) {
            SupportTicketModel.SupportTicketUserAccountIDByStatus(UserAccountID, Status, function (response) {
              if (response != undefined) {
                res.send(beautify(response, null, 2, 100));
              } else {
                res.send({
                  SupportTicketUserAccountIDByStatusFailed: true
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
          InvalidStatusType: true
        });
      }
    } else {
      res.send({
        InvalidUserAccountID: true
      });
    }
  });
}