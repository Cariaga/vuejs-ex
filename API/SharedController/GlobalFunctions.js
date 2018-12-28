var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');


module.exports.ComputeRake = 

function ComputeRake(bettingAmount, pCommisssion, sCommission, dCommission, hoCommission, ohoCommisssion) {
  let playerRake = (bettingAmount * (pCommisssion / 100)).toFixed(2);
  // playerRake = playerRake.toFixed(2);
  let shopRake = ((bettingAmount * (sCommission / 100)) - playerRake).toFixed(2);
  // shopRake = shopRake.toFixed(2);
  let distributorRake = ((bettingAmount * (dCommission / 100)) - playerRake - shopRake).toFixed(2);
  // distributorRake = distributorRake.toFixed(2);
  let headofficeRake = ((bettingAmount * (hoCommission / 100)) - playerRake - shopRake - distributorRake).toFixed(2);
  // headofficeRake = headofficeRake.toFixed(2);
  let operatingheadofficeRake = ((bettingAmount * (ohoCommisssion / 100)) - playerRake - shopRake - distributorRake - headofficeRake).toFixed(2);
  return { playerRake, shopRake, distributorRake, headofficeRake, operatingheadofficeRake };
}

module.exports.ComputeRakePlayer =function ComputeRakePlayer(bettingAmount, pCommisssion) {
    let playerRake = (bettingAmount * (pCommisssion / 100)).toFixed(2);
    return { playerRake };
  }
function getCurrentDate(callback){

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth(); 
    let yyyy = today.getFullYear();
    let FormatedDate = yyyy+'/'+mm+'/'+dd;
 
    callback(FormatedDate);
  }
  //** Returns Current Time String*/
  
  /**
   *
   *
   * @param {*} callback
   */
  function getCurrentTime(callback){
    let today = new Date();
    let Hours = today.getHours();
    let Minutes = today.getMinutes();
    let Seconds = today.getSeconds();
    let FormatedTime =Hours+":"+Minutes+":"+Seconds;
    callback(FormatedTime);
  }
