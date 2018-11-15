let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let HandHistoryModel = require("../HandHistory/HandHistoryModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var async = require("async");
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { //MODIFY
  
  function AddHandHistory(SeasonID,UserAccountID,MoveHand,Amount,res){
    if (!isNullOrEmpty(SeasonID)) {
      if (!isNullOrEmpty(UserAccountID)) {
        if (!isNullOrEmpty(MoveHand)) {
          if (MoveHand == "Fold" || MoveHand == "Call" || MoveHand == "Raise" || MoveHand == "Check" ||MoveHand =="TimedOut" || MoveHand=="AllIn"|| MoveHand=="BigBlind"||MoveHand=="SmallBlind") {
            if(Amount>=0){
              DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                if (response == true) {
                  //get commission percentages start
                  // HandHistoryModel.getCommissionPercentages(UserAccountID, function(response){
                  //   if(response!=undefined){
                  //     //distribute rake
                  //     console.log(response[0]['UserAccountID'])
                  //     HandHistoryModel.distributeRake(response,Amount, function(distributeResponse){
                  //       if(distributeResponse!=undefined){
                  //         res.send({
                  //           distributeRakeSuccess: true
                  //         });
                  //       }else{
                  //         res.send({
                  //           distributeRakeFailed:false
                  //         });
                  //       }
                  //     });
                  //     //distribute rake end
                  //   }else{
                  //     res.send({
                  //       getCommissionPercentagesFailed: true
                  //     });
                  //   }
                  // });
                  //get commission percentages start end
                  HandHistoryModel.DeductMoneyOnBet(UserAccountID,Amount,function(response){
                      if(response!=undefined){
                        HandHistoryModel.AddHandHistory(UserAccountID, SeasonID, MoveHand,Amount, function (response) {
                          if (response != undefined) {
                            res.send(response);
                          } else {
                            res.send({
                              AddHandHistoryFailed: true
                            });
                          }
                        });
                      }else{
                        res.send({
                          DeductMoneyFailed: true
                        });
                      }
                  });
                 
                } else {
                  res.send({
                    UserAccountNotExist: true
                  });
                }
              });
            }else{
              res.send({
                AmountInvalidValue: true
              });
            }
            

          } else {
            res.send({
              MoveHandInvalidValue: true
            });
          }
        } else {
          res.send({
            MoveHandMissing: true
          });
        }
      } else {
        res.send({
          UserAccountIDMissing: true
        });
      }
    } else {
      res.send({
        RoundIDMissing: true
      });
    }
  }
  //INSERT
  app.get('/Api/v1/HandHistory/Add/UserAccountID/:UserAccountID/MoveHand/:MoveHand/SeasonID/:SeasonID/Amount/:Amount',Security.verifyToken, function (req, res) { //ok
    let UserAccountID = req.params.UserAccountID;
    let MoveHand = req.params.MoveHand;
    let SeasonID = req.params.SeasonID;
    let Amount = parseInt(req.params.Amount);
    AddHandHistory(SeasonID,UserAccountID,MoveHand,Amount,res);
  });

  app.post('/Api/v1/HandHistory/Add/',Security.verifyToken, function (req, res) { 
    let UserAccountID = req.body.UserAccountID;
    let MoveHand = req.body.MoveHand;
    let SeasonID = req.body.SeasonID;
    let Amount = parseInt(req.body.Amount);
    console.log("Player: "+MoveHand +"  Hand : "+MoveHand +" Amount :"+Amount);
    AddHandHistory(SeasonID,UserAccountID,MoveHand,Amount,res);
  });

  //SELECTION
  app.get('/Api/v1/HandHistory/UserAccountID/:UserAccountID/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    if (!isNullOrEmpty(UserAccountID)) {
      DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
        if (response == true) {
          HandHistoryModel.HandHistoryUserAccountID(UserAccountID, function (response) {
            res.send(response);
          });
        } else {
          let status = 404;
          res.status(status).end(http.STATUS_CODES[status]);
        }
      });
    }
  });
  function HandHistorySeasonID(SeasonID,res){
    if (!isNullOrEmpty(SeasonID)) {
      HandHistoryModel.HandHistorySeasonID(SeasonID, function (response) {
        res.send(response);
      });
    }
  }
  app.get('/Api/v1/HandHistory/SeasonID/:SeasonID/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let SeasonID = req.params.SeasonID;
    HandHistorySeasonID(SeasonID,res);
  });
  app.post('/Api/v1/HandHistory/SeasonID/:SeasonID/',Security.verifyToken, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let SeasonID = req.params.SeasonID;
    HandHistorySeasonID(SeasonID,res);
  });
}