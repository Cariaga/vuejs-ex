
let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let HandHistoryListModel = require('./HandHistoryListModel');
module.exports = function (app) {//SELECTION

  app.get('/Api/v1/HandHistoryList/SeasonID/:SeasonID/', function (req, res) {// by season
    res.setHeader('Content-Type', 'application/json');
    let SeasonID = req.params.SeasonID;
      if(!isNullOrEmpty(SeasonID)){
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

  app.get('/Api/v1/HandHistoryList/UserAccountID/:UserAccountID/SeasonID/:SeasonID/', function (req, res) {// by user Account with season
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    let SeasonID = req.params.SeasonID;
    if (!isNullOrEmpty(UserAccountID)) {
      if(!isNullOrEmpty(SeasonID)){
        HandHistoryListModel.HandHistoryUserAccountID(UserAccountID,SeasonID, function (response) {
          if (response != undefined) {
            res.send(beautify(response, null, 2, 100));
          } else {
            res.send({
              HandHistoryFailed: true
            });
          }
        });
      }

     
     

     /* let UserAccountIDExist = false;
      async.series([UserAccountIDCheck], function (error, response) {
        if (UserAccountIDExist == true) {
          HandHistoryModel.HandHistoryUserAccountID(UserAccountID, function (response) {
            if (response != undefined) {
              res.send(beautify(response, null, 2, 100));
            } else {
              res.send({
                HandHistoryFailed: true
              });
            }
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
          if (!isNullOrEmpty(obj) && obj != undefined && obj[0].UserAccountID == UserAccountID) {
            UserAccountIDExist = true;
            callback(null, '1');
          } else {
            UserAccountIDExist = false;
            callback(null, '1');
          }
        });
      }*/
    }
  });
}
