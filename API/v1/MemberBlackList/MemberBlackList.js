let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");

var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) { //SELECTION
  app.get('/Api/v1/MembersBlackList/UserAccountID/:UserAccountID', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    let UserAccountIDExist = false;
    let RegisteredDate = undefined;
    let UserInfoExist = false;
    let PlayerExist = false;
    let Name = undefined;
    let ScreenName = undefined;
    let PlayerRelationshipResult = undefined;
    let PlayerBlackListResult = undefined; //the userAccount Must be a Player Type to have result

    if (!isNullOrEmpty(UserAccountID)) {
      async.series([UserAccountCheck, UserInfoCheck, PlayerCheck, GetParentPlayerLookUp, GetBlackListUserAccountID], function (error, response) {
        if (UserAccountIDExist == true) {
          if (UserInfoExist == true) {
            if (PlayerExist == true) {
              if (PlayerRelationshipResult != undefined) {
                let MembersBlackListItem = PlayerRelationshipResult;
                MembersBlackListItem.ScreenName = ScreenName;
                MembersBlackListItem.Name = Name;
                MembersBlackListItem.PlayerBlackListResult = PlayerBlackListResult;
                if (PlayerBlackListResult != undefined) {
                  res.send(beautify(MembersBlackListItem, null, 2, 100));
                } else {

                  res.send({
                    MembersBlackListResultEmpty: true
                  }); //empty result mean account was never blocked
                }

              } else {
                res.send({
                  PlayerRelationshipResultFailed: true
                });
              }

            } else {
              //its not a player and not blockable  relies on PlayerCheck to find if it's a player or not
              res.send({
                UserAccountIDNotPlayer: false
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
        console.log("UserAccountCheck " + UserAccountID);
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
          if (response != undefined) {
            UserAccountIDExist = true;
            RegisteredDate = response[0].updatedAt;
            callback(null, '1');
          } else {
            UserAccountIDExist = false;
            callback(null, '1');
          }
        });
      }

      function UserInfoCheck(callback) {
        if (UserAccountIDExist == true) {
          DBCheck.UserInfoUserAccountID(UserAccountID, function (response) {
            if (response != undefined) {
              UserInfoExist = true;
              callback(null, '2');
            } else {
              UserInfoExist = false;
              callback(null, '2');
            }
          });
        } else {
          callback(null, '2');
        }

      }

      function PlayerCheck(callback) {
        if (UserInfoExist == true) {
          DBCheck.PlayerUserAccountID(UserAccountID, function (response) {
            if (response != undefined && response.length > 0) {
              PlayerExist = true;
              Name = response[0].Name;
              ScreenName = response[0].ScreenName;
              callback(null, '3');
            } else {
              PlayerExist = false;
              callback(null, '3');
            }
          });
        } else {
          callback(null, '3');
        }

      }

      function GetParentPlayerLookUp(callback) {
        if (PlayerExist == true) {
          DBCheck.GetParentRelationshipPlayerUserAccountID(UserAccountID, function (response) {
            if (response != undefined) {
              PlayerRelationshipResult = response;
              callback(null, '4');
            } else {
              PlayerRelationshipResult = undefined;
              callback(null, '4');
            }
          });
        } else {
          console.log("Not A Player " + UserAccountID);
          callback(null, '4');
        }

      }
      //we can check for blocklisted of other accounts but filter out that its a actual player based on function PlayerCheck result
      function GetBlackListUserAccountID(callback) {
        if (PlayerExist == true) {
          DBCheck.lackListUserAccountID(UserAccountID, function (response) {
            if (response != undefined) {
              PlayerBlackListResult = response;
              callback(null, '5');
            } else {
              PlayerBlackListResult = undefined;
              callback(null, '5');
            }
          });
        } else {
          console.log("Not A Player " + UserAccountID);
          callback(null, '5');
        }
      }
    } else {
      res.send({
        UserAccountIDMissing: true
      });
    }
  });
}