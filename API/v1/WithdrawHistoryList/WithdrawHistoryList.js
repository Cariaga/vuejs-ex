let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
let WithdrawHistoryListModel = require ('../WithdrawHistoryList/WithdrawHistoryListModel')
module.exports = function (app) {//SELECTION
  app.get('/Api/v1/WithdrawHistoryList/Search/Column/:Column/Value/:Value', function (req, res) {
    let Column = req.params.Column;
    let Value = req.params.Value;

    if (!isNullOrEmpty(Column)) {
      if (!isNullOrEmpty(Value)) {
        WithdrawHistoryListModel.WithdrawSearch(Column, Value, function (response) {
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
