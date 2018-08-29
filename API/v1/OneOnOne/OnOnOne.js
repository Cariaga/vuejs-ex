var beautify = require("json-beautify");
module.exports = function (app) {//SELECTION
  app.get('/Api/v1/OneOnOne/UserAccountID/:UserAccountID', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let UserAccountIDExist = false;
    let RegisteredDate = undefined
    let RegisteredTime = undefined;
    let SupportTicketExist = false;
    let Status = undefined;

    let ScreenName = undefined;
    let PlayerExist = undefined;
    let PlayerRelationshipResult = undefined;

    if (!isNullOrEmpty(UserAccountID)) {
      async.series([UserAccountCheck, PlayerCheck, GetParentPlayerLookUp, GetSupportTicketUserAccountID], function (error, response) {
        if (UserAccountIDExist == true) {
          if (PlayerExist == true) {
            if (SupportTicketExist == true) {
              let OneOnOneResult = PlayerRelationshipResult;
              OneOnOneResult.RegisteredDate = RegisteredDate;
              OneOnOneResult.RegisteredTime = RegisteredTime;
              OneOnOneResult.ScreenName = ScreenName;
              OneOnOneResult.Status = Status;
              res.send(OneOnOneResult);
            } else {
              res.send({
                SupportTicketExist: false
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
          if (response != undefined) {
            PlayerExist = true;
            ScreenName = response[0].ScreenName;
            callback(null, '2');
          } else {
            PlayerExist = false;
            callback(null, '2');
          }
        });
      }

      function GetParentPlayerLookUp(callback) { //Tree Parent of a Player
        GetParentRelationshipPlayerUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            PlayerRelationshipResult = response;
            callback(null, '3');
          } else {
            PlayerRelationshipResult = undefined;
            callback(null, '3');
          }
        });
      }

      function GetSupportTicketUserAccountID(callback) {
        SupportTicketUserAccountID(UserAccountID, function (response) {
          if (response != undefined) {
            SupportTicketExist = true;
            Status = response[0].Status;
            callback(null, '4');
          } else {
            SupportTicketExist = false;
            callback(null, '4');
          }
        });
      }
    }
  });
}