var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');

module.exports.IPList = function IPList(limit, offset, callback) {
    let _limit = limit;
    let _offset = offset;

    if (limit != undefined && offset != undefined) {
        let query = "SELECT * FROM sampledb.ip_list LIMIT " + _limit + " OFFSET " + _offset;
        DBConnect.DBConnect(query, function (response) {
            if (response != undefined) {
                console.log(response);
                callback(response);
            } else {
                callback(undefined);
            }
        });

    } else if (limit == undefined && offset == undefined) {
        let query = "SELECT * FROM sampledb.ip_list";
        DBConnect.DBConnect(query, function (response) {
            if (response != undefined) {
                console.log(response);
                callback(response);
            } else {
                callback(undefined);
            }
        })
    }
}

module.exports.IPList2 = function IPList2(Limit, Offset, Order, Direction, callback) {
    let _Limit = Limit;
    let _Offset = Offset;
    let _Order = Order;
    let _Direction = Direction;
    
    let query = "SELECT * FROM sampledb.ip_list order by "+_Order+" "+_Direction+" limit "+_Limit+" Offset "+_Offset;;
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    })

    
}
module.exports.IPListSearch = function IPListSearch(Indexx, Value, callback) {
    let _Column = ['PlayerID','ScreenName','IP'];
    let _Value = Value;

    if(Indexx >= 0 && Indexx <= 2){
        let query = 
        "SELECT * FROM sampledb.ip_list where ip_list."+_Column[Indexx]+" like \'%"+_Value+"%\';";
        DBConnect.DBConnect(query, function (response) {
          if (response != undefined) {
            console.log(response);
            callback(response);
          } else {
            callback(undefined);
          }
        });
    }else{
        callback(undefined);
    }
  }
