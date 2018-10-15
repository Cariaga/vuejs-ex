let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
let OneOnOneModel = require('../OneOnOne/OneOnOneModel')
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { //SELECTION
  function OneOnOneOffetLimit(Limit, Offset,res){
    OneOnOneModel.OneOnOne(Limit, Offset, function (response) {
      if (response != undefined) {
        res.send(response);
      } else {
        let status = 404;
        res.status(status).end(http.STATUS_CODES[status]);
      }
    });
  }
  app.get('/Api/v1/OneOnOne/Limit/:Limit/Offset/:Offset/',Security.verifyToken, function (req, res) { //OK
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;
    OneOnOneOffetLimit(Limit,Offset,res);
  });
  app.post('/Api/v1/OneOnOne/',Security.verifyToken, function (req, res) { //OK
    let Limit = req.body.Limit;
    let Offset = req.body.Offset;
    OneOnOneOffetLimit(Limit,Offset,res);
  });

  app.get('/Api/v1/OneOnOne/Search/Column/:Column/Value/:Value', function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;

    if (!isNullOrEmpty(Column)) {
      if (!isNullOrEmpty(Value)) {
        OneOnOneModel.SupportSearch(Column, Value, function (response) {
          if (response != undefined) {
            console.log("Found");
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
  });

  app.get('/Api/v1/OneOnOne/SupportTicketID/:SupportTicketID/UserAccountID/:UserAccountID/Answer/:Answer/', function (req, res) {
    let SupportTicketID = req.params.SupportTicketID;
    let UserAccountID = req.params.UserAccountID;
    let Answer = req.params.Answer;
    
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
  });
  //write notice 
  app.get('/Api/v1/OneOnOne/UserAccountID/:UserAccountID/SupportTicketID/:SupportTicketID/', function (req, res) {
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
  app.get('/Api/v1/OneOnOne/WriteSupportAnswer/SupportTicketID/:SupportTicketID/UserAccountID/:UserAccountID/Answer/:Answer/', function (req, res) {
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