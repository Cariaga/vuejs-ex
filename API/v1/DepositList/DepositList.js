let DBConnect = require("../../SharedController/DBConnect");
let DBConnect = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) {
  //NOT DONE temporarly displays arrays
  //we need to retreive all records and branches of each account
  app.get('/Api/v1/DepositList/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = "6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6";
    let PhoneNumber = req.param.PhoneNumber;
    let TelephoneNumber = req.param.TelephoneNumber;
    let UserAccountIDExist = false;
    let UserInfoExist = false;
    let PlayerExist = false;
    let ScreenName = undefined;
    let Name = undefined;
    let PlayerRelationshipResult = undefined;
    let DepositHistoryExist = false;
    let DepositHistoryResult = undefined;
    if (!isNullOrEmpty(UserAccountID)) {
      async.series([UserAccountCheck, UserInfoCheck, PlayerCheck, GetParentPlayerLookUp, GetDepositHistory], function (error, response) {
        let DepositListData = [];

        let DepositListItem = PlayerRelationshipResult;
        DepositListItem.PhoneNumber = PhoneNumber;
        DepositListItem.TelephoneNumber = TelephoneNumber;
        DepositListItem.Name = Name;
        DepositListItem.ScreenName = ScreenName;
        DepositListItem.DepositHistory = DepositHistoryResult;
        DepositListItem.Note = "This is a Mock Up Data we need to iterate all accounts";

        for (let i = 0; i < 1000; ++i) {
          DepositListData.push(DepositListItem);
        }
        res.send(beautify(DepositListData, null, 2, 100));
      });

      function UserAccountCheck(callback) {
        isUserAccountIDExist(UserAccountID, function (response) {
          if (response != undefined) {
            UserAccountIDExist = true;
            callback(null, '1');
          } else {
            UserAccountIDExist = false;
            callback(null, '1');
          }
        });
      }

      function UserInfoCheck(callback) {
        UserInfoUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            UserInfoExist = true;
            PhoneNumber = response[0].PhoneNumber;
            TelephoneNumber = response[0].TelephoneNumber;
            callback(null, '2');
          } else {
            UserInfoExist = false;
            callback(null, '2');
          }
        });
      }

      function PlayerCheck(callback) {
        PlayerUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            PlayerExist = true;
            Name = response[0].Name;
            ScreenName = response[0].ScreenName;
            callback(null, '3');
          } else {
            PlayerExist = false;
            callback(null, '3');
          }
        });
      }

      function GetParentPlayerLookUp(callback) {
        GetParentRelationshipPlayerUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            PlayerRelationshipResult = response;
            callback(null, '4');
          } else {
            PlayerRelationshipResult = undefined;
            callback(null, '4');
          }
        });
      }

      function GetDepositHistory(callback) {
        DepositHistoryUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            DepositHistoryResult = response;
            DepositHistoryExist = true;
            callback(null, '5');
          } else {
            DepositHistoryExist = false;
            callback(null, '5');
          }
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }

  });
  app.get('/Api/v1/DepositList/UserAccountID/:UserAccountID/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    let PhoneNumber = req.param.PhoneNumber;
    let TelephoneNumber = req.param.TelephoneNumber;
    let UserAccountIDExist = false;
    let UserInfoExist = false;
    let PlayerExist = false;
    let ScreenName = undefined;
    let Name = undefined;
    let PlayerRelationshipResult = undefined;
    let DepositHistoryExist = false;
    let DepositHistoryResult = undefined;
    if (!isNullOrEmpty(UserAccountID)) {
      async.series([UserAccountCheck, UserInfoCheck, PlayerCheck, GetParentPlayerLookUp, GetDepositHistory], function (error, response) {
        let DepositListItem = PlayerRelationshipResult;
        DepositListItem.PhoneNumber = PhoneNumber;
        DepositListItem.TelephoneNumber = TelephoneNumber;
        DepositListItem.Name = Name;
        DepositListItem.ScreenName = ScreenName;
        DepositListItem.DepositHistory = DepositHistoryResult;
        res.send(beautify(DepositListItem, null, 2, 100));
      });

      function UserAccountCheck(callback) {
        isUserAccountIDExist(UserAccountID, function (response) {
          if (response != undefined) {
            UserAccountIDExist = true;
            callback(null, '1');
          } else {
            UserAccountIDExist = false;
            callback(null, '1');
          }
        });
      }

      function UserInfoCheck(callback) {
        UserInfoUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            UserInfoExist = true;
            PhoneNumber = response[0].PhoneNumber;
            TelephoneNumber = response[0].TelephoneNumber;
            callback(null, '2');
          } else {
            UserInfoExist = false;
            callback(null, '2');
          }
        });
      }

      function PlayerCheck(callback) {
        PlayerUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            PlayerExist = true;
            Name = response[0].Name;
            ScreenName = response[0].ScreenName;
            callback(null, '3');
          } else {
            PlayerExist = false;
            callback(null, '3');
          }
        });
      }

      function GetParentPlayerLookUp(callback) {
        GetParentRelationshipPlayerUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            PlayerRelationshipResult = response;
            callback(null, '4');
          } else {
            PlayerRelationshipResult = undefined;
            callback(null, '4');
          }
        });
      }

      function GetDepositHistory(callback) {
        DepositHistoryUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            DepositHistoryResult = response;
            DepositHistoryExist = true;
            callback(null, '5');
          } else {
            DepositHistoryExist = false;
            callback(null, '5');
          }
        });
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }

  });
}