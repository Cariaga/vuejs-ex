var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} DistributorID
 * @param {*} Description
 * @param {*} callback
 */
module.exports.AddShop = function AddShop(UserAccountID, DistributorID, Description, callback) {
  let query = '';
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  /*var item1 = Models.Shop.build({
    UserAccountID: UserAccountID,
    DistributorID: DistributorID,
    Description: Description
  });
  Models.Shop.sync({
    alter: true
  }); //use force to recreate for non production only
  item1.save()
    .then(Success => {
      console.log("----AddShop Start-----");
      console.log(Success);
      console.log("----AddShop End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting " + error);
      callback(undefined);
    });*/
}