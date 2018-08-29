var beautify = require("json-beautify");
module.exports = function (app) {//SELECTION
  app.get('/Api/v1/MembersList/UserAccount/UserAccountID/:UserAccountID', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let UserAccountIDExist = false;
    let RegisteredDate = undefined;
    let RegisteredTime = undefined;
    let PlayerRelationshipResult = undefined; // the resulting parents of Player
    let PlayerExist = false;
    let ScreenName = undefined;
    let CurrentPoints = undefined;
    let UserInfoExist = undefined;
    let PhoneNumber = undefined;
    let TelephoneNumber = undefined;
    let LastLogin = undefined;
    if (!isNullOrEmpty(UserAccountID)) {
      async.series([UserAccountCheck, PlayerCheck, UserInfoCheck, GetLatestLogin, GetParentPlayerLookUp], function (error, response) {
        if (UserAccountIDExist != false) {
          if (PlayerExist == true) {
            if (ScreenName != undefined) {
              if (CurrentPoints != undefined) {
                if (UserInfoExist == true) {
                  let MembersListItem = PlayerRelationshipResult;
                  MembersListItem.ScreenName = ScreenName;
                  MembersListItem.CurrentPoints = CurrentPoints;
                  MembersListItem.PhoneNumber = PhoneNumber;
                  MembersListItem.TelephoneNumber = TelephoneNumber;
                  MembersListItem.RegisteredDate = RegisteredDate;
                  MembersListItem.RegisteredTime = RegisteredTime;
                  MembersListItem.LastLogin = LastLogin;
                  res.send(beautify(MembersListItem, null, 2, 100));
                } else {
                  res.send({
                    UserInfoExist: false
                  });
                }
              } else {
                res.send({
                  CurrentPointsMissing: false
                });
              }

            } else {
              res.send({
                ScreenNameMissing: true
              });
            }

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

      function UserAccountCheck(callback) {
        isUserAccountIDExist(UserAccountID, function (response) {
          if (response != undefined) {
            UserAccountIDExist = true;
            RegisteredDate = response[0].RegisteredDate;
            RegisteredTime = response[0].RegisteredTime;
            callback(null, '1');
          } else {
            UserAccountIDExist = false;
            callback(null, '1');
          }
        });
      }

      function PlayerCheck(callback) {
        PlayerUserAccountID(UserAccountID, function (response) {
          if (response != undefined && response.length > 0) {
            PlayerExist = true;
            ScreenName = response[0].ScreenName;
            CurrentPoints = response[0].CurrentPoints;
            callback(null, '2');
          } else {
            PlayerExist = false;
            callback(null, '2');
          }
        });
      }

      function UserInfoCheck(callback) {
        UserInfoUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            UserInfoExist = true;
            PhoneNumber = response[0].PhoneNumber;
            TelephoneNumber = response[0].TelephoneNumber;
            callback(null, '3');
          } else {
            UserInfoExist = false;
            callback(null, '3');
          }
        });
      }

      function GetParentPlayerLookUp(callback) { //Tree Parent of a Player
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

      function GetLatestLogin(callback) {
        LoginHistoryUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            LastLogin = response[0].createdAt;
            callback(null, '5');
          } else {
            LastLogin = undefined;
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