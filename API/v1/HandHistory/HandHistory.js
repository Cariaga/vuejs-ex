let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let HandHistoryModel = require("../HandHistory/HandHistoryModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) {//MODIFY
  app.get('/Api/v1/HandHistory/Update/HandHistoryID/:HandHistoryID/UserAccountID/:UserAccountID/MoveHand/:MoveHand/RoundID/:RoundID/', function (req, res) {
    let RoundID = req.params.RoundID;
    let HandHistoryID = req.params.HandHistoryID;
    let UserAccountID = req.params.UserAccountID;
    let MoveHand = req.params.UserAccountID;

    if (!isNullOrEmpty(RoundID)) {
      if (!isNullOrEmpty(HandHistoryID)) {
        if (!isNullOrEmpty(UserAccountID)) {
          if (!isNullOrEmpty(MoveHand)) {
            HandHistoryModel.HandHistoryUpdate(HandHistoryID, UserAccountID, MoveHand, RoundID, function (response) {
              if (response != undefined) {
                res.send(response);
              } else {
                res.send({
                  HandHistoryUpdateFailed: true
                });
              }
            });
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
          HandHistoryIDMissing: true
        });
      }
    } else {
      res.send({
        RoundIDMissing: true
      });
    }

  });
  //INSERT
  app.get('/Api/v1/HandHistory/Add/UserAccountID/:UserAccountID/MoveHand/:MoveHand/SeasonID/:SeasonID/', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let MoveHand = req.params.MoveHand;
    let RoundID = req.params.RoundID;
    if (!isNullOrEmpty(RoundID)) {
      if (!isNullOrEmpty(UserAccountID)) {

        if (!isNullOrEmpty(MoveHand)) {

          if (MoveHand == "Fold" || MoveHand == "Call" || MoveHand == "Raise" || MoveHand == "Check") {
            let UserAccountIDExist = false;
            let PlayerExist = false;
            async.series([UserAccountIDCheck, PlayerCheck], function (error, response) {

              if (UserAccountIDExist == true) {
                if (PlayerExist == true) {
                  HandHistoryModel.AddHandHistory(UserAccountID,SeasonID, MoveHand, function (response) {
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
                    PlayerExist: false
                  });
                }
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
            }

            function PlayerCheck(callback) {
              DBCheck.PlayerUserAccountID(UserAccountID, function (response) {

                if (response != undefined) {
                  PlayerExist = true;
                  callback(null, '1');
                } else {
                  PlayerExist = false;
                  callback(null, '1');
                }
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
  });
//SELECTION
  app.get('/Api/v1/HandHistory/UserAccountID/:UserAccountID', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (!isNullOrEmpty(UserAccountID)) {
      HandHistoryModel.HandHistoryUserAccountID(UserAccountID, function (response) {
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
//STRUCTURE
  app.get('/Api/v1/HandHistory/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.HandHistory.sync(); //Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.HandHistory.describe().then(result => {
      res.send(beautify(result, null, 2, 100));
    });
  });
}


