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
    app.get('/Api/v1/GameLogList/Limit/:Limit/Offset/:Offset', function (req, res) {
        let Limit = req.params.Limit;
        let Offset = req.params.Offset;
        if (!isNullOrEmpty(Limit)) {
            if (!isNullOrEmpty(Offset)) {
                GameLogListModel.GameLogList(Limit, Offset, function (response) {
                    if (response != undefined) {
                        res.send(response);
                    } else {
                        res.send({});
                    }
                });
            } else {
                res.send({
                    OffsetMissing: true
                });
            }
        } else {
            res.send({
                LimitMissing: true
            });
        }

    });

    app.get('/Api/v1/GameLogList/Search/Column/:Column/Value/:Value', function (req, res) {
        let Column = req.params.Column;
        let Value = req.params.Value;

        if (!isNullOrEmpty(Column)) {
            if (!isNullOrEmpty(Value)) {
                GameLogListModel.GameLogSearch(Column, Value, function (response) {
                    if (response != undefined) {
                        res.send(response);
                    } else {
                        res.send(undefined);
                    }
                });
            } else {
                res.send({
                    InvalidValue: true
                });
            }
        } else {
            res.send({
                InvalidColumn: true
            });
        }
    });
}