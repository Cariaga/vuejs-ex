let DBConnect = require("../../SharedController/DBConnect");
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} RoundID
 * @param {*} SeasonID
 * @param {*} Rank
 * @param {*} Score
 * @param {*} Card
 * @param {*} Time
 * @param {*} Date
 * @param {*} BeforePoints
 * @param {*} AfterPoints
 * @param {*} callback
 */
module.exports.AddGameHistory = function AddGameHistory(UserAccountID, RoundID, SeasonID, Rank, Score, Card, Time, Date, BeforePoints, AfterPoints, callback) {
  Models.GameHistory.sync();
  var item1 = Models.GameHistory.build({
    UserAccountID: UserAccountID,
    RoundID: RoundID,
    SeasonID: SeasonID,
    Rank: Rank,
    Score: Score,
    Card: Card,
    Time: Time,
    Date: Date,
    BeforePoints: BeforePoints,
    AfterPoints: AfterPoints
  });
  Models.GameHistory.sync(); //use force to delete old table non production
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
 * @param {*} callback
 */
module.exports.GameHistory = function GameHistory(callback) {
  Models.GameHistory.sync();
  let result = Models.GameHistory.findAll({
    where: {
      GameHistoryID: {
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