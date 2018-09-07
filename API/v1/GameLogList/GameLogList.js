var GameLogListModel = require('./GameLogListModel');
var isNullOrEmpty = require('is-null-or-empty');

module.exports = function (app) {
    app.get('/Api/v1/GameLogList/', function (req, res) {
        GameLogListModel.GameLogList(undefined, undefined, function (response) {
            if (response != undefined) {
                res.send(response);
            } else {
                res.send({});
            }
        });

    });
    app.get('/Api/v1/GameLogList/Limit/:Limit/Max/:Offset', function (req, res) {
        let Limit = req.params.Limit;
        let Limit = req.params.Offset;
        if (!isNullOrEmpty(Min)) {
            if (!isNullOrEmpty(Max)) {
                GameLogListModel.GameLogList(Limit, Offset, function (response) {
                    if (response != undefined) {
                        res.send(response);
                    } else {
                        res.send({});
                    }
                });
            } else {
                res.send({
                    MaxMissing: true
                });
            }
        } else {
            res.send({
                MinMissing: true
            });
        }

    });

}