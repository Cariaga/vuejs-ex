let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var MemberListModel = require('../MemberList/MemberListModel');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { //SELECTION
  function MembersListLimitOffset(Limit,Offset,res){
    if(!isNullOrEmpty(Limit)){
      if(!isNullOrEmpty(Offset)){
        MemberListModel.MemberList(Limit,Offset,function(response){
          if (response != undefined) {
            res.send(response);
          } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }
        });
      }
    }
  }

  function MembersListLimitOffsetOrder(Limit,Offset,Order,Direction,res){
    if(!isNullOrEmpty(Limit)){
      if(!isNullOrEmpty(Offset)){
        if(!isNullOrEmpty(Direction)){
          if(!isNullOrEmpty(Order)){
            MemberListModel.MemberList2(Limit,Offset,Order,Direction,function(response){
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

  app.get('/Api/v1/MembersList/Limit/:Limit/Offset/:Offset/Order/:Order/Direction/:Direction', Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;
    let Order = req.params.Order;
    let Direction = req.params.Direction;
    MembersListLimitOffsetOrder(Limit,Offset,Order,Direction, res);
  });


  app.get('/Api/v1/MembersList/Limit/:Limit/Offset/:Offset', Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;
    MembersListLimitOffset(Limit,Offset,res);
  });
  app.post('/Api/v1/MembersList/', Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Limit = req.body.Limit;
    let Offset = req.body.Offset;
    MembersListLimitOffset(Limit,Offset,res);
  });
  function MemberListSearch(Column,Value,res){
    if (!isNullOrEmpty(Column)) {
      if (!isNullOrEmpty(Value)) {
        MemberListModel.MemberListSearch(Column, Value, function (response) {
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
  app.get('/Api/v1/MembersList/Search/Column/:Column/Value/:Value', Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;
    MemberListSearch(Column,Value,res);
  });
  app.post('/Api/v1/MembersList/Search/', Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
    let Column = req.body.Column;
    let Value = req.body.Value;
    MemberListSearch(Column,Value,res);
  });
}