var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');

module.exports.HeadOfficeList = function HeadOfficeList(Limit,Offset,callback) {
    let _Limit = Limit;
    let _Offset = Offset;
    if(Limit!=undefined&&Offset!=undefined){
        let query = 
        "SELECT * FROM sampledb.headoffice_list limit "+_Limit+" Offset "+_Offset;
        DBConnect.DBConnect(query, function (response) {
          if (response != undefined) {
            console.log(response);
            callback(response);
          } else {
            callback(undefined);
          }
        });
    }
    else if(Limit==undefined&&Offset==undefined){
        let query = 
        "SELECT * FROM sampledb.headoffice_list ";
        DBConnect.DBConnect(query, function (response) {
          if (response != undefined) {
            console.log(response);
            callback(response);
          } else {
            callback(undefined);
          }
        });
    }
  }
  module.exports.HeadOfficeListSearch = function HeadOfficeListSearch(Column, Value, callback) {
    let _Column = Column;
    let _Value = Value;
    let query = 
    "SELECT * FROM sampledb.headoffice_list where `"+_Column+"` like '%"+_Value+"%';";
    console.log(query);
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
       
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }