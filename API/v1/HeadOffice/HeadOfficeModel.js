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
 * @param {*} Name
 * @param {*} Description
 * @param {*} callback
 */
module.exports.AddHeadOffice = function AddHeadOffice(UserAccountID, Name, Description, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @Name=${Name};` +
    `SET @Description=${Description};` +
    ""+
    ""+
    ""+
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*var item1 = Models.HeadOffice.build({
    UserAccountID: UserAccountID,
    Name: Name,
    Description: Description
  });
  Models.HeadOffice.sync({
    alter: true
  }); //force true rebuilds table for non production only
  item1.save()
    .then(Success => {

      console.log("----AddHeadOffice Start-----");
      console.log(Success);
      console.log("----AddHeadOffice End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting " + error);
      callback(undefined);
    });
    */

}
/**
 *
 *
 * @param {*} HeadOfficeID
 * @param {*} UserAccountID
 * @param {*} Name
 * @param {*} callback
 */
module.exports.HeadOfficeUpdate = function HeadOfficeUpdate(HeadOfficeID, UserAccountID, Name, callback) {
  let query =
    `SET @HeadOfficeID=${HeadOfficeID};` +
    `SET @UserAccountID=${UserAccountID};` +
    `SET @Name=${Name};` +
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.HeadOffice.update({
      UserAccountID: UserAccountID,
      Name: Name
    }, {
      where: {
        HeadOfficeID: HeadOfficeID
      }
    })
    .then(Success => {
      callback("Updated");
    })

    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " + error);
      callback(undefined);
    });*/
}