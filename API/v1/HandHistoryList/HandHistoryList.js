let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let HandHistoryListModel = require('./HandHistoryListModel');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { //SELECTION

  app.get('/Api/v1/HandHistoryList/SeasonID/:SeasonID/', function (req, res) { // by season
    res.setHeader('Content-Type', 'application/json');
    let SeasonID = req.params.SeasonID;
    if (!isNullOrEmpty(SeasonID)) {
      HandHistoryListModel.HandHistorySeasonID(SeasonID, function (response) {
        if (response != undefined) {
          res.send(beautify(response, null, 2, 100));
        } else {
          res.send({
            HandHistoryFailed: true
          });
        }
      });
    }
  });

  app.get('/Api/v1/HandHistoryList/UserAccountID/:UserAccountID/SeasonID/:SeasonID/', function (req, res) { // by user Account with season
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    let SeasonID = req.params.SeasonID;
    if (!isNullOrEmpty(UserAccountID)) {
      if (!isNullOrEmpty(SeasonID)) {
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
          if (response == true) {
            HandHistoryListModel.HandHistoryUserAccountID(UserAccountID, SeasonID, function (response) {
              if (response != undefined) {
                res.send(beautify(response, null, 2, 100));
              } else {
                res.send({
                  HandHistoryFailed: true
                });
              }
            });
          } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }
        });
      }
    }
  });
}