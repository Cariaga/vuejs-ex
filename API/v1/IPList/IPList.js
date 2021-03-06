
let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var IPListModel = require('./IPListModel');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) {//SELECTION
  /*ip list of a user account ID */
 /* app.get('/Api/v1/IPList/UserAccountID/:UserAccountID', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
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
  });*/

  // function IPListLimitOffset(Limit,Offset,res){
  //   IPListModel.IPList(Limit,Offset, function (response) {
  //     if (response != undefined) {
  //       res.send(response);
  //     } else {
  //       let status = 404;
  //       res.status(status).end(http.STATUS_CODES[status]);
  //     }
  //   });
  // }

  // app.get('/Api/v1/IPList/Limit/:Limit/Offset/:Offset/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {//OK
  //   let Limit =req.params.Limit;
  //   let Offset = req.params.Offset;
  //   IPListLimitOffset(Limit,Offset,res);
    
  // });

  // app.post('/Api/v1/IPList/',Security.verifyToken, function (req, res) {//OK
  //   let Limit =req.body.Limit;
  //   let Offset = req.body.Offset;
  //   IPListLimitOffset(Limit,Offset,res);
  // });

  app.post('/Api/v1/IPList/',Security.verifyToken, function (req, res) {//OK
    let Limit =req.params.Limit;
    let Offset = req.params.Offset;
    let Order = req.params.Order;
    let Direction = req.params.Direction;    
    IPListLimitOffsetOrder(Limit,Offset,Order,Direction, res);
  });
  // 
  /*ip list with filtering of offset limit and direction the direction is for the order type */
  app.get('/Api/v1/IPList/Limit/:Limit/Offset/:Offset/Order/:Order/Direction/:Direction',Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {//OK
    let Limit =req.params.Limit;
    let Offset = req.params.Offset;
    let Order = req.params.Order;
    let Direction = req.params.Direction;
    
    IPListLimitOffsetOrder(Limit,Offset,Order,Direction,res);
  });

  function IPListLimitOffsetOrder(Limit,Offset,Order,Direction,res){
    if(!isNullOrEmpty(Limit)){
      if(!isNullOrEmpty(Offset)){
        if(!isNullOrEmpty(Direction)){
          if(!isNullOrEmpty(Order)){
            IPListModel.IPList2(Limit,Offset,Order,Direction,function(response){
              if (response != undefined) {
                res.send(response);
              } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);}
            });
          }else{
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]); }
        }else{
          let status = 404;
          res.status(status).end(http.STATUS_CODES[status]); }
      }else{
        let status = 404;
        res.status(status).end(http.STATUS_CODES[status]); }
    }else{
      let status = 404;
      res.status(status).end(http.STATUS_CODES[status]); }
  }
  

  function IPListSearch(Column,Value,res){
    if (!isNullOrEmpty(Column)) {
      if (!isNullOrEmpty(Value)) {
        IPListModel.IPListSearch(Column, Value, function (response) {
          if (response != undefined) {
            res.send(response);
          } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
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
  }
  /*filitering specific column or proprety with a specific value */
  app.get('/Api/v1/IPList/Search/Column/:Column/Value/:Value', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;
    IPListSearch(Column,Value,res);
  });
  app.post('/Api/v1/IPList/Search/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken, function (req, res) {
    let Column = req.body.Column;
    let Value = req.body.Value;
    IPListSearch(Column,Value,res);
  });
}