var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');

let DBConnect = require("../../SharedController/DBConnect");
module.exports.AddAccessControl = function AddAccessControl(AccessID, AccessName, AccessTags, callback) {
  /*var item1 = Models.AccessControl.build({
    AccessID:AccessID,
    AccessName:AccessName,
    AccessTags:AccessTags
  });
  Models.AccessControl.sync({alter : true});//use force only on non producti1on
  /*item1.save()
  .then(Success => {
    console.log("----AddUserAccount Start-----");
    console.log(Success);
    console.log("----AddUserAccount End-----");
    callback("Inserted");
  })
  .catch(error => {
    console.log("error inserting " +error);
    callback(undefined);
  });*/
}



module.exports.AccessControlUpdate = function AccessControlUpdate(AccessID, AccessName, AccessTags, callback) {
  /*var item1 = Models.AccessControl.build({
    AccessID:AccessID,
    AccessName:AccessName,
    AccessTags:AccessTags
  });
  Models.AccessControl.sync({alter : true});//use force only on non producti1on
  /*item1.save()
  .then(Success => {
    console.log("----AddUserAccount Start-----");
    console.log(Success);
    console.log("----AddUserAccount End-----");
    callback("Inserted");
  })
  .catch(error => {
    console.log("error inserting " +error);
    callback(undefined);
  });*/
  
}