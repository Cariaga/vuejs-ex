let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
let OneOnOneModel = require ('../OneOnOne/OneOnOneModel')

module.exports = function (app) { //SELECTION
  app.get('/Api/v1/OneOnOne/', function (req, res) {
    
    OneOnOneModel.SelectAllOneOnOne(function (response){
      res.send(response);
    });

    /*if (!isNullOrEmpty(UserAccountID)) {
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
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
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
        DBCheck.PlayerUserAccountID(UserAccountID, function (response) {
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
        DBCheck.GetParentRelationshipPlayerUserAccountID(UserAccountID, function (response) {
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
        DBCheck.SupportTicketUserAccountID(UserAccountID, function (response) {
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
    }*/
  });

   app.get('/Api/v1/OneOnOne/Search/Column/:Column/Value/:Value', function (req, res) {
     let Column = req.params.Column;
     let Value = req.params.Value;

     if (!isNullOrEmpty(Column)) {
       if (!isNullOrEmpty(Value)) {
         OneOnOneModel.SupportSearch(Column, Value, function (response) {
           if (response != undefined) {
             res.send(response);
           } else {
             res.send(undefined);
           }
         });
       } else {
         res.send({
           InvalidValue: true
         });
       }
     } else {
       res.send({
         InvalidColumn: true
       });
     }
   });
}