let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
let OneOnOneModel = require ('../OneOnOne/OneOnOneModel')

module.exports = function (app) { //SELECTION
  app.get('/Api/v1/OneOnOne/Limit/:Limit/Offset/:Offset/', function (req, res) {//OK
    let Limit =req.params.Limit;
    let Offset = req.params.Offset;
    OneOnOneModel.OneOnOne(Limit,Offset, function (response) {
      if (response != undefined) {
        res.send(response);
      } else {
        res.send([]);
      }
    });
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
   app.get('/Api/v1/OneOnOne/UserAccountID/:UserAccountID/Answer/:Answer/', function (req, res) {
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