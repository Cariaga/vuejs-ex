
let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var IPListModel = require('./IPListModel');
module.exports = function (app) {//SELECTION
  app.get('/Api/v1/IPList/UserAccountID/:UserAccountID', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    let UserAccountIDExist = false;
    let UserInfoExist = false;
    let PlayerExist = false;
    let PlayerRelationshipResult = undefined;
    let Name = undefined;
    let RegisteredDate = undefined;
    let LoginHistoryResult = undefined;
    if (!isNullOrEmpty(UserAccountID)) {
      async.series([UserAccountCheck, UserInfoCheck, PlayerCheck, GetParentPlayerLookUp, GetLoginHistory], function (error, response) {
        if (UserAccountIDExist == true) {
          if (UserInfoExist == true) {
            if (PlayerExist == true) {
              if (PlayerRelationshipResult != undefined) {
                if (LoginHistoryResult != undefined) {
                  let Result = {
                    UserAccountID: UserAccountID,
                    Name: Name,
                    PlayerRelationshipResult: PlayerRelationshipResult,
                    LoginHistoryResult: LoginHistoryResult
                  };
                  res.send(beautify(Result, null, 2, 100));

                } else {
                  res.send({
                    LoginHistoryResult: false
                  });
                }

              } else {
                res.send({
                  PlayerRelationshipResult: false
                });
              }
            } else {
              res.send({
                PlayerExist: false
              });
            }
          } else {
            res.send({
              UserInfoExist: false
            });
          }
        } else {
          res.send({
            UserAccountIDExist: false
          });
        }

      });

      function UserAccountCheck(callback) {
        // console.log("UserAccountCheck "+ UserAccountID);

        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {

          if (response != undefined) {
            console.log("1");
            UserAccountIDExist = true;
            RegisteredDate = response[0].RegisteredDate;
            callback(null, '1');
          } else {
            UserAccountIDExist = false;
            callback(null, '1');
          }
        });
      }

      function UserInfoCheck(callback) {


        console.log("2");
        DBCheck.UserInfoUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            UserInfoExist = true;
            callback(null, '2');
          } else {
            UserInfoExist = false;
            callback(null, '2');
          }
        });


      }

      function PlayerCheck(callback) {

        console.log("3");
        DBCheck.PlayerUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            PlayerExist = true;
            Name = response[0].Name;
            callback(null, '3');
          } else {
            PlayerExist = false;
            callback(null, '3');
          }
        });


      }

      function GetParentPlayerLookUp(callback) {

        console.log("4");
        DBCheck.GetParentRelationshipPlayerUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            PlayerRelationshipResult = response;
            callback(null, '4');
          } else {
            PlayerRelationshipResult = undefined;
            console.log("Not A Player " + UserAccountID);
            callback(null, '4');
          }
        });
      }

      function GetLoginHistory(callback) {
        DBCheck.LoginHistoryUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            LoginHistoryResult = response;
            callback(null, '5');
          } else {
            LoginHistoryResult = undefined;
            callback(null, '5');
          }
        });
      }
    }
  });
  app.get('/Api/v1/IPList/Min/:Min/Max/:Max', function (req, res) {//OK
    let Min =req.params.Min;
    let Max = req.params.Max;
    IPListModel.IPList(Min,Max, function (response) {
      if (response != undefined) {
        LoginHistoryResult = response;
        callback(null, '5');
      } else {
        LoginHistoryResult = undefined;
        callback(null, '5');
      }
    });
  });
  app.get('/Api/v1/IPList/', function (req, res) {
    IPListModel.IPList(undefined,undefined, function (response) {
      if (response != undefined) {
        res.send(response);
      } else {
        callback([]);
      }
    });
  });
}