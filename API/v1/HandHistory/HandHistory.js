let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let HandHistoryModel = require("../HandHistory/HandHistoryModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var async = require("async");
let http = require('http');
module.exports = function (app) { //MODIFY

  //INSERT
  app.get('/Api/v1/HandHistory/Add/UserAccountID/:UserAccountID/MoveHand/:MoveHand/SeasonID/:SeasonID/', function (req, res) { //ok
    let UserAccountID = req.params.UserAccountID;
    let MoveHand = req.params.MoveHand;
    let SeasonID = req.params.SeasonID;
    if (!isNullOrEmpty(SeasonID)) {
      if (!isNullOrEmpty(UserAccountID)) {

        if (!isNullOrEmpty(MoveHand)) {

          if (MoveHand == "Fold" || MoveHand == "Call" || MoveHand == "Raise" || MoveHand == "Check") {
            HandHistoryModel.AddHandHistory(UserAccountID, SeasonID, MoveHand, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                res.send({
                  AddHandHistoryFailed: true
                });
              }
            });
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
  });
  //SELECTION
  app.get('/Api/v1/HandHistory/UserAccountID/:UserAccountID/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    if (!isNullOrEmpty(UserAccountID)) {
      HandHistoryModel.HandHistoryUserAccountID(UserAccountID, function (response) {
        res.send(response);
      });
    }
  });
  app.get('/Api/v1/HandHistory/SeasonID/:SeasonID/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let SeasonID = req.params.SeasonID;
    if (!isNullOrEmpty(SeasonID)) {
      HandHistoryModel.HandHistorySeasonID(SeasonID, function (response) {
        res.send(response);
      });
    }
  });

}