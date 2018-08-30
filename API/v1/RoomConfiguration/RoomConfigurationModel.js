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
module.exports = function AddRoomConfiguration(SeasonID, SmallBlind, BigBlind, Speed, callback) {
  var item1 = Models.RoomConfiguration.build({
    SeasonID: SeasonID,
    SmallBlind: SmallBlind,
    BigBlind: BigBlind,
    Speed: Speed
  });
  Models.RoomConfiguration.sync({
    alter: true /*,force:true*/
  }); //use force to delete old table non production
  item1.save()
    .then(Success => {
      callback("Inserted");
    })
    .catch(error => {

      console.log("error inserting " + error);
      callback(undefined);
    });
}


/**
 *
 *
 * @param {*} SeasonID
 * @param {*} SmallBlind
 * @param {*} BigBlind
 * @param {*} callback
 */
function RoomConfigurationSeasonIDUpdateSmallBigBlind(SeasonID, SmallBlind, BigBlind, callback) {
  Models.RoomConfiguration.sync( /*{force:true}*/ );
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
    });
}
/**
 *
 *
 * @param {*} callback
 */
function RoomConfiguration(callback) {
  Models.RoomConfiguration.sync();
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

  });
}