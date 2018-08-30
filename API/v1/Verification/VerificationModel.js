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
 * @param {*} UserName
 * @param {*} ValidKey
 * @param {*} callback
 */
module.exports = function VerifyAccount(UserName, ValidKey, callback) { // Verification with ValidKey // Public only use // Via ValidKey
  Models.UserAccount.update({
      Verify: true
    }, {
      where: {
        UserName: UserName,
        ValidKey: ValidKey
      }
    })
    .then(Success => {
      callback("Updated");
    })

    .catch(error => {
      console.log("Error Updating " + error);
      callback();
    });
}

/**
 *
 *
 * @param {*} UserName
 * @param {*} ValidKey
 * @param {*} callback
 */
module.exports = function Verify(UserName, ValidKey, callback) {
  async.waterfall([
    myFirstFunction,
    mySecondFunction,
  ], function (err, result) { //final function
    // result now equals 'done'
    // console.log('5');
    callback(result);
  });

  function myFirstFunction(callback2) {
    console.log('1');
    Models.UserAccount.sync( /*{force:true}*/ ); //makes sure table exist and syncs it
    let result = Models.UserAccount.findAll({
      where: {
        UserName: UserName //not null
          ,
        ValidKey: ValidKey //not null
      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      //  console.log('2');
      callback2(null, Data);
    }).catch(function (result2) {
      console.log("Verify Error : " + result2);
      //  console.log('2');
      callback2(null, result2);
    });

  }

  function mySecondFunction(arg1, callback3) {
    //  console.log(arg1);
    //  console.log('3'+arg1[0].Verify);
    if (arg1[0].Verify == true) {
      let result3 = {
        Verified: true
      };
      //  console.log('4');
      callback3(null, result3);
    } else {
      let result3 = {
        Verified: false
      };
      //  console.log('4');
      callback3(null, result3);
    }
  }
}