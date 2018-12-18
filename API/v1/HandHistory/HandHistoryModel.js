var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
var uuidv4 = require('uuid/v4');


module.exports.AddHandHistory = function AddHandHistory(UserAccountID,SeasonID, MoveHand,Amount, callback) {
    let _UserAccountID = UserAccountID;
    let _SeasonID = SeasonID;
    let _MoveHand = MoveHand;
    let _Amount =Amount;
  let query =
    "INSERT INTO `sampledb`.`handhistory` (`UserAccountID`, `SeasonID`, `MoveHand`, `HandDateTime`,`HandAmount`) "+
    "VALUES (\'"+_UserAccountID+"\',\'"+_SeasonID+"\',\'"+_MoveHand+"\', now(),\'"+_Amount+"\');";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}
module.exports.DeductMoneyOnBet = function DeductMoneyOnBet(UserAccountID,DeductAmount, callback) {
  let _UserAccountID = UserAccountID;
  let _DeductAmount = DeductAmount;
let query =
  "UPDATE `sampledb`.`players` SET `Money` = (select t.Money from (SELECT Money FROM sampledb.players as t where UserAccountID=\'"+_UserAccountID+"\' limit 1) as t)-'"+_DeductAmount+"' WHERE (`UserAccountID` = \'"+_UserAccountID+"\');";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}
module.exports.HandHistorySeasonID = function HandHistorySeasonID(SeasonID, callback) {
  let _SeasonID = SeasonID;
  let query = "SELECT * FROM sampledb.handhistory where SeasonID=\'"+_SeasonID+"\';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}
module.exports.HandHistoryUserAccountID = function HandHistoryUserAccountID(UserAccountID, callback) {
  let _UserAccountID = UserAccountID;
  let query = "SELECT * FROM sampledb.handhistory where UserAccountID=\'"+_UserAccountID+"\';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}

module.exports.getCommissionPercentages = function getCommissionPercentages(UserAccountID, callback) {
  let _UserAccountID = UserAccountID;
  let query = "SELECT * FROM sampledb.player_to_oho where UserAccountID=\'"+_UserAccountID+"\';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
}

module.exports.distributeRake = function distributeRake(playerToOHOCommission, bettingAmount, SeasonID, callback) {
  let _playerToOHOCommission = playerToOHOCommission;
  let _SeasonID = SeasonID;
  let playerRake = (bettingAmount * (_playerToOHOCommission[0]['pCommission'] / 100 )).toFixed(2);
    // playerRake = playerRake.toFixed(2);
  let shopRake = ((bettingAmount * (_playerToOHOCommission[0]['sCommission'] / 100 )) - playerRake).toFixed(2);
    // shopRake = shopRake.toFixed(2);
  let distributorRake = ((bettingAmount * (_playerToOHOCommission[0]['dCommission'] / 100 )) - playerRake - shopRake).toFixed(2);
    // distributorRake = distributorRake.toFixed(2);
  let headofficeRake = ((bettingAmount * (_playerToOHOCommission[0]['hoCommission'] / 100 )) - playerRake - shopRake - distributorRake).toFixed(2);
    // headofficeRake = headofficeRake.toFixed(2);
  let operatingheadofficeRake = ((bettingAmount * (_playerToOHOCommission[0]['ohoCommission'] / 100 )) - playerRake - shopRake - distributorRake - headofficeRake).toFixed(2);

  console.log('player rake -> ' + playerRake);
  console.log('player rake -> ' +shopRake);
  console.log('player rake -> ' +distributorRake);
  console.log('player rake -> ' +headofficeRake);
  console.log('player rake -> ' +operatingheadofficeRake);
  console.log(_playerToOHOCommission[0]['UserAccountID']);
  let rakeLogQuery = "INSERT INTO `sampledb`.`handhistory_rake` (`SeasonID`, `UserAccountID`, `RakePlayer`, `RakeStore`, `RakeDistributor`,`RakeHO`,`RakeOHO`) "+
                     "VALUES (\'"+_SeasonID+"\',\'"+_playerToOHOCommission[0]['UserAccountID']+"\',"+playerRake+", "+shopRake+", "+distributorRake+", "+headofficeRake+", "+operatingheadofficeRake+");";
  let pquery = "UPDATE `sampledb`.`players` SET Money = Money + "+playerRake+
              "  WHERE UserAccountID = '"+_playerToOHOCommission[0]['UserAccountID']+"';";

  let squery = "UPDATE `sampledb`.`shops` SET CurrentPoints = CurrentPoints + "+shopRake+
              "  WHERE ShopID = '"+_playerToOHOCommission[0]['ShopID']+"';";
              
  let dquery = "UPDATE `sampledb`.`distributors` SET CurrentPoints = CurrentPoints + "+distributorRake+
              "  WHERE DistributorID = '"+_playerToOHOCommission[0]['DistributorID']+"';";

  let hoquery = "UPDATE `sampledb`.`headoffices` SET CurrentPoints = CurrentPoints + "+headofficeRake+
              "  WHERE HeadOfficeID = '"+_playerToOHOCommission[0]['HeadOfficeID']+"';";

  let ohoquery = "UPDATE `sampledb`.`operatingheadoffice` SET CurrentPoints = CurrentPoints + "+operatingheadofficeRake+
              "  WHERE OperatingHeadOfficeID = '"+_playerToOHOCommission[0]['OperatingHeadOfficeID']+"';";

  var rakeLogPromise = new Promise(function(resolve, reject) {
    DBConnect.DBConnect(rakeLogQuery, function (response) {
      if (response != undefined) {
        resolve();
      } else {
        console.log('rake log query fail')
        reject();
      }
    })
  });

  var playerPromise = new Promise(function(resolve, reject) {
   DBConnect.DBConnect(pquery, function (response) {
      if (response != undefined) {
        resolve();
      } else {
        console.log('player query fail')
        reject();
      }
     })
  });

  var shopPromise = new Promise(function(resolve, reject) {
    DBConnect.DBConnect(squery, function (response) {
       if (response != undefined) {
         resolve();
       } else {
        console.log('shop query fail')
         reject();
       }
      })
   });

  var distributorPromise = new Promise(function(resolve, reject) {
    DBConnect.DBConnect(dquery, function (response) {
       if (response != undefined) {
         resolve();
       } else {
        console.log('distributor query fail')
         reject();
       }
      })
   });

  var headOfficePromise = new Promise(function(resolve, reject) {
    DBConnect.DBConnect(hoquery, function (response) {
       if (response != undefined) {
         resolve();
       } else {
        console.log('head office query fail')
         reject();
       }
      })
   });

  var operatingHeadOfficePromise = new Promise(function(resolve, reject) {
    DBConnect.DBConnect(ohoquery, function (response) {
       if (response != undefined) {
         resolve();
       } else {
        console.log('operating head office query fail')
         reject();
       }
      })
   });
  
  Promise.all([rakeLogPromise,playerPromise,shopPromise,distributorPromise,headOfficePromise,operatingHeadOfficePromise]).then(function() {
    console.log('rake distribution successful');
    // callback(true);
  }, function(){ //if promise or promise2 fail
    console.log('something went wrong')
    // callback(undefined);
  });

}