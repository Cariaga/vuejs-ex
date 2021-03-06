let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let BlackListModel = require("../BlackList/BlackListModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
/*this routes is for retriving and filtering a list of black list of user accounts  */
module.exports = function (app) {
  // function BlackListLimitOffset(Limit,Offset,res){
  //   if (!isNullOrEmpty(Limit) && !isNullOrEmpty(Offset)) {
  //     BlackListModel.BlackList(Limit, Offset, function (response) {
  //       res.send(response);
  //     });
  //   } else if (isNullOrEmpty(Limit) && isNullOrEmpty(Offset)) {
  //     BlackListModel.BlackList(undefined, undefined, function (response) {
  //       res.send(response);
  //     });
  //   }
  // }
  //SELECTION
  /*selection of blacklist accounts limit is the number of rows while offset is the starting point of the array */
  // app.get('/Api/v1/BlackList/Limit/:Limit/Offset/:Offset/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
  //   res.setHeader('Content-Type', 'application/json');
  //   let Limit = req.params.Limit;
  //   let Offset = req.params.Offset;
  //   BlackListLimitOffset(Limit,Offset,res);
  // });

  /*selection of blacklist accounts limit is the number of rows while offset is the starting point of the array */
  app.get('/Api/v1/BlackList/Limit/:Limit/Offset/:Offset/Order/:Order/Direction/:Direction', Security.verifyToken, Management.RouteCalled, Security.checkValues, Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let Limit =req.params.Limit;
    let Offset = req.params.Offset;
    let Order = req.params.Order;
    let Direction = req.params.Direction;
    BlackListLimitOffsetOrder(Limit,Offset,Order,Direction,res);
  });

  function BlackListLimitOffsetOrder(Limit,Offset,Order,Direction,res){
    BlackListModel.BlackList2(Limit, Offset, Order, Direction, function (response) {
      if(response != undefined){
        res.status(200).send(response);
      }else{
        res.status(404).send('Not Found')
      }
    });
  }
  

  /*this route is for testing only */
  app.get('/Api/v1/BlackList/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {//test connection only
    res.setHeader('Content-Type', 'application/json');
    BlackListLimitOffset(10,0,res);
  });
  app.get('/Api/v1/BlackList/withtoken', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {//test connection only
    res.setHeader('Content-Type', 'application/json');
    BlackListLimitOffset(10,0,res);
  });
  app.post('/Api/v1/BlackList/withtokenpost', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {//test connection only
    res.setHeader('Content-Type', 'application/json');
    BlackListLimitOffset(10,0,res);
  });
  app.post('/Api/v1/BlackList/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Limit = req.body.Limit;
    let Offset = req.body.Offset;
    BlackListLimitOffset(Limit,Offset,res);
  });


  //MODIFY / release
  /*to update and release the user account from the black list */
  app.get('/Api/v1/BlackList/Release/UserName/:UserName/',Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let UserName = req.params.UserName;

    if (!isNullOrEmpty(UserName)) {
      DBCheck.isUserNameExistThenGetUserAccountID(UserName, function (response) {
        if (response != undefined) {
          let UserAccountID = response[0].UserAccountID
          BlackListModel.BlackListStatusUpdate(UserAccountID, function (response) {
            if (response) {
              res.send(response);
            } else {
              res.send({
                BlackListStatusUpdateFailed: true
              });
            }
          });
        } else {
          let status = 404;
          res.status(status).end(http.STATUS_CODES[status]);
        }
      });
    } else {
      res.send("Missing UserName " + UserName);
    }
  
  });



  //add user to black list
  /*to add a new blacklist account given the username exist and reason for blocking the user account */
  app.get('/Api/v1/BlackList/Add/UserName/:UserName/Reason/:Reason/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) { //OK
    let UserName = req.params.UserName;
    let Reason = req.params.Reason;
    if (!isNullOrEmpty(UserName)) {
      if (!isNullOrEmpty(Reason)) {
        DBCheck.isUserNameBlocked(UserName, function (response) {
          if (response == false) {
            DBCheck.isUserNameExistThenGetUserAccountID(UserName, function(response){// we check if the user account exist but we also return the user account ID
              if(response != undefined){
                console.log('username exists');
                let UserAccountID = response[0].UserAccountID;
                BlackListModel.AddBlackList(UserAccountID, Reason, function (response) {
                  if (response != undefined) {
                    res.send(response);
                  } else {
                    console.log('addblacklist failed');
                    res.send({
                      AddBlackListFailed: true
                    });
                  }
                });

              }else{
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
              }
            });
          } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }
        });
      } else {
        res.send({
          DescriptionMissing: true
        });
      }
    } else {
      res.send({
        UserNameMissing: true
      });
    }
  });
  function BlackListSearch(Column,Value,res){
    if (!isNullOrEmpty(Column)) {
      if (!isNullOrEmpty(Value)) {
        BlackListModel.BlacklistSearch(Column, Value, function (response) {
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
  // Management.RouteCalled,Security.rateLimiterMiddleware,
  app.get('/Api/v1/BlackList/Search/Column/:Column/Value/:Value',Management.RouteCalled, Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;

    BlackListSearch(Column,Value,res);
  });
  app.post('/Api/v1/BlackList/Search/',Management.RouteCalled,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.body.Column;
    let Value = req.body.Value;
    BlackListSearch(Column,Value,res);

  });


  //user inquire Username AND Screen name
  app.get('/Api/v1/BlackList/Check/Blocked/UserName/:UserName/ScreenName/:ScreenName/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let UserName = req.params.UserName;
    let ScreenName = req.params.ScreenName;
    BlackListUserAccount(UserName,ScreenName,res);   
  });
  
  /*test only */
  app.post('/Api/v1/BlackList/Check/Blocked/2', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let UserName = req.params.UserName;
    let ScreenName = req.params.ScreenName;
    BlackListUserAccount(UserName,ScreenName,res);   
  });

  function BlackListUserAccount(UserName, ScreenName, res){
    if (!isNullOrEmpty(UserName)) {
      if(!isNullOrEmpty(ScreenName)){
        DBCheck.isUserAccountIDUserNameBlocked(UserName, ScreenName, function (response) {
          if (response != undefined) {
            res.send(response);
          } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }
        });
      }else{
        res.send({
          ScreenNameIsEmpty: true
        });
      }
    } else {
      res.send({
        UserNameIsEmpty: true
      });
    }
  }
  // user inquire end

  //user inquire Username OR Screen name
  /*test only */
  app.get('/Api/v1/BlackList/Check/Blocked/1/Column/:Column/Value/:Value/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;
    CheckIfBlocked(Column,Value,res);
  });

  app.get('/Api/v1/BlackList/CheckSample/Blocked/1/Column/:Column/Value/:Value/', Security.checkValues, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    
  });

  app.post('/Api/v1/BlackList/CheckSample/Blocked/1', Security.checkValues, function (req, res) {
    let Column = req.body.Column;
    let Value = req.body.Value;
    res.setHeader('Content-Type', 'application/json');
  });

  /*test only */
  app.post('/Api/v1/BlackList/Check/Blocked/1', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;
    CheckIfBlocked(Column,Value,res);
  });

  function CheckIfBlocked(Column, Value, res){
    if (!isNullOrEmpty(Column)) {
      if(!isNullOrEmpty(Value)){

        DBCheck.isPlayerAccountBlocked(Column, Value, function (response) {
          if (response != undefined) {
            res.send(response);
          } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }
        });
      }else{
        res.send({
          ValueIsEmpty: true
        });
      }
    } else {
      res.send({
        ColumnIsEmpty: true
      });
    }
  }
  // user inquire end

}