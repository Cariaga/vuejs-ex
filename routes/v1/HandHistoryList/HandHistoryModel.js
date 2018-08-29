app.get('/Api/v1/HandHistory/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  HandHistory(function (response) {
    if (response != undefined) {
      res.send(beautify(response, null, 2, 100));
    } else {
      res.send([]);
    }
  });
});

function HandHistory(callback) {
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