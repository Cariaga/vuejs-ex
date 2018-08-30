

module.exports = function HandHistory(callback) {
  Models.HandHistory.sync();
  let result = Models.HandHistory.findAll({
    where: {
      HandHistoryID: {
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