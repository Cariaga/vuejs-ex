let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var MemberListModel = require('../MemberList/MemberListModel')
module.exports = function (app) { //SELECTION

  app.get('/Api/v1/MembersList/Limit/:Limit/Offset/:Offset', function (req, res) {
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;
    if(!isNullOrEmpty(Limit)){
      if(!isNullOrEmpty(Offset)){
        
      }
    }
  });

  app.get('/Api/v1/MemberList/Search/Column/:Column/Value/:Value', function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;

    if (!isNullOrEmpty(Column)) {
      if (!isNullOrEmpty(Value)) {
        MemberListModel.MemberListSearch(Column, Value, function (response) {
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