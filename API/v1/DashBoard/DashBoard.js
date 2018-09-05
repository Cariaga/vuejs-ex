var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
module.exports = function (app) { 
    app.get('/Api/v1/HandHistory/SeasonID/:SeasonID/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        let SeasonID = req.params.SeasonID;
        if (!isNullOrEmpty(SeasonID)) {
          HandHistoryModel.HandHistorySeasonID(SeasonID, function (response) {
            res.send(response);
          });
        }
      });
}
