let DBConnect = require("../../SharedController/DBConnect");
let DBConnect = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) {//SELECTION

  app.get('/Api/v1/WithdrawList/', function (req, res) {
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
    let WithdrawHistoryExist = false;
    let WithdrawHistoryResult = undefined;
    if (!isNullOrEmpty(UserAccountID)) {
      async.series([UserAccountCheck, UserInfoCheck, PlayerCheck, GetParentPlayerLookUp, GetWithdrawHistory], function (error, response) {
        let WithdrawList = [];
        let WithdrawListItem = PlayerRelationshipResult;
        WithdrawListItem.PhoneNumber = PhoneNumber;
        WithdrawListItem.TelephoneNumber = TelephoneNumber;
        WithdrawListItem.Name = Name;
        WithdrawListItem.ScreenName = ScreenName;
        WithdrawListItem.WithdrawHistory = WithdrawHistoryResult;
        WithdrawListItem.Note = "This is a Mock Up Data we need to iterate all accounts";
        for (let i = 0; i < 1000; ++i) {
          WithdrawList.push(WithdrawListItem);
        }
        res.send(beautify(WithdrawList, null, 2, 100));
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

      function GetWithdrawHistory(callback) {
        WithdrawHistoryUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            WithdrawHistoryResult = response;
            WithdrawHistoryExist = true;
            callback(null, '5');
          } else {
            WithdrawHistoryExist = false;
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
  app.get('/Api/v1/WithdrawList/UserAccountID/:UserAccountID/', function (req, res) {
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
    let WithdrawHistoryExist = false;
    let WithdrawHistoryResult = undefined;
    if (!isNullOrEmpty(UserAccountID)) {
      async.series([UserAccountCheck, UserInfoCheck, PlayerCheck, GetParentPlayerLookUp, GetWithdrawHistory], function (error, response) {
        let WithdrawListItem = PlayerRelationshipResult;
        WithdrawListItem.PhoneNumber = PhoneNumber;
        WithdrawListItem.TelephoneNumber = TelephoneNumber;
        WithdrawListItem.Name = Name;
        WithdrawListItem.ScreenName = ScreenName;
        WithdrawListItem.WithdrawHistory = WithdrawHistoryResult;
        res.send(beautify(WithdrawListItem, null, 2, 100));
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

      function GetWithdrawHistory(callback) {
        WithdrawHistoryUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            WithdrawHistoryResult = response;
            WithdrawHistoryExist = true;
            callback(null, '5');
          } else {
            WithdrawHistoryExist = false;
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
