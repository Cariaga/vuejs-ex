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
 * @param {*} SeasonID
 * @param {*} SmallBlind
 * @param {*} BigBlind
 * @param {*} Speed
 * @param {*} callback
 */
module.exports.AddRoomConfiguration = function AddRoomConfiguration(SeasonID, SmallBlind, BigBlind, Speed, callback) {
  let query =
    `SET @SeasonID=${SeasonID};` +
    `SET @SmallBlind=${SmallBlind};` +
    `SET @BigBlind=${BigBlind};` +
    `SET @Speed=${Speed};` +

    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*var item1 = Models.RoomConfiguration.build({
    SeasonID: SeasonID,
    SmallBlind: SmallBlind,
    BigBlind: BigBlind,
    Speed: Speed
  });
  Models.RoomConfiguration.sync({
    alter: true
  }); //use force to delete old table non production
  item1.save()
    .then(Success => {
      callback("Inserted");
    })
    .catch(error => {

      console.log("error inserting " + error);
      callback(undefined);
    });*/
}


/**
 *
 *
 * @param {*} SeasonID
 * @param {*} SmallBlind
 * @param {*} BigBlind
 * @param {*} callback
 */
module.exports.RoomConfigurationSeasonIDUpdateSmallBigBlind = function RoomConfigurationSeasonIDUpdateSmallBigBlind(SeasonID, SmallBlind, BigBlind, callback) {
  let query =
    `SET @SeasonID=${SeasonID};` +
    `SET @SmallBlind=${SmallBlind};` +
    `SET @BigBlind=${BigBlind};` +

    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.RoomConfiguration.sync( );
  Models.RoomConfiguration.update({
      SmallBlind: SmallBlind,
      BigBlind: BigBlind
    }, {
      where: {
        SeasonID: SeasonID
      }
    })
    .then(Success => {
      console.log("Updated");
      callback("Updated");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " + error);
      callback(undefined);
    });*/
}
/**
 *
 *
 * @param {*} callback
 */
module.exports.RoomConfiguration = function RoomConfiguration(callback) {
  let query = '';

  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(undefined);
    }
  });
  /*Models.RoomConfiguration.sync();
  let result = Models.RoomConfiguration.findAll({
    where: {
      RoomConfigurationID: {
        ne: null //not null
      }
    }
  }).then(function (result) {
    let Data = result.map(function (item) {
      return item;

    });
    if (Data.length > 0) {
      callback(Data);
    } else {
      callback(undefined);
    }

  }).catch(function (result) { //catching any then errors
    console.log("Error " + result);
    callback(undefined);

  });*/
}