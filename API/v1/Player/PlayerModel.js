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
 * @param {*} ShopID
 * @param {*} ScreenName
 * @param {*} Name
 * @param {*} Surname
 * @param {*} CurrentRoomName
 * @param {*} callback
 */
module.exports = function AddPlayer(UserAccountID, ShopID, ScreenName, Name, Surname, CurrentRoomName, callback) {
  let query = '';
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback(undefined);
    }
  });
  //res.send('test');
  //Setting up the config
 /* let item1 = Models.Player.build({
    UserAccountID: UserAccountID,
    ShopID: ShopID,
    ScreenName: ScreenName,
    Name: Name,
    Surname: Surname,
    CurrentRoomName: CurrentRoomName
  });
  Models.Player.sync(); //use force to clear/delete old table non production only
  item1.save()
    .then(Success => {

      console.log("----AddPlayer Start-----");
      console.log(Success);
      console.log("----AddPlayer End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting " + error);
      callback(undefined);
    });*/
  //res.send("Player "+UserAccountID+" "+ ShopID+" "+ScreenName);
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
module.exports = function PlayerUserAccountID(UserAccountID, callback) {
  Models.Player.sync();
  let result = Models.Player.findAll({
    where: {
      UserAccountID: UserAccountID
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

  }).catch(function (result) {
    console.log("Error " + result)
    callback(undefined);
  });
}
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} CurrentPoints
 * @param {*} callback
 */
module.exports = function PlayerUpdatePoint(UserAccountID, CurrentPoints, callback) {
  Models.Player.update({
      CurrentPoints: CurrentPoints
    }, {
      where: {
        UserAccountID: UserAccountID
      }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " + error);
      callback(undefined);
    });
}
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} CurrentPoints
 * @param {*} callback
 */
module.exports = function PlayerUpdatePoint(UserAccountID, CurrentPoints, callback) {
  Models.Player.update({
      CurrentPoints: CurrentPoints
    }, {
      where: {
        UserAccountID: UserAccountID
      }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " + error);
      callback(undefined);
    });
}

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} CurrentRoomName
 * @param {*} callback
 */
module.exports =function PayerUpdateRoomName(UserAccountID, CurrentRoomName, callback) {
  Models.Player.update({
      CurrentRoomName: CurrentRoomName
    }, {
      where: {
        UserAccountID: UserAccountID
      }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " + error);
      callback(undefined);
    });
}

module.exports = function PlayerUpdate(PlayersID, UserAccountID, ShopID, ScreenName, Name, Surname, CurrentRoomName, callback) {
  Models.Player.update({
      ShopID: ShopID,
      ScreenName: ScreenName,
      Name: Name,
      Surname: Surname,
      CurrentRoomName: CurrentRoomName
    }, {
      where: {
        PlayersID: PlayersID,
        UserAccountID: UserAccountID
      }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " + error);
      res.send(undefined);
    });
}
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} ShopID
 * @param {*} ScreenName
 * @param {*} Name
 * @param {*} Surname
 * @param {*} CurrentRoomName
 * @param {*} callback
 */
module.exports = function AddPlayer(UserAccountID, ShopID, ScreenName, Name, Surname, CurrentRoomName, callback) {
  //res.send('test');
  //Setting up the config
  let item1 = Models.Player.build({
    UserAccountID: UserAccountID,
    ShopID: ShopID,
    ScreenName: ScreenName,
    Name: Name,
    Surname: Surname,
    CurrentRoomName: CurrentRoomName
  });
  Models.Player.sync(); //use force to clear/delete old table non production only
  item1.save()
    .then(Success => {

      console.log("----AddPlayer Start-----");
      console.log(Success);
      console.log("----AddPlayer End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting " + error);
      callback(undefined);
    });
  //res.send("Player "+UserAccountID+" "+ ShopID+" "+ScreenName);
}